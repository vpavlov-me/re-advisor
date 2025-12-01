import '@testing-library/jest-dom';

// Polyfill for Web APIs not available in jsdom
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Mock Request/Response/Headers for API route testing
class MockHeaders {
  private headers: Map<string, string> = new Map();
  
  append(name: string, value: string) { this.headers.set(name.toLowerCase(), value); }
  delete(name: string) { this.headers.delete(name.toLowerCase()); }
  get(name: string) { return this.headers.get(name.toLowerCase()) || null; }
  has(name: string) { return this.headers.has(name.toLowerCase()); }
  set(name: string, value: string) { this.headers.set(name.toLowerCase(), value); }
  forEach(callback: (value: string, key: string) => void) { this.headers.forEach(callback); }
  entries() { return this.headers.entries(); }
  keys() { return this.headers.keys(); }
  values() { return this.headers.values(); }
}

class MockRequest {
  private _url: string;
  method: string;
  headers: MockHeaders;
  private _body: unknown;
  
  constructor(url: string, init?: { method?: string; headers?: Record<string, string>; body?: unknown }) {
    this._url = url;
    this.method = init?.method || 'GET';
    this.headers = new MockHeaders();
    if (init?.headers) {
      Object.entries(init.headers).forEach(([k, v]) => this.headers.set(k, v));
    }
    this._body = init?.body;
  }
  
  get url(): string {
    return this._url;
  }
  
  async json() {
    if (typeof this._body === 'string') return JSON.parse(this._body);
    return this._body;
  }
  
  async text() {
    if (typeof this._body === 'string') return this._body;
    return JSON.stringify(this._body);
  }
  
  async formData() {
    return this._body;
  }
}

class MockResponse {
  status: number;
  statusText: string;
  headers: MockHeaders;
  private _body: unknown;
  
  constructor(body?: unknown, init?: { status?: number; statusText?: string; headers?: Record<string, string> }) {
    this._body = body;
    this.status = init?.status || 200;
    this.statusText = init?.statusText || 'OK';
    this.headers = new MockHeaders();
    if (init?.headers) {
      Object.entries(init.headers).forEach(([k, v]) => this.headers.set(k, v));
    }
  }
  
  async json() {
    if (typeof this._body === 'string') return JSON.parse(this._body);
    return this._body;
  }
  
  async text() {
    if (typeof this._body === 'string') return this._body;
    return JSON.stringify(this._body);
  }
  
  static json(data: unknown, init?: { status?: number }) {
    return new MockResponse(JSON.stringify(data), { 
      status: init?.status || 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

global.Request = MockRequest as unknown as typeof Request;
global.Response = MockResponse as unknown as typeof Response;
global.Headers = MockHeaders as unknown as typeof Headers;

// Mock Supabase client - must be before any imports that use it
const mockFrom = jest.fn();
const mockAuth = {
  getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
  getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
  signInWithPassword: jest.fn(),
  signUp: jest.fn(),
  signOut: jest.fn(),
  resetPasswordForEmail: jest.fn(),
  updateUser: jest.fn(),
  resend: jest.fn(),
  signInWithOAuth: jest.fn(),
  onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
};

const mockStorage = {
  from: jest.fn(() => ({
    upload: jest.fn(),
    download: jest.fn(),
    remove: jest.fn(),
    list: jest.fn(),
    getPublicUrl: jest.fn(() => ({ data: { publicUrl: 'https://example.com/avatar.jpg' } })),
  })),
};

jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: mockAuth,
    from: mockFrom,
    storage: mockStorage,
    channel: jest.fn(() => ({ on: jest.fn().mockReturnThis(), subscribe: jest.fn() })),
    removeChannel: jest.fn(),
  },
  isSupabaseConfigured: jest.fn(() => true),
}));

// Export mocks for use in tests
(global as Record<string, unknown>).__mockSupabase = {
  auth: mockAuth,
  from: mockFrom,
  storage: mockStorage,
};

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords = () => [];
};

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});

// Suppress console errors during tests (optional, can be removed for debugging)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
