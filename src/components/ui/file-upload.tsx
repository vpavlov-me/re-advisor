"use client";

import { useState, useRef, useCallback } from 'react';
import { Upload, X, FileText, Image, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  uploadAvatar, 
  uploadDocument, 
  formatFileSize, 
  isImageFile,
  MAX_IMAGE_SIZE,
  MAX_DOCUMENT_SIZE,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_DOCUMENT_TYPES
} from '@/lib/storage';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  type: 'avatar' | 'document';
  userId: string;
  onUploadComplete?: (url: string, path?: string) => void;
  className?: string;
  accept?: string;
  folder?: string;
  showPreview?: boolean;
}

export function FileUpload({
  type,
  userId,
  onUploadComplete,
  className,
  accept,
  folder,
  showPreview = true,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultAccept = type === 'avatar' 
    ? ALLOWED_IMAGE_TYPES.join(',') 
    : [...ALLOWED_DOCUMENT_TYPES, ...ALLOWED_IMAGE_TYPES].join(',');

  const maxSize = type === 'avatar' ? MAX_IMAGE_SIZE : MAX_DOCUMENT_SIZE;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleUpload(files[0]);
    }
  }, [userId, type, folder]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleUpload(files[0]);
    }
  }, [userId, type, folder]);

  const handleUpload = async (file: File) => {
    // Validate file size
    if (file.size > maxSize) {
      toast.error(`File too large. Maximum size is ${formatFileSize(maxSize)}`);
      return;
    }

    setIsUploading(true);

    // Create preview for images
    if (showPreview && isImageFile(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    try {
      let result;
      
      if (type === 'avatar') {
        result = await uploadAvatar(userId, file);
        if (result.error) {
          toast.error(result.error);
          setPreview(null);
          return;
        }
        if (result.url) {
          toast.success('Avatar uploaded successfully');
          onUploadComplete?.(result.url);
        }
      } else {
        result = await uploadDocument(userId, file, folder);
        if (result.error) {
          toast.error(result.error);
          setPreview(null);
          return;
        }
        if (result.url && result.path) {
          toast.success('Document uploaded successfully');
          onUploadComplete?.(result.url, result.path);
        }
      }
    } catch (error) {
      toast.error('Failed to upload file');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept || defaultAccept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50 hover:bg-muted/50",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
          </div>
        ) : preview ? (
          <div className="relative inline-block">
            {type === 'avatar' ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="h-24 w-24 rounded-full object-cover mx-auto"
              />
            ) : (
              <div className="flex items-center gap-2">
                <FileText className="h-8 w-8 text-primary" />
                <span className="text-sm text-foreground">File selected</span>
              </div>
            )}
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                clearPreview();
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {type === 'avatar' ? (
              <Image className="h-8 w-8 text-muted-foreground" />
            ) : (
              <Upload className="h-8 w-8 text-muted-foreground" />
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {type === 'avatar' ? 'Upload profile photo' : 'Upload document'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Max size: {formatFileSize(maxSize)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple avatar upload button
interface AvatarUploadProps {
  userId: string;
  currentAvatar?: string | null;
  onUploadComplete?: (url: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function AvatarUpload({ 
  userId, 
  currentAvatar, 
  onUploadComplete,
  size = 'md' 
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(currentAvatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-20 w-20',
    lg: 'h-32 w-32',
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('Image too large. Maximum size is 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const result = await uploadAvatar(userId, file);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.url) {
        setAvatarUrl(result.url);
        onUploadComplete?.(result.url);
        toast.success('Avatar updated');
      }
    } catch (error) {
      toast.error('Failed to upload avatar');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative inline-block">
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(',')}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />
      
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={cn(
          "rounded-full overflow-hidden cursor-pointer relative group",
          sizeClasses[size]
        )}
      >
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt="Avatar" 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <Image className="h-1/3 w-1/3 text-muted-foreground" />
          </div>
        )}
        
        {/* Overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity",
          isUploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          ) : (
            <Upload className="h-6 w-6 text-white" />
          )}
        </div>
      </div>
    </div>
  );
}
