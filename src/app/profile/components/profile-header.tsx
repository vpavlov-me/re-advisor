"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { 
  Edit, 
  BadgeCheck, 
  CheckCircle, 
  MapPin, 
  Star,
  Share2,
  ExternalLink
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  profile: {
    id: string;
    first_name?: string | null;
    last_name?: string | null;
    title?: string | null;
    location?: string | null;
    avatar_url?: string | null;
    banner_url?: string | null;
    rating?: number | null;
    reviews_count?: number | null;
  };
  onEditProfile: () => void;
  onEditBanner: () => void;
  getFullName: (profile: any) => string;
  getInitials: (firstName?: string | null, lastName?: string | null) => string;
}

export function ProfileHeader({ 
  profile, 
  onEditProfile, 
  onEditBanner,
  getFullName,
  getInitials 
}: ProfileHeaderProps) {
  return (
    <Card id="header" className="overflow-hidden scroll-mt-24">
      {/* Banner with Upload */}
      <div className="relative group">
        <div className="h-40 bg-gradient-to-br from-primary via-primary/80 to-primary/60 relative">
          {profile.banner_url ? (
            <Image
              src={profile.banner_url}
              alt="Profile banner"
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNC0yIDQtMiA0LTItMi0yLTR6bS0xMiAwYzAtMiAyLTQgMi00czIgMiAyIDQtMiA0LTIgNC0yLTItMi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          )}
        </div>
        {/* Edit Banner Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onEditBanner}
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit Banner
        </Button>
      </div>
      
      {/* Profile Info */}
      <CardContent className="relative pt-0">
        {/* Avatar */}
        <div className="absolute -top-12 left-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={profile.avatar_url || undefined} alt={getFullName(profile)} />
              <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                {getInitials(profile.first_name, profile.last_name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-success rounded-full flex items-center justify-center border-2 border-background">
              <BadgeCheck className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        {/* Name and Title */}
        <div className="pt-16 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{getFullName(profile)}</h1>
                <Badge variant="success" className="h-6">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">{profile.title || "Financial Advisor"}</p>
              {profile.location && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{profile.location}</span>
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="flex items-center gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onEditProfile}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  navigator.clipboard.writeText(window.location.origin + '/advisor/' + profile.id);
                  toast.success('Profile link copied!');
                }}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
              </div>
            </div>
            {/* Rating */}
            {(profile.rating || 0) > 0 && (
              <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full shrink-0">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{profile.rating?.toFixed(1)}</span>
                <span className="text-muted-foreground text-sm">({profile.reviews_count} reviews)</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
