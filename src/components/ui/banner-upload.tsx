"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BannerUploadProps {
  currentBannerUrl?: string | null;
  onUpload: (file: File) => Promise<string>;
  onRemove?: () => Promise<void>;
  className?: string;
  disabled?: boolean;
}

export function BannerUpload({
  currentBannerUrl,
  onUpload,
  onRemove,
  className,
  disabled = false,
}: BannerUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPEG, PNG, GIF, or WebP image.");
      return;
    }

    // Validate file size (max 10MB for banners)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Image must be less than 10MB.");
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
      <div className={cn("relative w-full", className)}>
        {/* Banner container */}
        <div
          className={cn(
            "group relative h-48 w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10",
            disabled && "cursor-not-allowed opacity-50"
          )}
          onClick={triggerFileInput}
        >
          {/* Current banner or placeholder */}
          {currentBannerUrl ? (
            <img
              src={currentBannerUrl}
              alt="Profile banner"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-muted-foreground">
                <ImagePlus className="mx-auto h-12 w-12 mb-2" />
                <p className="text-sm">Click to upload banner</p>
                <p className="text-xs">Recommended: 1200x300px, max 10MB</p>
              </div>
            </div>
          )}

          {/* Overlay on hover */}
          {!disabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="text-center text-white">
                <ImagePlus className="mx-auto h-8 w-8 mb-2" />
                <p className="text-sm font-medium">
                  {currentBannerUrl ? "Change banner" : "Upload banner"}
                </p>
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {(isUploading || isRemoving) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center text-white">
                <Loader2 className="mx-auto h-8 w-8 animate-spin mb-2" />
                <p className="text-sm">
                  {isUploading ? "Uploading..." : "Removing..."}
                </p>
              </div>
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
        {currentBannerUrl && onRemove && !disabled && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            disabled={isRemoving || isUploading}
            className={cn(
              "absolute right-2 top-2 rounded-md bg-destructive p-2 text-destructive-foreground shadow-lg transition-colors hover:bg-destructive/90",
              "focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-2 text-sm text-destructive">{error}</p>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Preview Banner</DialogTitle>
            <DialogDescription>
              This is how your banner will look. Click confirm to upload.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-4 py-4">
            {previewUrl && (
              <div className="w-full overflow-hidden rounded-lg border-2 border-muted">
                <img
                  src={previewUrl}
                  alt="Banner preview"
                  className="h-48 w-full object-cover"
                />
              </div>
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
