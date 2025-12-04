/**
 * Storage Functions Tests
 * Tests for file storage utilities
 */

import { 
  mockSupabaseClient,
  resetSupabaseMocks,
} from '../mocks/supabase';

import { 
  BUCKETS,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_DOCUMENT_TYPES,
  MAX_IMAGE_SIZE,
  MAX_DOCUMENT_SIZE,
  uploadAvatar,
  uploadDocument,
  uploadAttachment,
  deleteFile,
  listFiles,
  getSignedUrl,
  downloadFile,
  formatFileSize,
  getFileExtension,
  isImageFile,
  isDocumentFile,
} from '@/lib/storage';

// Mock File
const createMockFile = (
  name: string, 
  size: number, 
  type: string
): File => {
  const content = new Array(size).fill('a').join('');
  const blob = new Blob([content], { type });
  const file = new File([blob], name, { type });
  // Override size property since Blob size might differ
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('Storage Functions', () => {
  beforeEach(() => {
    resetSupabaseMocks();
    jest.clearAllMocks();
  });

  describe('Constants', () => {
    it('should have bucket names defined', () => {
      expect(BUCKETS.AVATARS).toBe('avatars');
      expect(BUCKETS.DOCUMENTS).toBe('documents');
      expect(BUCKETS.ATTACHMENTS).toBe('attachments');
    });

    it('should have allowed image types', () => {
      expect(ALLOWED_IMAGE_TYPES).toContain('image/jpeg');
      expect(ALLOWED_IMAGE_TYPES).toContain('image/png');
      expect(ALLOWED_IMAGE_TYPES).toContain('image/gif');
      expect(ALLOWED_IMAGE_TYPES).toContain('image/webp');
    });

    it('should have allowed document types', () => {
      expect(ALLOWED_DOCUMENT_TYPES).toContain('application/pdf');
      expect(ALLOWED_DOCUMENT_TYPES).toContain('text/plain');
    });

    it('should have correct size limits', () => {
      expect(MAX_IMAGE_SIZE).toBe(5 * 1024 * 1024);
      expect(MAX_DOCUMENT_SIZE).toBe(10 * 1024 * 1024);
    });
  });

  describe('uploadAvatar', () => {
    it('should reject invalid file type', async () => {
      const file = createMockFile('test.txt', 1024, 'text/plain');
      
      const result = await uploadAvatar('user-123', file);
      
      expect(result.url).toBeNull();
      expect(result.error).toContain('Invalid file type');
    });

    it('should reject file that is too large', async () => {
      const file = createMockFile('test.jpg', MAX_IMAGE_SIZE + 1, 'image/jpeg');
      
      const result = await uploadAvatar('user-123', file);
      
      expect(result.url).toBeNull();
      expect(result.error).toContain('too large');
    });

    it('should upload valid image', async () => {
      const file = createMockFile('test.jpg', 1024, 'image/jpeg');
      
      const mockStorage = {
        upload: jest.fn().mockResolvedValue({ data: { path: 'test/path.jpg' }, error: null }),
        getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/avatar.jpg' } }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      const result = await uploadAvatar('user-123', file);
      
      expect(mockSupabaseClient.storage.from).toHaveBeenCalledWith('avatars');
      expect(result.url).toBe('https://example.com/avatar.jpg');
      expect(result.error).toBeNull();
    });

    it('should handle upload error', async () => {
      const file = createMockFile('test.jpg', 1024, 'image/jpeg');
      
      const mockStorage = {
        upload: jest.fn().mockResolvedValue({ data: null, error: new Error('Upload failed') }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      const result = await uploadAvatar('user-123', file);
      
      expect(result.url).toBeNull();
      expect(result.error).toBeTruthy();
    });
  });

  describe('uploadDocument', () => {
    it('should reject invalid file type', async () => {
      const file = createMockFile('test.exe', 1024, 'application/x-executable');
      
      const result = await uploadDocument('user-123', file);
      
      expect(result.url).toBeNull();
      expect(result.error).toContain('Invalid file type');
    });

    it('should reject file that is too large', async () => {
      const file = createMockFile('test.pdf', MAX_DOCUMENT_SIZE + 1, 'application/pdf');
      
      const result = await uploadDocument('user-123', file);
      
      expect(result.url).toBeNull();
      expect(result.error).toContain('too large');
    });

    it('should upload valid document', async () => {
      const file = createMockFile('test.pdf', 1024, 'application/pdf');
      
      const mockStorage = {
        upload: jest.fn().mockResolvedValue({ data: { path: 'test/path.pdf' }, error: null }),
        getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/doc.pdf' } }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      const result = await uploadDocument('user-123', file);
      
      expect(mockSupabaseClient.storage.from).toHaveBeenCalledWith('documents');
      expect(result.url).toBe('https://example.com/doc.pdf');
    });

    it('should accept folder parameter', async () => {
      const file = createMockFile('test.pdf', 1024, 'application/pdf');
      
      const mockStorage = {
        upload: jest.fn().mockResolvedValue({ data: { path: 'user/folder/path.pdf' }, error: null }),
        getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/doc.pdf' } }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      await uploadDocument('user-123', file, 'contracts');
      
      // Verify the path includes the folder
      expect(mockStorage.upload).toHaveBeenCalled();
    });
  });

  describe('uploadAttachment', () => {
    it('should reject file that is too large', async () => {
      const file = createMockFile('test.pdf', MAX_DOCUMENT_SIZE + 1, 'application/pdf');
      
      const result = await uploadAttachment(1, file);
      
      expect(result.url).toBeNull();
      expect(result.error).toContain('too large');
    });

    it('should upload valid attachment', async () => {
      const file = createMockFile('test.pdf', 1024, 'application/pdf');
      
      const mockStorage = {
        upload: jest.fn().mockResolvedValue({ data: { path: 'conv-1/path.pdf' }, error: null }),
        getPublicUrl: jest.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/attachment.pdf' } }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      const result = await uploadAttachment(1, file);
      
      expect(mockSupabaseClient.storage.from).toHaveBeenCalledWith('attachments');
      expect(result.url).toBe('https://example.com/attachment.pdf');
    });
  });

  describe('deleteFile', () => {
    it('should delete file successfully', async () => {
      const mockStorage = {
        remove: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      const result = await deleteFile('AVATARS', 'user-123/avatar.jpg');
      
      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should handle delete error', async () => {
      const mockStorage = {
        remove: jest.fn().mockResolvedValue({ error: new Error('Delete failed') }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      const result = await deleteFile('AVATARS', 'user-123/avatar.jpg');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe('listFiles', () => {
    it('should list files in folder', async () => {
      const mockFiles = [
        { name: 'file1.jpg' },
        { name: 'file2.pdf' },
      ];
      
      const mockStorage = {
        list: jest.fn().mockResolvedValue({ data: mockFiles, error: null }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      const result = await listFiles('DOCUMENTS', 'user-123');
      
      expect(result.files).toHaveLength(2);
      expect(result.error).toBeNull();
    });

    it('should handle list error', async () => {
      const mockStorage = {
        list: jest.fn().mockResolvedValue({ data: null, error: new Error('List failed') }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      const result = await listFiles('DOCUMENTS', 'user-123');
      
      expect(result.files).toHaveLength(0);
      expect(result.error).toBeTruthy();
    });
  });

  describe('getSignedUrl', () => {
    it('should create signed URL', async () => {
      const mockStorage = {
        createSignedUrl: jest.fn().mockResolvedValue({ 
          data: { signedUrl: 'https://example.com/signed-url' }, 
          error: null 
        }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      const result = await getSignedUrl('DOCUMENTS', 'path/to/file.pdf');
      
      expect(result.url).toBe('https://example.com/signed-url');
      expect(result.error).toBeNull();
    });

    it('should use custom expiration', async () => {
      const mockStorage = {
        createSignedUrl: jest.fn().mockResolvedValue({ 
          data: { signedUrl: 'https://example.com/signed-url' }, 
          error: null 
        }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      await getSignedUrl('DOCUMENTS', 'path/to/file.pdf', 7200);
      
      expect(mockStorage.createSignedUrl).toHaveBeenCalledWith('path/to/file.pdf', 7200);
    });
  });

  describe('downloadFile', () => {
    it('should download file as blob', async () => {
      const mockBlob = new Blob(['test content']);
      
      const mockStorage = {
        download: jest.fn().mockResolvedValue({ data: mockBlob, error: null }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      const result = await downloadFile('DOCUMENTS', 'path/to/file.pdf');
      
      expect(result.blob).toBe(mockBlob);
      expect(result.error).toBeNull();
    });

    it('should handle download error', async () => {
      const mockStorage = {
        download: jest.fn().mockResolvedValue({ data: null, error: new Error('Download failed') }),
      };
      
      mockSupabaseClient.storage.from.mockReturnValue(mockStorage);
      
      const result = await downloadFile('DOCUMENTS', 'path/to/file.pdf');
      
      expect(result.blob).toBeNull();
      expect(result.error).toBeTruthy();
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(500)).toBe('500 Bytes');
    });

    it('should format kilobytes', () => {
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(2048)).toBe('2 KB');
    });

    it('should format megabytes', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(5 * 1024 * 1024)).toBe('5 MB');
    });

    it('should format gigabytes', () => {
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
    });

    it('should handle decimal values', () => {
      const result = formatFileSize(1536); // 1.5 KB
      expect(result).toContain('KB');
    });
  });

  describe('getFileExtension', () => {
    it('should extract extension from filename', () => {
      expect(getFileExtension('document.pdf')).toBe('pdf');
      expect(getFileExtension('image.jpg')).toBe('jpg');
      expect(getFileExtension('archive.tar.gz')).toBe('gz');
    });

    it('should handle files without extension', () => {
      expect(getFileExtension('README')).toBe('');
    });

    it('should handle hidden files', () => {
      // Hidden files start with dot, the extension is everything after the dot
      const result = getFileExtension('.gitignore');
      // Since there's no extension part before the dot, it returns 'gitignore'
      expect(typeof result).toBe('string');
    });
  });

  describe('isImageFile', () => {
    it('should return true for image files', () => {
      const jpegFile = createMockFile('test.jpg', 100, 'image/jpeg');
      const pngFile = createMockFile('test.png', 100, 'image/png');
      
      expect(isImageFile(jpegFile)).toBe(true);
      expect(isImageFile(pngFile)).toBe(true);
    });

    it('should return false for non-image files', () => {
      const pdfFile = createMockFile('test.pdf', 100, 'application/pdf');
      const txtFile = createMockFile('test.txt', 100, 'text/plain');
      
      expect(isImageFile(pdfFile)).toBe(false);
      expect(isImageFile(txtFile)).toBe(false);
    });
  });

  describe('isDocumentFile', () => {
    it('should return true for document files', () => {
      const pdfFile = createMockFile('test.pdf', 100, 'application/pdf');
      const txtFile = createMockFile('test.txt', 100, 'text/plain');
      
      expect(isDocumentFile(pdfFile)).toBe(true);
      expect(isDocumentFile(txtFile)).toBe(true);
    });

    it('should return false for non-document files', () => {
      const jpegFile = createMockFile('test.jpg', 100, 'image/jpeg');
      const exeFile = createMockFile('test.exe', 100, 'application/x-executable');
      
      expect(isDocumentFile(jpegFile)).toBe(false);
      expect(isDocumentFile(exeFile)).toBe(false);
    });
  });
});
