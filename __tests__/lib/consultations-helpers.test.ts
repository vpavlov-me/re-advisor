/**
 * Consultations Helper Functions Tests
 * Tests for pure helper functions in consultations module
 */

import { 
  getStatusColor, 
  getPaymentStatusColor,
  formatConsultationDate,
  formatConsultationDateShort,
  isConsultationPast,
  generateMeetingLink,
  consultationStatusLabels,
  paymentStatusLabels,
  consultationTypeLabels,
} from '@/lib/consultations';

describe('Consultations Helper Functions', () => {
  describe('getStatusColor', () => {
    it('should return blue for scheduled status', () => {
      const color = getStatusColor('scheduled');
      expect(color).toContain('blue');
    });

    it('should return gray for completed status', () => {
      const color = getStatusColor('completed');
      expect(color).toContain('gray');
    });

    it('should return red for cancelled status', () => {
      const color = getStatusColor('cancelled');
      expect(color).toContain('red');
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

    it('should return orange for awaiting status', () => {
      const color = getPaymentStatusColor('awaiting');
      expect(color).toContain('orange');
    });

    it('should return gray for unknown status', () => {
      const color = getPaymentStatusColor('unknown');
      expect(color).toContain('gray');
    });
  });

  describe('formatConsultationDate', () => {
    it('should format valid date', () => {
      const result = formatConsultationDate('2024-03-15');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle undefined', () => {
      const result = formatConsultationDate(undefined);
      expect(typeof result).toBe('string');
    });
  });

  describe('formatConsultationDateShort', () => {
    it('should format date in short format', () => {
      const result = formatConsultationDateShort('2024-03-15');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle undefined', () => {
      const result = formatConsultationDateShort(undefined);
      expect(typeof result).toBe('string');
    });
  });

  describe('isConsultationPast', () => {
    it('should return true for past date', () => {
      const pastDate = '2020-01-01';
      const pastTime = '10:00';
      const result = isConsultationPast(pastDate, pastTime);
      expect(result).toBe(true);
    });

    it('should return false for future date', () => {
      const futureDate = '2030-12-31';
      const futureTime = '10:00';
      const result = isConsultationPast(futureDate, futureTime);
      expect(result).toBe(false);
    });

    it('should handle undefined values', () => {
      const result = isConsultationPast(undefined, undefined);
      expect(typeof result).toBe('boolean');
    });
  });

  describe('generateMeetingLink', () => {
    it('should generate a valid meeting link', () => {
      const link = generateMeetingLink();
      expect(typeof link).toBe('string');
      expect(link.length).toBeGreaterThan(0);
    });

    it('should generate unique links', () => {
      const link1 = generateMeetingLink();
      const link2 = generateMeetingLink();
      expect(link1).not.toBe(link2);
    });

    it('should generate Jitsi Meet link', () => {
      const link = generateMeetingLink();
      expect(link).toMatch(/^https:\/\/meet\.jit\.si\/readvisor-/);
    });

    it('should include consultation ID when provided', () => {
      const link = generateMeetingLink(123);
      expect(link).toContain('readvisor-c123-');
    });

    it('should include consultation ID as string', () => {
      const link = generateMeetingLink('456');
      expect(link).toContain('readvisor-c456-');
    });

    it('should sanitize family name when provided', () => {
      const link = generateMeetingLink(undefined, 'Test Family');
      expect(link).toMatch(/^https:\/\/meet\.jit\.si\/readvisor-testfamily-/);
    });

    it('should handle family name with special characters', () => {
      const link = generateMeetingLink(undefined, 'Family @#$ Name!');
      expect(link).toMatch(/^https:\/\/meet\.jit\.si\/readvisor-familyname-/);
    });

    it('should truncate long family names', () => {
      const longName = 'This Is A Very Long Family Name That Exceeds The Limit';
      const link = generateMeetingLink(undefined, longName);
      expect(link).toMatch(/^https:\/\/meet\.jit\.si\/readvisor-/);
      // Should not contain the full name
      expect(link).not.toContain('thisisaverylongfamilynamethatexceedsthelimit');
    });

    it('should prioritize consultation ID over family name', () => {
      const link = generateMeetingLink(789, 'Family Name');
      expect(link).toContain('readvisor-c789-');
      expect(link).not.toContain('familyname');
    });
  });

  describe('Label Maps', () => {
    it('should have consultationStatusLabels defined', () => {
      expect(consultationStatusLabels).toBeDefined();
      expect(typeof consultationStatusLabels).toBe('object');
    });

    it('should have paymentStatusLabels defined', () => {
      expect(paymentStatusLabels).toBeDefined();
      expect(typeof paymentStatusLabels).toBe('object');
    });

    it('should have consultationTypeLabels defined', () => {
      expect(consultationTypeLabels).toBeDefined();
      expect(typeof consultationTypeLabels).toBe('object');
    });
  });
});
