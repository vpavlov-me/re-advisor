"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { Camera, X, Loader2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  fallbackName?: string;
  onUpload: (file: File) => Promise<string>;
  onRemove?: () => Promise<void>;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  disabled?: boolean;
}

const sizeClasses = {
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-24 w-24",
  xl: "h-32 w-32",
};

const iconSizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

export function AvatarUpload({
  currentAvatarUrl,
  fallbackName = "",
  onUpload,
  onRemove,
  size = "lg",
  className,
  disabled = false,
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = fallbackName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPEG, PNG, GIF, or WebP image.");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Image must be less than 5MB.");
      return;
    }

    setError(null);

    // Show preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setShowPreview(true);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      await onUpload(file);
      setShowPreview(false);
      setPreviewUrl(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCancelPreview = () => {
    setShowPreview(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (!onRemove) return;

    setIsRemoving(true);
    setError(null);

    try {
      await onRemove();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove image");
    } finally {
      setIsRemoving(false);
    }
  };

  const triggerFileInput = () => {
    if (!disabled && !isUploading && !isRemoving) {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      <div className={cn("relative inline-block", className)}>
        {/* Avatar */}
        <div
          className={cn(
            "group relative cursor-pointer",
            disabled && "cursor-not-allowed opacity-50"
          )}
          onClick={triggerFileInput}
        >
          <Avatar className={cn(sizeClasses[size], "border-2 border-muted")}>
            <AvatarImage src={currentAvatarUrl || undefined} alt={fallbackName} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials || <User className={iconSizeClasses[size]} />}
            </AvatarFallback>
          </Avatar>

          {/* Overlay on hover */}
          {!disabled && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100",
                sizeClasses[size]
              )}
            >
              <Camera className={cn("text-white", iconSizeClasses[size])} />
            </div>
          )}

          {/* Loading overlay */}
          {(isUploading || isRemoving) && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-full bg-black/50",
                sizeClasses[size]
              )}
            >
              <Loader2
                className={cn("animate-spin text-white", iconSizeClasses[size])}
              />
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleFileSelect}
          disabled={disabled || isUploading || isRemoving}
        />

        {/* Remove button */}
        {currentAvatarUrl && onRemove && !disabled && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            disabled={isRemoving || isUploading}
            className={cn(
              "absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm transition-colors hover:bg-destructive/90",
              "focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2"
            )}
          >
            <X className="h-3 w-3" />
          </button>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-2 text-xs text-destructive">{error}</p>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Preview Avatar</DialogTitle>
            <DialogDescription>
              This is how your avatar will look. Click confirm to upload.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-4 py-4">
            {previewUrl && (
              <Avatar className="h-32 w-32 border-2 border-muted">
                <AvatarImage src={previewUrl} alt="Preview" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancelPreview}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
