/**
 * Environment Configuration Tests
 * Tests for env.ts module
 */

import { env, checkRequiredConfig, logConfig, EnvConfig } from '@/lib/env';

describe('Environment Configuration', () => {
  describe('env object structure', () => {
    it('should have supabase configuration', () => {
      expect(env.supabase).toBeDefined();
      expect(typeof env.supabase.url).toBe('string');
      expect(typeof env.supabase.anonKey).toBe('string');
      expect(typeof env.supabase.isConfigured).toBe('boolean');
    });

    it('should have stripe configuration', () => {
      expect(env.stripe).toBeDefined();
      expect(typeof env.stripe.publishableKey).toBe('string');
      expect(['mock', 'live']).toContain(env.stripe.mode);
      expect(typeof env.stripe.isMock).toBe('boolean');
    });

    it('should have email configuration', () => {
      expect(env.email).toBeDefined();
      expect(['mock', 'edge-function']).toContain(env.email.mode);
      expect(typeof env.email.isMock).toBe('boolean');
    });

    it('should have app configuration', () => {
      expect(env.app).toBeDefined();
      expect(typeof env.app.url).toBe('string');
      expect(typeof env.app.name).toBe('string');
      expect(typeof env.app.isProduction).toBe('boolean');
      expect(typeof env.app.isDevelopment).toBe('boolean');
    });

    it('should have correct app name', () => {
      expect(env.app.name).toBe('RE:Advisor');
    });
  });

  describe('email mode configuration', () => {
    it('should have email mode defined', () => {
      expect(env.email.mode).toBeDefined();
    });

    it('should have isMock correctly set based on mode', () => {
      if (env.email.mode === 'mock') {
        expect(env.email.isMock).toBe(true);
      } else {
        expect(env.email.isMock).toBe(false);
      }
    });

    it('should default to edge-function mode', () => {
      // Default is edge-function as per the code
      expect(env.email.mode).toBe('edge-function');
    });
  });

  describe('stripe mode configuration', () => {
    it('should have stripe mode defined', () => {
      expect(env.stripe.mode).toBeDefined();
    });

    it('should have isMock correctly set based on mode', () => {
      if (env.stripe.mode === 'mock') {
        expect(env.stripe.isMock).toBe(true);
      } else {
        expect(env.stripe.isMock).toBe(false);
      }
    });
  });

  describe('checkRequiredConfig', () => {
    it('should return an object with valid and errors properties', () => {
      const result = checkRequiredConfig();
      expect(result).toHaveProperty('valid');
      expect(result).toHaveProperty('errors');
      expect(typeof result.valid).toBe('boolean');
      expect(Array.isArray(result.errors)).toBe(true);
    });

    it('should return errors array', () => {
      const result = checkRequiredConfig();
      expect(Array.isArray(result.errors)).toBe(true);
    });
  });

  describe('logConfig', () => {
    it('should be a function', () => {
      expect(typeof logConfig).toBe('function');
    });

    it('should not throw when called', () => {
      expect(() => logConfig()).not.toThrow();
    });
  });

  describe('environment detection', () => {
    it('should correctly identify test environment', () => {
      // In test environment, NODE_ENV is 'test'
      // So isProduction should be false
      expect(env.app.isProduction).toBe(false);
    });

    it('should have mutually exclusive production/development flags or both false in test', () => {
      // In test environment, both might be false
      // But they should never both be true
      expect(env.app.isProduction && env.app.isDevelopment).toBe(false);
    });
  });

  describe('type safety', () => {
    it('should satisfy EnvConfig interface', () => {
      const config: EnvConfig = env;
      expect(config).toBeDefined();
      expect(config.supabase).toBeDefined();
      expect(config.stripe).toBeDefined();
      expect(config.email).toBeDefined();
      expect(config.app).toBeDefined();
    });
  });
});
