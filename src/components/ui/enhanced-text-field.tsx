"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import type { Field } from "@/types/workshop-constructor";

interface EnhancedTextFieldProps {
  field: Field;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  showValidation?: boolean;
}

export function EnhancedTextField({
  field,
  value,
  onChange,
  className,
  showValidation = true,
}: EnhancedTextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);

  const characterCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  // Validation states
  const isRequired = field.required;
  const minLength = field.minLength || 0;
  const maxLength = field.maxLength;
  const isEmpty = value.trim().length === 0;
  const isTooShort = value.trim().length > 0 && value.trim().length < minLength;
  const isTooLong = maxLength ? value.length > maxLength : false;
  const isValid = !isEmpty && !isTooShort && !isTooLong;

  // Progress calculation (for min/max length)
  const getProgress = useCallback(() => {
    if (!minLength) return 100;
    const progress = Math.min((value.length / minLength) * 100, 100);
    return progress;
  }, [value.length, minLength]);

  const progress = getProgress();

  // Validation message
  const getValidationMessage = () => {
    if (isEmpty && isRequired && hasBlurred) {
      return { type: "error", message: "This field is required" };
    }
    if (isTooShort && hasBlurred) {
      return {
        type: "warning",
        message: `Minimum ${minLength} characters required (currently ${value.trim().length})`,
      };
    }
    if (isTooLong) {
      return {
        type: "error",
        message: `Maximum ${maxLength} characters exceeded`,
      };
    }
    if (isValid && hasBlurred && minLength > 0) {
      return { type: "success", message: "Looks good!" };
    }
    return null;
  };

  const validationMessage = getValidationMessage();

  // Auto-save indicator
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (!field.autoSave) return;

    const timer = setTimeout(() => {
      if (value) {
        setIsSaving(true);
        setTimeout(() => {
          setIsSaving(false);
          setLastSaved(new Date());
        }, 500);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [value, field.autoSave]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    // Don't allow exceeding max length if it's set
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    onChange(newValue);
  };

  const isTextarea = field.type === "textarea" || field.type === "rich-text";

  return (
    <div className={cn("space-y-2", className)}>
      {/* Label */}
      <div className="flex items-center justify-between">
        <Label htmlFor={field.key} className="flex items-center gap-2">
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
        </Label>
        {field.autoSave && (
          <span className="text-xs text-muted-foreground">
            {isSaving ? (
              "Saving..."
            ) : lastSaved ? (
              `Saved ${lastSaved.toLocaleTimeString()}`
            ) : (
              "Auto-save enabled"
            )}
          </span>
        )}
      </div>

      {/* Help Text */}
      {field.helpText && (
        <Alert className="py-2">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">{field.helpText}</AlertDescription>
        </Alert>
      )}

      {/* Input Field */}
      <div className="relative">
        {isTextarea ? (
          <Textarea
            id={field.key}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setHasBlurred(true);
            }}
            placeholder={field.placeholder}
            rows={6}
            className={cn(
              "resize-none",
              validationMessage?.type === "error" && "border-red-500 focus-visible:ring-red-500",
              validationMessage?.type === "success" && "border-green-500 focus-visible:ring-green-500"
            )}
          />
        ) : (
          <Input
            id={field.key}
            type={field.type}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setHasBlurred(true);
            }}
            placeholder={field.placeholder}
            className={cn(
              validationMessage?.type === "error" && "border-red-500 focus-visible:ring-red-500",
              validationMessage?.type === "success" && "border-green-500 focus-visible:ring-green-500"
            )}
          />
        )}
      </div>

      {/* Progress Bar (for min length) */}
      {minLength > 0 && isFocused && !isTooLong && (
        <div className="space-y-1">
          <Progress value={progress} className="h-1" />
          <p className="text-xs text-muted-foreground">
            {value.length >= minLength
              ? "Minimum length reached"
              : `${minLength - value.length} more characters to minimum`}
          </p>
        </div>
      )}

      {/* Character/Word Count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex gap-3">
          {field.showCharacterCount && (
            <span className={cn(isTooLong && "text-red-500 font-medium")}>
              {characterCount}
              {maxLength && ` / ${maxLength}`} characters
            </span>
          )}
          {field.showWordCount && <span>{wordCount} words</span>}
        </div>
      </div>

      {/* Validation Message */}
      {showValidation && validationMessage && (
        <div
          className={cn(
            "flex items-center gap-2 text-sm",
            validationMessage.type === "error" && "text-red-600 dark:text-red-500",
            validationMessage.type === "warning" && "text-yellow-600 dark:text-yellow-500",
            validationMessage.type === "success" && "text-green-600 dark:text-green-500"
          )}
        >
          {validationMessage.type === "error" && <AlertCircle className="h-4 w-4" />}
          {validationMessage.type === "success" && <CheckCircle2 className="h-4 w-4" />}
          {validationMessage.type === "warning" && <AlertCircle className="h-4 w-4" />}
          <span>{validationMessage.message}</span>
        </div>
      )}

      {/* Validation Hints */}
      {field.validationHints && field.validationHints.length > 0 && (isFocused || hasBlurred) && (
        <div className="space-y-1 text-xs text-muted-foreground">
          {field.validationHints.map((hint, index) => (
            <div key={index} className="flex items-start gap-1">
              <span className="mt-0.5">•</span>
              <span>{hint}</span>
            </div>
          ))}
        </div>
      )}

      {/* Example Text */}
      {field.exampleText && isFocused && isEmpty && (
        <Alert className="py-2 bg-muted/50">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <span className="font-medium">Example:</span> {field.exampleText}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
