// Form Validation Schemas using Zod
import { z } from 'zod';

// ============ AUTH SCHEMAS ============

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// ============ PROFILE SCHEMAS ============

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  title: z.string().optional(),
  email: z.string().email('Please enter a valid email').optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  timezone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  twitter: z.string().optional(),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional(),
});

// ============ FAMILY SCHEMAS ============

export const familySchema = z.object({
  name: z.string().min(1, 'Family name is required').min(2, 'Name must be at least 2 characters'),
  wealth: z.string().optional(),
  role: z.enum(['external-consul', 'consultant', 'personal-advisor']).optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  description: z.string().max(1000, 'Description must be 1000 characters or less').optional(),
});

export const familyMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional(),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
});

// ============ SERVICE SCHEMAS ============

export const serviceSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  description: z.string().max(2000, 'Description must be 2000 characters or less').optional(),
  price: z.string().optional(),
  duration: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean().default(true),
});

// ============ CONSULTATION SCHEMAS ============

export const consultationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  familyId: z.number().min(1, 'Please select a family'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.string().optional(),
  type: z.enum(['video', 'in-person', 'phone']).default('video'),
  meetingLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  location: z.string().optional(),
  price: z.string().optional(),
  notes: z.string().max(2000, 'Notes must be 2000 characters or less').optional(),
  agenda: z.array(z.string()).optional(),
});

// ============ TASK SCHEMAS ============

export const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  familyId: z.number().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

// ============ CREDENTIAL SCHEMAS ============

export const credentialSchema = z.object({
  name: z.string().min(1, 'Credential name is required'),
  issuer: z.string().optional(),
  year: z.string().optional(),
  credentialId: z.string().optional(),
  expiryDate: z.string().optional(),
});

// ============ MESSAGE SCHEMAS ============

export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(5000, 'Message too long'),
});

// ============ SETTINGS SCHEMAS ============

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmNewPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Passwords do not match',
  path: ['confirmNewPassword'],
});

export const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  weeklyDigest: z.boolean(),
});

// ============ TYPE EXPORTS ============

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type FamilyFormData = z.infer<typeof familySchema>;
export type FamilyMemberFormData = z.infer<typeof familyMemberSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;
export type ConsultationFormData = z.infer<typeof consultationSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
export type CredentialFormData = z.infer<typeof credentialSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type NotificationSettingsFormData = z.infer<typeof notificationSettingsSchema>;
