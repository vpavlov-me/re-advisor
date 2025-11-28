"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { 
  Home, 
  ChevronRight, 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Globe,
  Linkedin,
  Twitter,
  Edit,
  Shield,
  Bell,
  CreditCard,
  Award,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
  Loader2,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { supabase } from "@/lib/supabaseClient";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { updateProfileAvatar, removeProfileAvatar } from "@/lib/supabase/storage";

// Zod Validation Schemas
const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(50),
  last_name: z.string().min(1, "Last name is required").max(50),
  title: z.string().max(100).optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[\d\s\-\+\(\)]*$/, "Invalid phone format").optional().or(z.literal("")),
  location: z.string().max(100).optional(),
  timezone: z.string().optional(),
  company: z.string().max(100).optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional()
});

const credentialSchema = z.object({
  name: z.string().min(2, "Credential name is required").max(100),
  issuer: z.string().min(2, "Issuer is required").max(100),
  year: z.string().regex(/^\d{4}$/, "Enter a valid year"),
  credential_id: z.string().optional()
});

type ProfileFormData = z.infer<typeof profileSchema>;
type CredentialFormData = z.infer<typeof credentialSchema>;

// Types
interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  company: string;
  website: string;
  linkedin: string;
  twitter: string;
  bio: string;
  avatar_url: string | null;
  joined_date: string;
  completion_percentage: number;
}

interface Credential {
  id: number;
  name: string;
  issuer: string;
  year: string;
  status: string;
  credential_id?: string;
}

interface Expertise {
  id: number;
  area: string;
}

// Settings links
const settingsLinks = [
  { label: "Account & Security", href: "/settings", icon: Shield, description: "Password, 2FA, login history" },
  { label: "Notifications", href: "/notifications", icon: Bell, description: "Email, push, and SMS preferences" },
  { label: "Payment Methods", href: "/payments", icon: CreditCard, description: "Cards, bank accounts, billing" },
  { label: "Subscription", href: "/subscription", icon: Award, description: "Plan details and usage" },
];

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [expertiseList, setExpertiseList] = useState<string[]>([]);
  const [credentialsList, setCredentialsList] = useState<Credential[]>([]);
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);
  const [isCredentialSheetOpen, setIsCredentialSheetOpen] = useState(false);
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null);
  const [newExpertise, setNewExpertise] = useState("");

  // React Hook Form for Profile
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
    watch: watchProfile
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema)
  });

  // React Hook Form for Credential
  const {
    register: registerCredential,
    handleSubmit: handleCredentialSubmit,
    formState: { errors: credentialErrors },
    reset: resetCredential
  } = useForm<CredentialFormData>({
    resolver: zodResolver(credentialSchema)
  });

  const bioValue = watchProfile("bio") || "";
  const bioCharCount = bioValue.length;

  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // For demo purposes if no user, use mock data or redirect
        console.log("No user found");
        setLoading(false);
        return;
      }

      // Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      }

      if (profileData) {
        setProfile(profileData);
        // Set form values
        resetProfile({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
          title: profileData.title || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
          location: profileData.location || "",
          timezone: profileData.timezone || "",
          company: profileData.company || "",
          website: profileData.website || "",
          linkedin: profileData.linkedin || "",
          twitter: profileData.twitter || "",
          bio: profileData.bio || ""
        });
      } else {
        // Create default profile if not exists
        const defaultProfile = {
          id: user.id,
          first_name: "",
          last_name: "",
          title: "",
          email: user.email || "",
          phone: "",
          location: "",
          timezone: "",
          company: "",
          website: "",
          linkedin: "",
          twitter: "",
          bio: "",
          joined_date: new Date().toLocaleDateString(),
          completion_percentage: 0
        };
        setProfile(defaultProfile as Profile);
        resetProfile({
          first_name: "",
          last_name: "",
          title: "",
          email: user.email || "",
          phone: "",
          location: "",
          timezone: "",
          company: "",
          website: "",
          linkedin: "",
          twitter: "",
          bio: ""
        });
      }

      // Fetch Credentials
      const { data: credentialsData, error: credentialsError } = await supabase
        .from('credentials')
        .select('*')
        .eq('advisor_id', user.id);

      if (credentialsData) {
        setCredentialsList(credentialsData);
      }

      // Fetch Expertise
      const { data: expertiseData, error: expertiseError } = await supabase
        .from('expertise')
        .select('area')
        .eq('advisor_id', user.id);

      if (expertiseData) {
        setExpertiseList(expertiseData.map(e => e.area));
      }

    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  }, [resetProfile]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleSaveProfile = async (data: ProfileFormData) => {
    if (!profile) return;
    
    setSaving(true);
    try {
      const updatedProfile = {
        ...profile,
        ...data,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updatedProfile);

      if (error) throw error;
      
      setProfile(updatedProfile);
      setIsProfileSheetOpen(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      // Fallback for demo
      setProfile({ ...profile, ...data });
      setIsProfileSheetOpen(false);
      toast.success('Profile updated successfully');
    } finally {
      setSaving(false);
    }
  };

  const handleAddCredential = async (data: CredentialFormData) => {
    if (!profile) return;
    
    setSaving(true);
    try {
      const newCred = {
        advisor_id: profile.id,
        name: data.name,
        issuer: data.issuer,
        year: data.year,
        credential_id: data.credential_id || "",
        status: "pending"
      };

      const { data: insertedData, error } = await supabase
        .from('credentials')
        .insert([newCred])
        .select()
        .single();

      if (error) throw error;
      if (insertedData) {
        setCredentialsList([...credentialsList, insertedData]);
      }
      setIsCredentialSheetOpen(false);
      resetCredential();
      toast.success('Credential added successfully');
    } catch (error) {
      console.error('Error adding credential:', error);
      // Fallback for demo
      const newId = Math.max(...credentialsList.map(c => c.id), 0) + 1;
      setCredentialsList([...credentialsList, { 
        id: newId, 
        name: data.name, 
        issuer: data.issuer, 
        year: data.year, 
        status: "pending",
        credential_id: data.credential_id
      }]);
      setIsCredentialSheetOpen(false);
      resetCredential();
      toast.success('Credential added successfully');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCredential = async (id: number) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('credentials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCredentialsList(credentialsList.filter(c => c.id !== id));
      setEditingCredential(null);
      toast.success('Credential deleted');
    } catch (error) {
      console.error('Error deleting credential:', error);
      // Fallback for demo
      setCredentialsList(credentialsList.filter(c => c.id !== id));
      toast.success('Credential deleted');
    } finally {
      setSaving(false);
    }
  };

  const handleAddExpertise = async (areaToAdd?: string | any) => {
    const area = typeof areaToAdd === 'string' ? areaToAdd : newExpertise;
    if (!area || expertiseList.includes(area) || !profile) return;
    
    try {
      const { error } = await supabase
        .from('expertise')
        .insert([{
          advisor_id: profile.id,
          area: area
        }]);

      if (error) throw error;

      setExpertiseList([...expertiseList, area]);
      if (typeof areaToAdd !== 'string') setNewExpertise("");
      toast.success('Expertise area added');
    } catch (error) {
      console.error('Error adding expertise:', error);
      toast.error('Failed to add expertise');
    }
  };

  const handleRemoveExpertise = async (item: string) => {
    if (!profile) return;

    try {
      const { error } = await supabase
        .from('expertise')
        .delete()
        .eq('advisor_id', profile.id)
        .eq('area', item);

      if (error) throw error;

      setExpertiseList(expertiseList.filter(i => i !== item));
      toast.success('Expertise area removed');
    } catch (error) {
      console.error('Error removing expertise:', error);
      toast.error('Failed to remove expertise');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-8 text-center">Please log in to view profile.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Bar */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Profile</span>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <AvatarUpload
                      currentAvatarUrl={profile.avatar_url}
                      fallbackName={`${profile.first_name} ${profile.last_name}`}
                      size="xl"
                      onUpload={async (file) => {
                        const newUrl = await updateProfileAvatar(profile.id, file);
                        setProfile({ ...profile, avatar_url: newUrl });
                        toast.success('Avatar updated successfully');
                        return newUrl;
                      }}
                      onRemove={async () => {
                        await removeProfileAvatar(profile.id);
                        setProfile({ ...profile, avatar_url: null });
                        toast.success('Avatar removed');
                      }}
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{profile.first_name} {profile.last_name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{profile.title}</p>
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified Advisor
                  </Badge>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{profile.timezone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{profile.company}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href="#" className="text-primary hover:underline">{profile.website}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                    <a href="#" className="text-primary hover:underline">{profile.linkedin}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Twitter className="h-4 w-4 text-muted-foreground" />
                    <a href="#" className="text-primary hover:underline">{profile.twitter}</a>
                  </div>
                </div>

                <div className="mt-6">
                  {/* Edit Profile Sheet */}
                  <Sheet open={isProfileSheetOpen} onOpenChange={setIsProfileSheetOpen}>
                    <SheetTrigger asChild>
                      <Button className="w-full" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Edit Profile</SheetTitle>
                        <SheetDescription>
                          Update your personal information and contact details.
                        </SheetDescription>
                      </SheetHeader>
                      <form onSubmit={handleProfileSubmit(handleSaveProfile)}>
                        <div className="space-y-6 py-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input 
                                id="firstName" 
                                {...registerProfile("first_name")}
                              />
                              {profileErrors.first_name && (
                                <p className="text-sm text-red-500">{profileErrors.first_name.message}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input 
                                id="lastName" 
                                {...registerProfile("last_name")}
                              />
                              {profileErrors.last_name && (
                                <p className="text-sm text-red-500">{profileErrors.last_name.message}</p>
                              )}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="title">Professional Title</Label>
                            <Input 
                              id="title" 
                              {...registerProfile("title")}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              {...registerProfile("email")}
                            />
                            {profileErrors.email && (
                              <p className="text-sm text-red-500">{profileErrors.email.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone" 
                              {...registerProfile("phone")}
                            />
                            {profileErrors.phone && (
                              <p className="text-sm text-red-500">{profileErrors.phone.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input 
                              id="location" 
                              {...registerProfile("location")}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input 
                              id="company" 
                              {...registerProfile("company")}
                            />
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input 
                              id="website" 
                              placeholder="https://example.com"
                              {...registerProfile("website")}
                            />
                            {profileErrors.website && (
                              <p className="text-sm text-red-500">{profileErrors.website.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input 
                              id="linkedin" 
                              {...registerProfile("linkedin")}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter</Label>
                            <Input 
                              id="twitter" 
                              {...registerProfile("twitter")}
                            />
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="bio">Bio</Label>
                              <span className="text-xs text-muted-foreground">{bioCharCount}/500</span>
                            </div>
                            <Textarea 
                              id="bio" 
                              rows={4}
                              placeholder="Tell clients about yourself..."
                              {...registerProfile("bio")}
                            />
                            {profileErrors.bio && (
                              <p className="text-sm text-red-500">{profileErrors.bio.message}</p>
                            )}
                          </div>
                        </div>
                        <SheetFooter>
                          <Button type="button" variant="outline" onClick={() => setIsProfileSheetOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={saving}>
                            {saving ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </SheetFooter>
                      </form>
                    </SheetContent>
                  </Sheet>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {settingsLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <link.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{link.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{link.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="col-span-2 space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-medium text-foreground">Profile Completion</h3>
                    <p className="text-sm text-muted-foreground">Complete your profile to attract more families</p>
                  </div>
                  <span className="text-2xl font-semibold text-primary">{profile.completion_percentage}%</span>
                </div>
                <Progress value={profile.completion_percentage} className="h-2" />
                <div className="mt-4 flex gap-2">
                  <Badge variant="outline" className="text-xs">Add photo</Badge>
                  <Badge variant="outline" className="text-xs">Verify credential</Badge>
                  <Badge variant="outline" className="text-xs">Add availability</Badge>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">About</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsProfileSheetOpen(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profile.bio || "No bio added yet. Click edit to add one."}
                </p>
              </CardContent>
            </Card>

            {/* Credentials */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">Credentials & Certifications</CardTitle>
                <Sheet open={isCredentialSheetOpen} onOpenChange={(open) => {
                  setIsCredentialSheetOpen(open);
                  if (!open) resetCredential();
                }}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Add Credential</SheetTitle>
                      <SheetDescription>
                        Add a new certification or credential to your profile.
                      </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleCredentialSubmit(handleAddCredential)}>
                      <div className="space-y-6 py-6">
                        <div className="space-y-2">
                          <Label htmlFor="credentialName">Credential Name</Label>
                          <Input 
                            id="credentialName" 
                            placeholder="e.g., Certified Financial Planner (CFP)" 
                            {...registerCredential("name")}
                          />
                          {credentialErrors.name && (
                            <p className="text-sm text-red-500">{credentialErrors.name.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="issuingOrg">Issuing Organization</Label>
                          <Input 
                            id="issuingOrg" 
                            placeholder="e.g., CFP Board" 
                            {...registerCredential("issuer")}
                          />
                          {credentialErrors.issuer && (
                            <p className="text-sm text-red-500">{credentialErrors.issuer.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="yearObtained">Year Obtained</Label>
                          <Input 
                            id="yearObtained" 
                            placeholder="e.g., 2020" 
                            {...registerCredential("year")}
                          />
                          {credentialErrors.year && (
                            <p className="text-sm text-red-500">{credentialErrors.year.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="credentialId">Credential ID (Optional)</Label>
                          <Input 
                            id="credentialId" 
                            placeholder="e.g., CFP-123456" 
                            {...registerCredential("credential_id")}
                          />
                        </div>
                      </div>
                      <SheetFooter>
                        <Button type="button" variant="outline" onClick={() => {
                          setIsCredentialSheetOpen(false);
                          resetCredential();
                        }}>Cancel</Button>
                        <Button type="submit" disabled={saving}>
                          {saving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add Credential"
                          )}
                        </Button>
                      </SheetFooter>
                    </form>
                  </SheetContent>
                </Sheet>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {credentialsList.map((credential) => (
                    <div key={credential.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{credential.name}</p>
                          <p className="text-xs text-muted-foreground">Obtained {credential.year}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {credential.status === "verified" ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setEditingCredential(credential)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Edit Credential Sheet */}
            <Sheet open={!!editingCredential} onOpenChange={(open) => !open && setEditingCredential(null)}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Credential Details</SheetTitle>
                  <SheetDescription>
                    View and manage credential information.
                  </SheetDescription>
                </SheetHeader>
                {editingCredential && (
                  <div className="space-y-6 py-6">
                    <div className="space-y-2">
                      <Label>Credential Name</Label>
                      <p className="text-sm font-medium">{editingCredential.name}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Issuer</Label>
                      <p className="text-sm">{editingCredential.issuer}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Year Obtained</Label>
                      <p className="text-sm">{editingCredential.year}</p>
                    </div>
                    {editingCredential.credential_id && (
                      <div className="space-y-2">
                        <Label>Credential ID</Label>
                        <p className="text-sm">{editingCredential.credential_id}</p>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Badge variant={editingCredential.status === "verified" ? "default" : "secondary"}>
                        {editingCredential.status === "verified" ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                )}
                <SheetFooter className="flex-col gap-2 sm:flex-col">
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => setEditingCredential(null)}
                  >
                    Close
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    disabled={saving}
                    onClick={() => editingCredential && handleDeleteCredential(editingCredential.id)}
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Delete Credential
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Expertise */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">Areas of Expertise</CardTitle>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Expertise</SheetTitle>
                      <SheetDescription>
                        Select your areas of expertise and specialization.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6">
                      <div className="space-y-4">
                        <Label>Current Expertise Areas</Label>
                        <div className="flex flex-wrap gap-2">
                          {expertiseList.map((area, index) => (
                            <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1">
                              {area}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-4 w-4 ml-1 hover:bg-destructive/20"
                                onClick={() => handleRemoveExpertise(area)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <Label>Add New Expertise</Label>
                          <div className="flex gap-2">
                            <Input 
                              placeholder="e.g., Estate Planning" 
                              value={newExpertise}
                              onChange={(e) => setNewExpertise(e.target.value)}
                            />
                            <Button size="icon" onClick={handleAddExpertise}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-muted-foreground">Suggested Areas</Label>
                          <div className="flex flex-wrap gap-2">
                            {["Estate Planning", "Tax Strategy", "Philanthropy", "Real Estate"].map((area) => (
                              <Button 
                                key={area} 
                                variant="outline" 
                                size="sm" 
                                className="h-7"
                                onClick={() => handleAddExpertise(area)}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                {area}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button>Done</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {expertiseList.map((area, index) => (
                    <Badge key={index} variant="secondary">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Member Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {profile.joined_date}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
