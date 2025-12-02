"use client";

import { useState } from "react";
import { 
  Shield, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle,
  Upload,
  FileText,
  Camera,
  ChevronRight,
  Loader2,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { KycStatus } from "@/lib/database.types";

interface KycStatusCardProps {
  status: KycStatus;
  submittedAt?: string | null;
  verifiedAt?: string | null;
  onStartVerification?: () => void;
  onRetryVerification?: () => void;
}

const statusConfig: Record<KycStatus, {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  title: string;
  description: string;
}> = {
  not_started: {
    icon: Shield,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    title: 'Identity Not Verified',
    description: 'Complete identity verification to unlock all platform features.',
  },
  pending: {
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    title: 'Verification In Progress',
    description: 'We\'re reviewing your documents. This usually takes 1-2 business days.',
  },
  verified: {
    icon: CheckCircle2,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    title: 'Identity Verified',
    description: 'Your identity has been verified. You have full access to all features.',
  },
  failed: {
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    title: 'Verification Failed',
    description: 'We couldn\'t verify your identity. Please try again with valid documents.',
  },
};

export function KycStatusCard({
  status,
  submittedAt,
  verifiedAt,
  onStartVerification,
  onRetryVerification,
}: KycStatusCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const handleStartVerification = () => {
    setIsDialogOpen(true);
    setStep(1);
  };

  const handleSubmitVerification = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsDialogOpen(false);
    onStartVerification?.();
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Identity Verification
            </CardTitle>
            {status === 'verified' && (
              <Badge variant="success">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
            {status === 'pending' && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                <Clock className="h-3 w-3 mr-1" />
                Pending
              </Badge>
            )}
            {status === 'failed' && (
              <Badge variant="destructive">
                <XCircle className="h-3 w-3 mr-1" />
                Failed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className={`p-4 rounded-lg ${config.bgColor}`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${config.bgColor}`}>
                <StatusIcon className={`h-5 w-5 ${config.color}`} />
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${config.color}`}>{config.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
                
                {submittedAt && status === 'pending' && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Submitted on {new Date(submittedAt).toLocaleDateString()}
                  </p>
                )}
                
                {verifiedAt && status === 'verified' && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Verified on {new Date(verifiedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {status === 'not_started' && (
            <Button 
              className="w-full mt-4" 
              onClick={handleStartVerification}
            >
              Start Verification
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}

          {status === 'failed' && (
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={handleStartVerification}
            >
              Try Again
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}

          {status === 'pending' && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Verification Progress</span>
                <span className="font-medium">In Review</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Identity Verification</DialogTitle>
            <DialogDescription>
              {step === 1 && "We need to verify your identity to ensure platform security."}
              {step === 2 && "Upload a photo of your government-issued ID."}
              {step === 3 && "Take a selfie to match with your ID."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`
                    h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${s <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                  `}>
                    {s < step ? <CheckCircle2 className="h-4 w-4" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 h-0.5 mx-2 ${s < step ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Instructions */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">What you'll need:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Government-issued photo ID (passport, driver's license)
                    </li>
                    <li className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Camera access for a selfie
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground">
                  This process takes about 2 minutes. Your data is encrypted and secure.
                </p>
              </div>
            )}

            {/* Step 2: ID Upload */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload your ID</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG or PDF up to 10MB
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Choose File
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Passport
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Driver's License
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Selfie */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Take a selfie</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Make sure your face is clearly visible
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Open Camera
                  </Button>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-sm">
                  <p className="text-blue-700 dark:text-blue-300">
                    <strong>Tips:</strong> Good lighting, no glasses, face the camera directly
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)}>
                Continue
              </Button>
            ) : (
              <Button onClick={handleSubmitVerification} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit for Verification'
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Simple badge for showing KYC status in other places
export function KycStatusBadge({ status }: { status: KycStatus }) {
  switch (status) {
    case 'verified':
      return (
        <Badge variant="success">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-300">
          <Clock className="h-3 w-3 mr-1" />
          Pending Verification
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Verification Failed
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          <Shield className="h-3 w-3 mr-1" />
          Not Verified
        </Badge>
      );
  }
}
