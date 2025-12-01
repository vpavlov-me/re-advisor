/**
 * Families Helper Functions Tests
 * Tests for pure helper functions in families module
 */

import { 
  getRoleColor, 
  getStatusColor, 
  getPaymentStatusColor,
  familyRoleLabels,
  familyStatusLabels,
  paymentStatusLabels,
} from '@/lib/families';

describe('Families Helper Functions', () => {
  describe('getRoleColor', () => {
    it('should return purple for personal-advisor', () => {
      const color = getRoleColor('personal-advisor');
      expect(color).toContain('purple');
    });

    it('should return blue for consultant', () => {
      const color = getRoleColor('consultant');
      expect(color).toContain('blue');
    });

    it('should return gray for unknown role', () => {
      const color = getRoleColor('unknown');
      expect(color).toContain('gray');
    });

    it('should return gray for undefined role', () => {
      const color = getRoleColor(undefined);
      expect(color).toContain('gray');
    });
  });

  describe('getStatusColor', () => {
    it('should return green for active status', () => {
      const color = getStatusColor('active');
      expect(color).toContain('green');
    });

    it('should return yellow for pending status', () => {
      const color = getStatusColor('pending');
      expect(color).toContain('yellow');
    });

    it('should return gray for inactive status', () => {
      const color = getStatusColor('inactive');
      expect(color).toContain('gray');
    });

    it('should return gray for unknown status', () => {
      const color = getStatusColor('unknown');
      expect(color).toContain('gray');
    });
  });

  describe('getPaymentStatusColor', () => {
    it('should return green for paid status', () => {
      const color = getPaymentStatusColor('paid');
      expect(color).toContain('green');
    });

    it('should return orange for pending status', () => {
      const color = getPaymentStatusColor('pending');
      expect(color).toContain('orange');
    });

    it('should return gray for no-invoices status', () => {
      const color = getPaymentStatusColor('no-invoices');
      expect(color).toContain('gray');
    });

    it('should return gray for unknown status', () => {
      const color = getPaymentStatusColor('unknown');
      expect(color).toContain('gray');
    });
  });

  describe('Label Maps', () => {
    it('should have correct familyRoleLabels', () => {
      expect(familyRoleLabels).toBeDefined();
      expect(typeof familyRoleLabels).toBe('object');
      expect(familyRoleLabels['personal-advisor']).toBeDefined();
      expect(familyRoleLabels['consultant']).toBeDefined();
    });

    it('should have correct familyStatusLabels', () => {
      expect(familyStatusLabels).toBeDefined();
      expect(typeof familyStatusLabels).toBe('object');
      expect(familyStatusLabels['active']).toBeDefined();
      expect(familyStatusLabels['pending']).toBeDefined();
      expect(familyStatusLabels['inactive']).toBeDefined();
    });

    it('should have correct paymentStatusLabels', () => {
      expect(paymentStatusLabels).toBeDefined();
      expect(typeof paymentStatusLabels).toBe('object');
      expect(paymentStatusLabels['paid']).toBeDefined();
      expect(paymentStatusLabels['pending']).toBeDefined();
    });
  });
});
