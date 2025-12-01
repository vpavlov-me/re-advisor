/**
 * Auth Service Tests
 * Tests for authentication functions
 */

// Mock supabase before imports - use direct jest.fn() to avoid hoisting issues
jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      updateUser: jest.fn(),
      resend: jest.fn(),
      signInWithOAuth: jest.fn(),
      getUser: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
    from: jest.fn(),
  },
}));

// Mock window.location - use delete first to avoid redefine error
delete (window as { location?: Location }).location;
(window as { location: { origin: string } }).location = { origin: 'http://localhost:3000' };

// Import after mocks
import { supabase } from '@/lib/supabaseClient';
import {
  signIn,
  signOut,
  getCurrentUser,
  getSession,
  resetPassword,
  updatePassword,
  resendVerificationEmail,
  signInWithOAuth,
  isEmailVerified,
} from '@/lib/auth';

// Get mocked functions
const mockSignUp = supabase.auth.signUp as jest.Mock;
const mockSignInWithPassword = supabase.auth.signInWithPassword as jest.Mock;
const mockSignOut = supabase.auth.signOut as jest.Mock;
const mockResetPasswordForEmail = supabase.auth.resetPasswordForEmail as jest.Mock;
const mockUpdateUser = supabase.auth.updateUser as jest.Mock;
const mockResend = supabase.auth.resend as jest.Mock;
const mockSignInWithOAuth = supabase.auth.signInWithOAuth as jest.Mock;
const mockGetUser = supabase.auth.getUser as jest.Mock;
const mockGetSession = supabase.auth.getSession as jest.Mock;
const mockFrom = supabase.from as jest.Mock;

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should successfully sign in with valid credentials', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      const mockSession = { access_token: 'token-123', user: mockUser };
      
      mockSignInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      const result = await signIn('test@example.com', 'password123');

      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.user).toEqual(mockUser);
      expect(result.session).toEqual(mockSession);
      expect(result.error).toBeNull();
    });

    it('should return error for invalid credentials', async () => {
      const mockError = { message: 'Invalid credentials' };
      
      mockSignInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: mockError,
      });

      const result = await signIn('test@example.com', 'wrongpassword');

      expect(result.user).toBeNull();
      expect(result.session).toBeNull();
      expect(result.error).toEqual(mockError);
    });
  });

  describe('signOut', () => {
    it('should successfully sign out', async () => {
      mockSignOut.mockResolvedValue({ error: null });

      const result = await signOut();

      expect(mockSignOut).toHaveBeenCalled();
      expect(result.error).toBeNull();
    });

    it('should return error if sign out fails', async () => {
      const mockError = { message: 'Sign out failed' };
      mockSignOut.mockResolvedValue({ error: mockError });

      const result = await signOut();

      expect(result.error).toEqual(mockError);
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user when authenticated', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      mockGetUser.mockResolvedValue({ data: { user: mockUser } });

      const user = await getCurrentUser();

      expect(mockGetUser).toHaveBeenCalled();
      expect(user).toEqual(mockUser);
    });

    it('should return null when not authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });

      const user = await getCurrentUser();

      expect(user).toBeNull();
    });
  });

  describe('getSession', () => {
    it('should return current session when authenticated', async () => {
      const mockSession = { access_token: 'token-123' };
      mockGetSession.mockResolvedValue({ data: { session: mockSession } });

      const session = await getSession();

      expect(mockGetSession).toHaveBeenCalled();
      expect(session).toEqual(mockSession);
    });

    it('should return null when no session', async () => {
      mockGetSession.mockResolvedValue({ data: { session: null } });

      const session = await getSession();

      expect(session).toBeNull();
    });
  });

  describe('resetPassword', () => {
    it('should send password reset email', async () => {
      mockResetPasswordForEmail.mockResolvedValue({ error: null });

      const result = await resetPassword('test@example.com');

      expect(mockResetPasswordForEmail).toHaveBeenCalledWith('test@example.com', {
        redirectTo: expect.stringContaining('/auth/reset-password'),
      });
      expect(result.error).toBeNull();
    });

    it('should return error for invalid email', async () => {
      const mockError = { message: 'User not found' };
      mockResetPasswordForEmail.mockResolvedValue({ error: mockError });

      const result = await resetPassword('nonexistent@example.com');

      expect(result.error).toEqual(mockError);
    });
  });

  describe('updatePassword', () => {
    it('should update password successfully', async () => {
      mockUpdateUser.mockResolvedValue({ error: null });

      const result = await updatePassword('newPassword123');

      expect(mockUpdateUser).toHaveBeenCalledWith({ password: 'newPassword123' });
      expect(result.error).toBeNull();
    });

    it('should return error if update fails', async () => {
      const mockError = { message: 'Password too weak' };
      mockUpdateUser.mockResolvedValue({ error: mockError });

      const result = await updatePassword('weak');

      expect(result.error).toEqual(mockError);
    });
  });

  describe('resendVerificationEmail', () => {
    it('should resend verification email', async () => {
      mockResend.mockResolvedValue({ error: null });

      const result = await resendVerificationEmail('test@example.com');

      expect(mockResend).toHaveBeenCalledWith({
        type: 'signup',
        email: 'test@example.com',
        options: {
          emailRedirectTo: expect.stringContaining('/auth/callback'),
        },
      });
      expect(result.error).toBeNull();
    });
  });

  describe('signInWithOAuth', () => {
    it('should initiate Google OAuth', async () => {
      mockSignInWithOAuth.mockResolvedValue({ error: null });

      const result = await signInWithOAuth('google');

      expect(mockSignInWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
        options: {
          redirectTo: expect.stringContaining('/auth/callback'),
        },
      });
      expect(result.error).toBeNull();
    });

    it('should initiate GitHub OAuth', async () => {
      mockSignInWithOAuth.mockResolvedValue({ error: null });

      const result = await signInWithOAuth('github');

      expect(mockSignInWithOAuth).toHaveBeenCalledWith({
        provider: 'github',
        options: {
          redirectTo: expect.stringContaining('/auth/callback'),
        },
      });
      expect(result.error).toBeNull();
    });

    it('should handle OAuth error', async () => {
      const mockError = { message: 'OAuth failed' };
      mockSignInWithOAuth.mockResolvedValue({ error: mockError });

      const result = await signInWithOAuth('google');

      expect(result.error).toEqual(mockError);
    });
  });

  describe('isEmailVerified', () => {
    it('should return true for verified user', () => {
      const verifiedUser = {
        id: 'user-123',
        email: 'test@example.com',
        email_confirmed_at: '2024-01-01T00:00:00Z',
      };

      expect(isEmailVerified(verifiedUser as any)).toBe(true);
    });

    it('should return false for unverified user', () => {
      const unverifiedUser = {
        id: 'user-123',
        email: 'test@example.com',
        email_confirmed_at: null,
      };

      expect(isEmailVerified(unverifiedUser as any)).toBe(false);
    });

    it('should return false for null user', () => {
      expect(isEmailVerified(null)).toBe(false);
    });
  });
});
