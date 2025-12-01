/**
 * Validations Tests
 * Tests for Zod validation schemas
 */

import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  profileSchema,
  familySchema,
  familyMemberSchema,
  serviceSchema,
  consultationSchema,
  taskSchema,
  credentialSchema,
  messageSchema,
  changePasswordSchema,
  notificationSettingsSchema,
} from '@/lib/validations';

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty email', () => {
      const result = loginSchema.safeParse({
        email: '',
        password: 'password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email is required');
      }
    });

    it('should reject invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'short',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123',
      confirmPassword: 'Password123',
      terms: true,
    };

    it('should validate correct registration data', () => {
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject mismatched passwords', () => {
      const result = registerSchema.safeParse({
        ...validData,
        confirmPassword: 'DifferentPassword123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Passwords do not match');
      }
    });

    it('should reject password without uppercase', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject password without number', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: 'PasswordAbc',
        confirmPassword: 'PasswordAbc',
      });
      expect(result.success).toBe(false);
    });

    it('should reject if terms not accepted', () => {
      const result = registerSchema.safeParse({
        ...validData,
        terms: false,
      });
      expect(result.success).toBe(false);
    });

    it('should reject short first name', () => {
      const result = registerSchema.safeParse({
        ...validData,
        firstName: 'J',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('forgotPasswordSchema', () => {
    it('should validate correct email', () => {
      const result = forgotPasswordSchema.safeParse({
        email: 'test@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty email', () => {
      const result = forgotPasswordSchema.safeParse({
        email: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
      const result = forgotPasswordSchema.safeParse({
        email: 'not-an-email',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('resetPasswordSchema', () => {
    it('should validate correct reset data', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'NewPassword123',
        confirmPassword: 'NewPassword123',
      });
      expect(result.success).toBe(true);
    });

    it('should reject mismatched passwords', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'NewPassword123',
        confirmPassword: 'DifferentPassword123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('profileSchema', () => {
    it('should validate correct profile data', () => {
      const result = profileSchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        title: 'Senior Advisor',
        email: 'john@example.com',
        phone: '+1234567890',
        website: 'https://example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should require first name', () => {
      const result = profileSchema.safeParse({
        firstName: '',
        lastName: 'Doe',
      });
      expect(result.success).toBe(false);
    });

    it('should validate URL for website', () => {
      const result = profileSchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        website: 'not-a-url',
      });
      expect(result.success).toBe(false);
    });

    it('should allow empty website', () => {
      const result = profileSchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        website: '',
      });
      expect(result.success).toBe(true);
    });

    it('should limit bio to 500 characters', () => {
      const result = profileSchema.safeParse({
        firstName: 'John',
        lastName: 'Doe',
        bio: 'a'.repeat(501),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('familySchema', () => {
    it('should validate correct family data', () => {
      const result = familySchema.safeParse({
        name: 'Smith Family',
        wealth: '$10M+',
        role: 'personal-advisor',
      });
      expect(result.success).toBe(true);
    });

    it('should require family name', () => {
      const result = familySchema.safeParse({
        name: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short family name', () => {
      const result = familySchema.safeParse({
        name: 'A',
      });
      expect(result.success).toBe(false);
    });

    it('should validate role enum', () => {
      const result = familySchema.safeParse({
        name: 'Smith Family',
        role: 'invalid-role',
      });
      expect(result.success).toBe(false);
    });

    it('should limit description length', () => {
      const result = familySchema.safeParse({
        name: 'Smith Family',
        description: 'a'.repeat(1001),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('familyMemberSchema', () => {
    it('should validate correct member data', () => {
      const result = familyMemberSchema.safeParse({
        name: 'John Smith',
        role: 'head',
        email: 'john@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should require member name', () => {
      const result = familyMemberSchema.safeParse({
        name: '',
      });
      expect(result.success).toBe(false);
    });

    it('should validate email format', () => {
      const result = familyMemberSchema.safeParse({
        name: 'John Smith',
        email: 'invalid-email',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('serviceSchema', () => {
    it('should validate correct service data', () => {
      const result = serviceSchema.safeParse({
        name: 'Wealth Management',
        description: 'Comprehensive wealth management services',
        price: '$500/hour',
        isActive: true,
      });
      expect(result.success).toBe(true);
    });

    it('should require service name', () => {
      const result = serviceSchema.safeParse({
        name: '',
      });
      expect(result.success).toBe(false);
    });

    it('should limit description length', () => {
      const result = serviceSchema.safeParse({
        name: 'Service',
        description: 'a'.repeat(2001),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('consultationSchema', () => {
    it('should validate correct consultation data', () => {
      const result = consultationSchema.safeParse({
        title: 'Quarterly Review',
        familyId: 1,
        date: '2025-01-15',
        time: '14:00',
        type: 'video',
      });
      expect(result.success).toBe(true);
    });

    it('should require title', () => {
      const result = consultationSchema.safeParse({
        title: '',
        familyId: 1,
        date: '2025-01-15',
        time: '14:00',
      });
      expect(result.success).toBe(false);
    });

    it('should require valid familyId', () => {
      const result = consultationSchema.safeParse({
        title: 'Review',
        familyId: 0,
        date: '2025-01-15',
        time: '14:00',
      });
      expect(result.success).toBe(false);
    });

    it('should validate meeting link URL', () => {
      const result = consultationSchema.safeParse({
        title: 'Review',
        familyId: 1,
        date: '2025-01-15',
        time: '14:00',
        meetingLink: 'not-a-url',
      });
      expect(result.success).toBe(false);
    });

    it('should validate type enum', () => {
      const result = consultationSchema.safeParse({
        title: 'Review',
        familyId: 1,
        date: '2025-01-15',
        time: '14:00',
        type: 'invalid-type',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('taskSchema', () => {
    it('should validate correct task data', () => {
      const result = taskSchema.safeParse({
        title: 'Follow up with client',
        priority: 'high',
      });
      expect(result.success).toBe(true);
    });

    it('should require title', () => {
      const result = taskSchema.safeParse({
        title: '',
      });
      expect(result.success).toBe(false);
    });

    it('should validate priority enum', () => {
      const result = taskSchema.safeParse({
        title: 'Task',
        priority: 'invalid',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('credentialSchema', () => {
    it('should validate correct credential data', () => {
      const result = credentialSchema.safeParse({
        name: 'CFA Charter',
        issuer: 'CFA Institute',
        year: '2020',
      });
      expect(result.success).toBe(true);
    });

    it('should require credential name', () => {
      const result = credentialSchema.safeParse({
        name: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('messageSchema', () => {
    it('should validate correct message', () => {
      const result = messageSchema.safeParse({
        content: 'Hello, how are you?',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty message', () => {
      const result = messageSchema.safeParse({
        content: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject message over 5000 characters', () => {
      const result = messageSchema.safeParse({
        content: 'a'.repeat(5001),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('changePasswordSchema', () => {
    it('should validate correct password change', () => {
      const result = changePasswordSchema.safeParse({
        currentPassword: 'OldPassword123',
        newPassword: 'NewPassword123',
        confirmNewPassword: 'NewPassword123',
      });
      expect(result.success).toBe(true);
    });

    it('should reject mismatched new passwords', () => {
      const result = changePasswordSchema.safeParse({
        currentPassword: 'OldPassword123',
        newPassword: 'NewPassword123',
        confirmNewPassword: 'DifferentPassword123',
      });
      expect(result.success).toBe(false);
    });

    it('should validate new password requirements', () => {
      const result = changePasswordSchema.safeParse({
        currentPassword: 'OldPassword123',
        newPassword: 'weak',
        confirmNewPassword: 'weak',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('notificationSettingsSchema', () => {
    it('should validate correct settings', () => {
      const result = notificationSettingsSchema.safeParse({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
        weeklyDigest: true,
      });
      expect(result.success).toBe(true);
    });

    it('should require boolean values', () => {
      const result = notificationSettingsSchema.safeParse({
        emailNotifications: 'yes',
        pushNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
        weeklyDigest: true,
      });
      expect(result.success).toBe(false);
    });
  });
});
