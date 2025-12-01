/**
 * Invitations Helper Functions Tests
 * Tests for pure helper functions in invitations module
 */

import { 
  getQRCodeUrl,
  getStatusColor,
  invitationRoleLabels,
  invitationStatusLabels,
} from '@/lib/invitations';

describe('Invitations Helper Functions', () => {
  describe('getQRCodeUrl', () => {
    it('should generate a QR code URL', () => {
      const inviteUrl = 'https://example.com/invite/abc123';
      const qrUrl = getQRCodeUrl(inviteUrl);
      
      expect(typeof qrUrl).toBe('string');
      expect(qrUrl.length).toBeGreaterThan(0);
      expect(qrUrl).toContain(encodeURIComponent(inviteUrl));
    });

    it('should use default size', () => {
      const inviteUrl = 'https://example.com/invite/abc123';
      const qrUrl = getQRCodeUrl(inviteUrl);
      
      expect(qrUrl).toContain('200');
    });

    it('should accept custom size', () => {
      const inviteUrl = 'https://example.com/invite/abc123';
      const qrUrl = getQRCodeUrl(inviteUrl, 300);
      
      expect(qrUrl).toContain('300');
    });
  });

  describe('getStatusColor', () => {
    it('should return yellow for pending status', () => {
      const color = getStatusColor('pending');
      expect(color).toContain('yellow');
    });

    it('should return green for accepted status', () => {
      const color = getStatusColor('accepted');
      expect(color).toContain('green');
    });

    it('should return gray for expired status', () => {
      const color = getStatusColor('expired');
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

  describe('Label Maps', () => {
    it('should have invitationRoleLabels defined', () => {
      expect(invitationRoleLabels).toBeDefined();
      expect(typeof invitationRoleLabels).toBe('object');
    });

    it('should have invitationStatusLabels defined', () => {
      expect(invitationStatusLabels).toBeDefined();
      expect(typeof invitationStatusLabels).toBe('object');
    });

    it('should have labels for common roles', () => {
      const roles = Object.keys(invitationRoleLabels);
      expect(roles.length).toBeGreaterThan(0);
    });

    it('should have labels for common statuses', () => {
      expect(invitationStatusLabels['pending']).toBeDefined();
      expect(invitationStatusLabels['accepted']).toBeDefined();
    });
  });
});
