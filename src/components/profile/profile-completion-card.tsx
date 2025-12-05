"use client";

import { useMemo } from "react";
import Link from "next/link";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Globe, 
  Linkedin, 
  CreditCard,
  Shield,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Image,
  X,
  Calendar
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  calculateProfileCompletion, 
  getNextRecommendedAction,
  type ProfileField 
} from "@/lib/profile";
import type { Profile } from "@/lib/database.types";

interface ProfileCompletionCardProps {
  profile: Partial<Profile> | null;
  onEditProfile?: () => void;
  onSetupPayments?: () => void;
  onVerifyIdentity?: () => void;
  onAddAvailability?: () => void;
  onHide?: () => void;
  compact?: boolean;
}

// Map field keys to icons
const fieldIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  first_name: User,
  last_name: User,
  title: User,
  bio: User,
  avatar_url: Image,
  email: Mail,
  phone: Phone,
  location: MapPin,
  timezone: MapPin,
  company: Building2,
  website: Globe,
  linkedin: Linkedin,
  twitter: Globe,
  stripe_account_status: CreditCard,
  kyc_status: Shield,
};

// Map field keys to action buttons and their hrefs
function getFieldAction(
  field: ProfileField,
  onEditProfile?: () => void,
  onSetupPayments?: () => void,
  onVerifyIdentity?: () => void
): { label: string; onClick?: () => void; href?: string } | null {
  switch (field.key) {
    case 'stripe_account_status':
      return { label: 'Set up payments', onClick: onSetupPayments, href: '/payments' };
    case 'kyc_status':
      return { label: 'Verify identity', onClick: onVerifyIdentity, href: '/settings' };
    case 'avatar_url':
      return { label: 'Add photo', onClick: onEditProfile, href: '/profile' };
    default:
      return onEditProfile ? { label: `Add ${field.label.toLowerCase()}`, onClick: onEditProfile, href: '/profile' } : null;
  }
}

export function ProfileCompletionCard({
  profile,
  onEditProfile,
  onSetupPayments,
  onVerifyIdentity,
  onAddAvailability,
  onHide,
  compact = false,
}: ProfileCompletionCardProps) {
  const completion = useMemo(() => calculateProfileCompletion(profile), [profile]);
  const nextAction = useMemo(() => getNextRecommendedAction(completion), [completion]);

  // Get top 3 missing fields to show as quick actions
  const quickActions = useMemo(() => {
    return completion.missingFields
      .slice(0, 3)
      .map(field => ({
        field,
        icon: fieldIcons[field.key] || User,
        action: getFieldAction(field, onEditProfile, onSetupPayments, onVerifyIdentity),
      }));
  }, [completion.missingFields, onEditProfile, onSetupPayments, onVerifyIdentity]);

  // Progress bar color based on percentage
  const progressColor = useMemo(() => {
    if (completion.percentage >= 80) return 'bg-green-500';
    if (completion.percentage >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  }, [completion.percentage]);

  if (compact) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-sm font-semibold text-primary">{completion.percentage}%</span>
          </div>
          <Progress value={completion.percentage} className="h-2" />
          {nextAction.field && nextAction.priority !== 'low' && (
            <p className="text-xs text-muted-foreground mt-2">{nextAction.message}</p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-base font-medium text-foreground">Profile Completion</h3>
              <p className="text-sm text-muted-foreground">
                {completion.percentage >= 100 
                  ? 'Your profile is complete!' 
                  : 'Complete your profile to attract more families'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">{completion.percentage}%</span>
            {onHide && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={onHide}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="relative mb-4">
          <Progress value={completion.percentage} className="h-3" />
        </div>

        {/* Quick Actions as Buttons */}
        {quickActions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {quickActions.map(({ field, action }) => (
              <Link key={field.key} href={action?.href || '/profile'}>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-4 hover:bg-muted/50 transition-colors"
                  onClick={action?.onClick}
                >
                  {action?.label || field.label}
                </Button>
              </Link>
            ))}
          </div>
        )}

        {completion.percentage === 100 && (
          <div className="flex items-center justify-center gap-2 mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Profile complete! You're ready to connect with families.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Smaller version for sidebar/header
export function ProfileCompletionBadge({ 
  profile 
}: { 
  profile: Partial<Profile> | null 
}) {
  const completion = useMemo(() => calculateProfileCompletion(profile), [profile]);

  if (completion.percentage >= 100) {
    return (
      <Badge variant="success">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Profile Complete
      </Badge>
    );
  }

  return (
    <Link href="/profile">
      <Badge 
        variant="outline" 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
      >
        Profile {completion.percentage}% complete
      </Badge>
    </Link>
  );
}
