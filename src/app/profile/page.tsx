"use client";

import Link from "next/link";
import { useState } from "react";
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

// Profile data
const profileData = {
  name: "Logan Roy",
  firstName: "Logan",
  lastName: "Roy",
  title: "Senior Family Business Advisor",
  email: "logan.roy@advisor.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  timezone: "Eastern Time (ET)",
  company: "Roy Family Advisors",
  website: "www.royadvisors.com",
  linkedin: "linkedin.com/in/loganroy",
  twitter: "@loganroy",
  bio: "With over 25 years of experience in family business consulting, I specialize in governance structures, succession planning, and conflict resolution. I've helped over 50 multi-generational families navigate complex transitions while preserving their legacy and values.",
  joinedDate: "January 2024",
  completionPercentage: 85,
};

// Credentials
const credentials = [
  { id: 1, name: "Certified Family Business Advisor (CFBA)", status: "verified", year: "2018" },
  { id: 2, name: "Chartered Financial Analyst (CFA)", status: "verified", year: "2010" },
  { id: 3, name: "MBA, Harvard Business School", status: "verified", year: "2005" },
  { id: 4, name: "Family Wealth Alliance Certification", status: "pending", year: "2024" },
];

// Expertise areas
const expertiseAreas = [
  "Family Governance",
  "Succession Planning",
  "Conflict Resolution",
  "Wealth Management",
  "Business Strategy",
  "Family Constitution",
];

// Settings links
const settingsLinks = [
  { label: "Account & Security", href: "/settings", icon: Shield, description: "Password, 2FA, login history" },
  { label: "Notifications", href: "/notifications", icon: Bell, description: "Email, push, and SMS preferences" },
  { label: "Payment Methods", href: "/payments", icon: CreditCard, description: "Cards, bank accounts, billing" },
  { label: "Subscription", href: "/subscription", icon: Award, description: "Plan details and usage" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(profileData);
  const [expertiseList, setExpertiseList] = useState(expertiseAreas);
  const [credentialsList, setCredentialsList] = useState(credentials);
  
  // Form states
  const [editProfileForm, setEditProfileForm] = useState(profileData);
  const [bioForm, setBioForm] = useState("");
  const [newCredential, setNewCredential] = useState({ name: "", issuer: "", year: "", id: "" });
  const [editingCredential, setEditingCredential] = useState<{ id: number; name: string; status: string; year: string } | null>(null);
  const [newExpertise, setNewExpertise] = useState("");

  const handleSaveProfile = () => {
    setProfile(editProfileForm);
  };

  const handleSaveBio = () => {
    setProfile({ ...profile, bio: bioForm });
  };

  const handleAddCredential = () => {
    if (!newCredential.name || !newCredential.year) return;
    const credential = {
      id: credentialsList.length + 1,
      name: newCredential.name,
      status: "pending",
      year: newCredential.year
    };
    setCredentialsList([...credentialsList, credential]);
    setNewCredential({ name: "", issuer: "", year: "", id: "" });
  };

  const handleUpdateCredential = () => {
    if (!editingCredential) return;
    setCredentialsList(credentialsList.map(c => c.id === editingCredential.id ? editingCredential : c));
    setEditingCredential(null);
  };

  const handleDeleteCredential = (id: number) => {
    setCredentialsList(credentialsList.filter(c => c.id !== id));
    setEditingCredential(null);
  };

  const handleAddExpertise = () => {
    if (!newExpertise || expertiseList.includes(newExpertise)) return;
    setExpertiseList([...expertiseList, newExpertise]);
    setNewExpertise("");
  };

  const handleRemoveExpertise = (item: string) => {
    setExpertiseList(expertiseList.filter(i => i !== item));
  };

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
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">LR</AvatarFallback>
                    </Avatar>
                    <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
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
                              value={editProfileForm.firstName} 
                              onChange={(e) => setEditProfileForm({...editProfileForm, firstName: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              value={editProfileForm.lastName} 
                              onChange={(e) => setEditProfileForm({...editProfileForm, lastName: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="title">Professional Title</Label>
                          <Input 
                            id="title" 
                            value={editProfileForm.title} 
                            onChange={(e) => setEditProfileForm({...editProfileForm, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={editProfileForm.email} 
                            onChange={(e) => setEditProfileForm({...editProfileForm, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            value={editProfileForm.phone} 
                            onChange={(e) => setEditProfileForm({...editProfileForm, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            value={editProfileForm.location} 
                            onChange={(e) => setEditProfileForm({...editProfileForm, location: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input 
                            id="company" 
                            value={editProfileForm.company} 
                            onChange={(e) => setEditProfileForm({...editProfileForm, company: e.target.value})}
                          />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input 
                            id="website" 
                            value={editProfileForm.website} 
                            onChange={(e) => setEditProfileForm({...editProfileForm, website: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input 
                            id="linkedin" 
                            value={editProfileForm.linkedin} 
                            onChange={(e) => setEditProfileForm({...editProfileForm, linkedin: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="twitter">Twitter</Label>
                          <Input 
                            id="twitter" 
                            value={editProfileForm.twitter} 
                            onChange={(e) => setEditProfileForm({...editProfileForm, twitter: e.target.value})}
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
                  <span className="text-2xl font-semibold text-primary">{profile.completionPercentage}%</span>
                </div>
                <Progress value={profile.completionPercentage} className="h-2" />
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
                                onClick={() => {
                                  if (!expertiseList.includes(area)) {
                                    setExpertiseList([...expertiseList, area]);
                                  }
                                }}
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
                  <span>Member since {profile.joinedDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
