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
  Image
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

// Map field keys to action buttons
function getFieldAction(
  field: ProfileField,
  onEditProfile?: () => void,
  onSetupPayments?: () => void,
  onVerifyIdentity?: () => void
): { label: string; onClick: () => void } | null {
  switch (field.key) {
    case 'stripe_account_status':
      return onSetupPayments ? { label: 'Set up payments', onClick: onSetupPayments } : null;
    case 'kyc_status':
      return onVerifyIdentity ? { label: 'Verify identity', onClick: onVerifyIdentity } : null;
    default:
      return onEditProfile ? { label: `Add ${field.label.toLowerCase()}`, onClick: onEditProfile } : null;
  }
}

export function ProfileCompletionCard({
  profile,
  onEditProfile,
  onSetupPayments,
  onVerifyIdentity,
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-medium text-foreground">Profile Completion</h3>
            <p className="text-sm text-muted-foreground">
              {completion.percentage >= 100 
                ? 'Your profile is complete!' 
                : 'Complete your profile to attract more families'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-primary">{completion.percentage}%</span>
          </div>
        </div>

        <div className="relative mb-4">
          <Progress value={completion.percentage} className="h-3" />
        </div>

        {/* Section Progress */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {Object.entries(completion.sectionProgress).map(([section, data]) => (
            <div key={section} className="text-center">
              <div className="text-xs text-muted-foreground capitalize mb-1">{section}</div>
              <div className="flex items-center justify-center gap-1">
                {data.percentage === 100 ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <span className="text-sm font-medium">{data.percentage}%</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Next Action Alert */}
        {nextAction.field && nextAction.priority === 'high' && (
          <div className="p-3 mb-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                {nextAction.message}
              </span>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {quickActions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Complete these to improve your profile
            </p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map(({ field, icon: Icon, action }) => (
                <Badge
                  key={field.key}
                  variant="outline"
                  className="cursor-pointer hover:bg-muted/50 transition-colors py-1.5 px-3"
                  onClick={action?.onClick}
                >
                  <Icon className="h-3 w-3 mr-1.5" />
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Complete Profile Button */}
        {completion.percentage < 100 && onEditProfile && (
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={onEditProfile}
          >
            Complete Your Profile
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
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
      <Badge variant="secondary" className="bg-green-100 text-green-700">
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
