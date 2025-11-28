"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  Camera,
  Shield,
  Bell,
  CreditCard,
  Award,
  CheckCircle,
  Clock,
  Plus,
  Trash2
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [expertiseList, setExpertiseList] = useState<string[]>([]);
  const [credentialsList, setCredentialsList] = useState<Credential[]>([]);
  
  // Form states
  const [editProfileForm, setEditProfileForm] = useState<Profile | null>(null);
  const [bioForm, setBioForm] = useState("");
  const [newCredential, setNewCredential] = useState({ name: "", issuer: "", year: "", id: "" });
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null);
  const [newExpertise, setNewExpertise] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
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
        setEditProfileForm(profileData);
        setBioForm(profileData.bio || "");
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
        setEditProfileForm(defaultProfile as Profile);
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
  };

  const handleSaveProfile = async () => {
    if (!editProfileForm || !profile) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          ...editProfileForm,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      setProfile(editProfileForm);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleSaveBio = async () => {
    if (!profile) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ bio: bioForm })
        .eq('id', profile.id);

      if (error) throw error;
      
      setProfile({ ...profile, bio: bioForm });
    } catch (error) {
      console.error('Error saving bio:', error);
    }
  };

  const handleAddCredential = async () => {
    if (!newCredential.name || !newCredential.year || !profile) return;
    
    try {
      const newCred = {
        advisor_id: profile.id,
        name: newCredential.name,
        issuer: newCredential.issuer,
        year: newCredential.year,
        credential_id: newCredential.id,
        status: "pending"
      };

      const { data, error } = await supabase
        .from('credentials')
        .insert([newCred])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setCredentialsList([...credentialsList, data]);
        setNewCredential({ name: "", issuer: "", year: "", id: "" });
      }
    } catch (error) {
      console.error('Error adding credential:', error);
    }
  };

  const handleUpdateCredential = async () => {
    if (!editingCredential) return;
    
    try {
      const { error } = await supabase
        .from('credentials')
        .update({
          name: editingCredential.name,
          year: editingCredential.year,
          // Add other fields if editable
        })
        .eq('id', editingCredential.id);

      if (error) throw error;

      setCredentialsList(credentialsList.map(c => c.id === editingCredential.id ? editingCredential : c));
      setEditingCredential(null);
    } catch (error) {
      console.error('Error updating credential:', error);
    }
  };

  const handleDeleteCredential = async (id: number) => {
    try {
      const { error } = await supabase
        .from('credentials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCredentialsList(credentialsList.filter(c => c.id !== id));
      setEditingCredential(null);
    } catch (error) {
      console.error('Error deleting credential:', error);
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
    } catch (error) {
      console.error('Error adding expertise:', error);
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
    } catch (error) {
      console.error('Error removing expertise:', error);
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
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {profile.first_name?.[0]}{profile.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                      <Camera className="h-4 w-4" />
                    </Button>
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
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button className="w-full" variant="outline" onClick={() => setEditProfileForm(profile)}>
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
                      <div className="space-y-6 py-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              value={editProfileForm?.first_name || ""} 
                              onChange={(e) => setEditProfileForm(prev => prev ? {...prev, first_name: e.target.value} : null)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              value={editProfileForm?.last_name || ""} 
                              onChange={(e) => setEditProfileForm(prev => prev ? {...prev, last_name: e.target.value} : null)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Professional Title</Label>
                          <Input 
                            id="title" 
                            value={editProfileForm?.title || ""} 
                            onChange={(e) => setEditProfileForm(prev => prev ? {...prev, title: e.target.value} : null)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={editProfileForm?.email || ""} 
                            onChange={(e) => setEditProfileForm(prev => prev ? {...prev, email: e.target.value} : null)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            value={editProfileForm?.phone || ""} 
                            onChange={(e) => setEditProfileForm(prev => prev ? {...prev, phone: e.target.value} : null)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            value={editProfileForm?.location || ""} 
                            onChange={(e) => setEditProfileForm(prev => prev ? {...prev, location: e.target.value} : null)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input 
                            id="company" 
                            value={editProfileForm?.company || ""} 
                            onChange={(e) => setEditProfileForm(prev => prev ? {...prev, company: e.target.value} : null)}
                          />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input 
                            id="website" 
                            value={editProfileForm?.website || ""} 
                            onChange={(e) => setEditProfileForm(prev => prev ? {...prev, website: e.target.value} : null)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input 
                            id="linkedin" 
                            value={editProfileForm?.linkedin || ""} 
                            onChange={(e) => setEditProfileForm(prev => prev ? {...prev, linkedin: e.target.value} : null)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="twitter">Twitter</Label>
                          <Input 
                            id="twitter" 
                            value={editProfileForm?.twitter || ""} 
                            onChange={(e) => setEditProfileForm(prev => prev ? {...prev, twitter: e.target.value} : null)}
                          />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button onClick={handleSaveProfile}>Save Changes</Button>
                        </SheetClose>
                      </SheetFooter>
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
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => setBioForm(profile.bio)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit About</SheetTitle>
                      <SheetDescription>
                        Tell families about your experience and expertise.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6">
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biography</Label>
                        <Textarea 
                          id="bio" 
                          value={bioForm}
                          onChange={(e) => setBioForm(e.target.value)}
                          className="min-h-[200px]"
                        />
                        <p className="text-xs text-muted-foreground">
                          Describe your background, experience, and what makes you unique.
                        </p>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button onClick={handleSaveBio}>Save Changes</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              </CardContent>
            </Card>

            {/* Credentials */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">Credentials & Certifications</CardTitle>
                <Sheet>
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
                    <div className="space-y-6 py-6">
                      <div className="space-y-2">
                        <Label htmlFor="credentialName">Credential Name</Label>
                        <Input 
                          id="credentialName" 
                          placeholder="e.g., Certified Financial Planner (CFP)" 
                          value={newCredential.name}
                          onChange={(e) => setNewCredential({...newCredential, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="issuingOrg">Issuing Organization</Label>
                        <Input 
                          id="issuingOrg" 
                          placeholder="e.g., CFP Board" 
                          value={newCredential.issuer}
                          onChange={(e) => setNewCredential({...newCredential, issuer: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yearObtained">Year Obtained</Label>
                        <Input 
                          id="yearObtained" 
                          placeholder="e.g., 2020" 
                          value={newCredential.year}
                          onChange={(e) => setNewCredential({...newCredential, year: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="credentialId">Credential ID (Optional)</Label>
                        <Input 
                          id="credentialId" 
                          placeholder="e.g., CFP-123456" 
                          value={newCredential.id}
                          onChange={(e) => setNewCredential({...newCredential, id: e.target.value})}
                        />
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button onClick={handleAddCredential}>Add Credential</Button>
                      </SheetClose>
                    </SheetFooter>
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
                  <SheetTitle>Edit Credential</SheetTitle>
                  <SheetDescription>
                    Update credential information.
                  </SheetDescription>
                </SheetHeader>
                {editingCredential && (
                  <div className="space-y-6 py-6">
                    <div className="space-y-2">
                      <Label>Credential Name</Label>
                      <Input 
                        value={editingCredential.name} 
                        onChange={(e) => setEditingCredential({...editingCredential, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Year Obtained</Label>
                      <Input 
                        value={editingCredential.year} 
                        onChange={(e) => setEditingCredential({...editingCredential, year: e.target.value})}
                      />
                    </div>
                  </div>
                )}
                <SheetFooter className="flex-col gap-2 sm:flex-col">
                  <Button className="w-full" onClick={handleUpdateCredential}>Save Changes</Button>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => editingCredential && handleDeleteCredential(editingCredential.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
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
