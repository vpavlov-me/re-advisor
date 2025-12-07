"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileCompletionCard } from "@/components/profile/profile-completion-card";
import type { Profile } from "../types";

interface ProfileSidebarProps {
  profile: Profile;
  hideProfileCompletionCard: boolean;
  settingsLinks: Array<{ label: string; href: string; icon: any }>;
  onEditProfile: () => void;
  onHideProfileCompletionCard: () => void;
}

const navigationItems = [
  { id: "header", label: "Profile" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "specialization", label: "Specialization" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "recommendations", label: "Recommendations" },
  { id: "contact", label: "Contact" },
];

export function ProfileSidebar({ 
  profile, 
  hideProfileCompletionCard,
  settingsLinks,
  onEditProfile,
  onHideProfileCompletionCard
}: ProfileSidebarProps) {
  const router = useRouter();

  return (
    <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
      {/* Page Navigation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">On This Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block text-sm text-muted-foreground hover:text-foreground py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </CardContent>
      </Card>

      {/* Profile Completion */}
      {!hideProfileCompletionCard && (
        <ProfileCompletionCard
          profile={profile}
          onEditProfile={onEditProfile}
          onSetupPayments={() => router.push('/payments')}
          onVerifyIdentity={() => router.push('/settings')}
          onAddAvailability={() => router.push('/consultations/availability')}
          onHide={onHideProfileCompletionCard}
        />
      )}

      {/* Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {settingsLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <link.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{link.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Member Since */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Member since {profile.joined_date}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
