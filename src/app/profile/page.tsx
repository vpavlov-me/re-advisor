"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// Profile Components
import { ProfileHeader } from "./components/profile-header";
import { ProfileVideo } from "./components/profile-video";
import { ProfileAbout } from "./components/profile-about";
import { ProfileServices } from "./components/profile-services";
import { ProfileExperience } from "./components/profile-experience";
import { ProfileEducation } from "./components/profile-education";
import { ProfileSkills } from "./components/profile-skills";
import { ProfileCredentials } from "./components/profile-credentials";
import { ProfileRecommendations } from "./components/profile-recommendations";
import { ProfileContact } from "./components/profile-contact";
import { ProfileSidebar } from "./components/profile-sidebar";
import { ServicePreviewDialog } from "./components/service-preview-dialog";
import { RecommendationDialog } from "./components/recommendation-dialog";
import { getFullName as getFullNameUtil, getInitials as getInitialsUtil } from "./utils";
import { settingsLinks as settingsLinksConstant } from "./constants";
import { 
  Home, 
  ChevronRight, 
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
  Briefcase,
  ArrowRight,
  Star,
  Play,
  GraduationCap,
  BadgeCheck,
  ExternalLink,
  Settings,
  FileText,
  Share2,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { BannerUpload } from "@/components/ui/banner-upload";
import { 
  updateProfileAvatar, 
  removeProfileAvatar,
  updateProfileBanner,
  removeProfileBanner 
} from "@/lib/supabase/storage";
import { ProfileCompletionCard } from "@/components/profile/profile-completion-card";
import { useRouter } from "next/navigation";
import {
  getProfile,
  upsertProfile,
  getCredentials,
  addCredential,
  deleteCredential,
  getExpertise,
  addExpertise,
  deleteExpertise,
  getExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
  getSkills,
  addSkill,
  deleteSkill,
  getRecommendations,
  addRecommendation,
  updateRecommendation,
  deleteRecommendation,
  type UpdateProfileInput,
  type Experience as ExperienceType,
  type Education as EducationType,
  type Skill,
} from "@/lib/supabase/profile";
import { getServices } from "@/lib/services";

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
  bio: z.string().max(2000, "Bio must be less than 2000 characters").optional(),
  video_url: z.string().url("Invalid URL").optional().or(z.literal(""))
});

const credentialSchema = z.object({
  name: z.string().min(2, "Credential name is required").max(100),
  issuer: z.string().min(2, "Issuer is required").max(100),
  year: z.string().regex(/^\d{4}$/, "Enter a valid year"),
  credential_id: z.string().optional()
});

const experienceSchema = z.object({
  role: z.string().min(2, "Role is required").max(100),
  company: z.string().min(2, "Company is required").max(100),
  start_date: z.string().optional().or(z.literal("")),
  end_date: z.string().optional().or(z.literal("")),
  is_current: z.boolean().optional(),
  description: z.string().max(500).optional().or(z.literal("")),
  location: z.string().max(100).optional().or(z.literal(""))
});

const educationSchema = z.object({
  degree: z.string().min(2, "Degree is required").max(100),
  institution: z.string().min(2, "Institution is required").max(100),
  field_of_study: z.string().max(100).optional().or(z.literal("")),
  start_year: z.string().optional().or(z.literal("")),
  end_year: z.string().optional().or(z.literal("")),
  grade: z.string().max(50).optional().or(z.literal("")),
  description: z.string().max(500).optional().or(z.literal(""))
});

const recommendationSchema = z.object({
  author_name: z.string().min(2, "Name is required").max(100),
  author_title: z.string().max(100).optional(),
  author_company: z.string().max(100).optional(),
  relationship: z.string().max(100).optional(),
  rating: z.number().min(1).max(5).optional(),
  text: z.string().min(10, "Recommendation text must be at least 10 characters").max(1000),
  is_featured: z.boolean().optional(),
  is_visible: z.boolean().optional()
});

type ProfileFormData = z.infer<typeof profileSchema>;
type CredentialFormData = z.infer<typeof credentialSchema>;
type ExperienceFormData = z.infer<typeof experienceSchema>;
type EducationFormData = z.infer<typeof educationSchema>;
type RecommendationFormData = z.infer<typeof recommendationSchema>;

// Types
interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  timezone: string | null;
  company: string | null;
  website: string | null;
  linkedin: string | null;
  twitter: string | null;
  bio: string | null;
  avatar_url: string | null;
  banner_url?: string | null;
  video_url?: string | null;
  joined_date: string;
  completion_percentage: number;
  rating?: number;
  reviews_count?: number;
  updated_at?: string;
}

interface Credential {
  id: number;
  name: string;
  issuer: string;
  year: string;
  status: string;
  credential_id?: string;
}

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description?: string;
  location?: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  year?: string;
  field?: string;
  grade?: string;
  description?: string;
}

interface Service {
  id: string;
  name: string;
  description?: string;
  duration?: string;
  price: string;
  status: string;
}

interface Recommendation {
  id: number;
  author: string;
  title?: string;
  company?: string;
  relationship?: string;
  rating: number;
  text: string;
  featured?: boolean;
}

// Quick Actions
const quickActions = [
  { label: "Edit Profile", href: "#", icon: Edit, action: "edit" },
  { label: "View Public Profile", href: "/advisor/preview", icon: ExternalLink },
  { label: "Share Profile", href: "#", icon: Share2, action: "share" },
];

// Settings links
const settingsLinks = [
  { label: "Account & Security", href: "/settings", icon: Shield },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Payment Methods", href: "/payments", icon: CreditCard },
  { label: "Subscription", href: "/subscription", icon: Award },
];

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [expertiseList, setExpertiseList] = useState<string[]>([]);
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [credentialsList, setCredentialsList] = useState<Credential[]>([]);
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [recommendationsList, setRecommendationsList] = useState<Recommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);
  const [isBannerSheetOpen, setIsBannerSheetOpen] = useState(false);
  const [isCredentialSheetOpen, setIsCredentialSheetOpen] = useState(false);
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null);
  const [isExperienceSheetOpen, setIsExperienceSheetOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isEducationSheetOpen, setIsEducationSheetOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [isRecommendationSheetOpen, setIsRecommendationSheetOpen] = useState(false);
  const [editingRecommendation, setEditingRecommendation] = useState<Recommendation | null>(null);
  const [newExpertise, setNewExpertise] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [hideProfileCompletionCard, setHideProfileCompletionCard] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hideProfileCompletionCard') === 'true';
    }
    return false;
  });

  const handleHideProfileCompletionCard = () => {
    setHideProfileCompletionCard(true);
    localStorage.setItem('hideProfileCompletionCard', 'true');
  };

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

  // React Hook Form for Experience
  const {
    register: registerExperience,
    handleSubmit: handleExperienceSubmit,
    formState: { errors: experienceErrors },
    reset: resetExperience,
    watch: watchExperience
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      is_current: false
    }
  });

  // React Hook Form for Education
  const {
    register: registerEducation,
    handleSubmit: handleEducationSubmit,
    formState: { errors: educationErrors },
    reset: resetEducation,
    watch: watchEducation
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema)
  });

  // React Hook Form for Recommendation
  const {
    register: registerRecommendation,
    handleSubmit: handleRecommendationSubmit,
    formState: { errors: recommendationErrors },
    reset: resetRecommendation,
    watch: watchRecommendation
  } = useForm<RecommendationFormData>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      rating: 5,
      is_featured: false,
      is_visible: true
    }
  });

  const bioValue = watchProfile("bio") || "";
  const bioCharCount = bioValue.length;

  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch Profile using abstraction layer
      const profileData = await getProfile();

      if (profileData) {
        setProfile(profileData as Profile);
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
          bio: profileData.bio || "",
          video_url: profileData.video_url || ""
        });
      }

      // Fetch Credentials
      try {
        const credentialsData = await getCredentials();
        if (credentialsData) {
          setCredentialsList(credentialsData as Credential[]);
        }
      } catch (e) {
        console.log("No credentials found");
      }

      // Fetch Expertise
      try {
        const expertiseData = await getExpertise();
        if (expertiseData) {
          setExpertiseList(expertiseData.map(e => e.area));
        }
      } catch (e) {
        console.log("No expertise found");
      }

      // Fetch Services
      try {
        const { data: servicesData } = await getServices();
        if (servicesData) {
          setServicesList(servicesData.slice(0, 5).map(s => ({
            id: String(s.id),
            name: s.name,
            price: s.rate ? `$${s.rate}` : "$0",
            status: s.status || "Active"
          })));
        }
      } catch (e) {
        console.log("No services found");
      }

      // Fetch Experience
      try {
        const experienceData = await getExperience();
        if (experienceData) {
          // Format data for display
          setExperienceList(experienceData.map(exp => ({
            id: exp.id,
            role: exp.role,
            company: exp.company,
            period: formatPeriod(exp.start_date, exp.end_date, exp.is_current),
            description: exp.description
          })));
        }
      } catch (e) {
        console.log("No experience found");
      }

      // Fetch Education
      try {
        const educationData = await getEducation();
        if (educationData) {
          setEducationList(educationData.map(edu => ({
            id: edu.id,
            degree: edu.degree,
            institution: edu.institution,
            year: edu.end_year || ''
          })));
        }
      } catch (e) {
        console.log("No education found");
      }

      // Fetch Skills
      try {
        const skillsData = await getSkills();
        if (skillsData) {
          setSkillsList(skillsData.map(skill => skill.name));
        }
      } catch (e) {
        console.log("No skills found");
      }

      // Fetch Recommendations
      try {
        const recommendationsData = await getRecommendations();
        if (recommendationsData) {
          setRecommendationsList(recommendationsData.map(rec => ({
            id: rec.id,
            author: rec.author_name,
            title: rec.author_title || undefined,
            company: rec.author_company || undefined,
            relationship: rec.relationship || undefined,
            rating: rec.rating || 5,
            text: rec.text,
            featured: rec.is_featured || false
          })));
        }
      } catch (e) {
        console.log("No recommendations found");
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
      const profileInput: UpdateProfileInput = {
        first_name: data.first_name,
        last_name: data.last_name,
        title: data.title,
        email: data.email,
        phone: data.phone,
        location: data.location,
        timezone: data.timezone,
        company: data.company,
        website: data.website,
        linkedin: data.linkedin,
        twitter: data.twitter,
        bio: data.bio,
        video_url: data.video_url || null
      };

      const updatedData = await upsertProfile(profileInput);
      
      if (updatedData) {
        setProfile({ ...profile, ...updatedData });
      }
      setIsProfileSheetOpen(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAddCredential = async (data: CredentialFormData) => {
    if (!profile) return;
    
    setSaving(true);
    try {
      const insertedData = await addCredential({
        name: data.name,
        issuer: data.issuer,
        year: data.year,
        credential_id: data.credential_id
      });

      if (insertedData) {
        setCredentialsList([...credentialsList, insertedData as Credential]);
      }
      setIsCredentialSheetOpen(false);
      resetCredential();
      toast.success('Credential added successfully');
    } catch (error) {
      console.error('Error adding credential:', error);
      toast.error('Failed to add credential');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCredential = async (id: number) => {
    setSaving(true);
    try {
      await deleteCredential(id);
      setCredentialsList(credentialsList.filter(c => c.id !== id));
      setEditingCredential(null);
      toast.success('Credential deleted');
    } catch (error) {
      console.error('Error deleting credential:', error);
      toast.error('Failed to delete credential');
    } finally {
      setSaving(false);
    }
  };

  const handleAddExpertise = async (areaToAdd?: string | any) => {
    const area = typeof areaToAdd === 'string' ? areaToAdd : newExpertise;
    if (!area || expertiseList.includes(area) || !profile) return;
    
    try {
      await addExpertise(area);
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
      // Find the expertise item by area name and get its ID
      const expertiseData = await getExpertise();
      const itemToDelete = expertiseData?.find(e => e.area === item);
      if (itemToDelete) {
        await deleteExpertise(itemToDelete.id);
      }
      setExpertiseList(expertiseList.filter(i => i !== item));
      toast.success('Expertise area removed');
    } catch (error) {
      console.error('Error removing expertise:', error);
      toast.error('Failed to remove expertise');
    }
  };

  const handleSaveExperience = async (data: ExperienceFormData) => {
    if (!profile) return;
    
    setSaving(true);
    try {
      if (editingExperience) {
        // Update existing experience
        const updatedData = await updateExperience(editingExperience.id, {
          role: data.role,
          company: data.company,
          start_date: data.start_date || undefined,
          end_date: (data.is_current ?? false) ? undefined : (data.end_date || undefined),
          is_current: data.is_current ?? false,
          description: data.description || undefined,
          location: data.location || undefined
        });

        if (updatedData) {
          setExperienceList(experienceList.map(exp => 
            exp.id === editingExperience.id 
              ? {
                  ...exp,
                  role: updatedData.role,
                  company: updatedData.company,
                  period: formatPeriod(updatedData.start_date, updatedData.end_date, updatedData.is_current),
                  description: updatedData.description || undefined,
                  location: updatedData.location || undefined
                }
              : exp
          ));
          toast.success('Experience updated successfully');
        }
      } else {
        // Add new experience
        const insertedData = await addExperience({
          role: data.role,
          company: data.company,
          start_date: data.start_date || undefined,
          end_date: (data.is_current ?? false) ? undefined : (data.end_date || undefined),
          is_current: data.is_current ?? false,
          description: data.description || undefined,
          location: data.location || undefined
        });

        if (insertedData) {
          setExperienceList([
            ...experienceList,
            {
              id: insertedData.id,
              role: insertedData.role,
              company: insertedData.company,
              period: formatPeriod(insertedData.start_date, insertedData.end_date, insertedData.is_current),
              description: insertedData.description || undefined,
              location: insertedData.location || undefined
            }
          ]);
          toast.success('Experience added successfully');
        }
      }
      
      setIsExperienceSheetOpen(false);
      setEditingExperience(null);
      resetExperience();
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteExperience = async (id: number) => {
    setSaving(true);
    try {
      await deleteExperience(id);
      setExperienceList(experienceList.filter(exp => exp.id !== id));
      setIsExperienceSheetOpen(false);
      setEditingExperience(null);
      toast.success('Experience deleted');
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast.error('Failed to delete experience');
    } finally {
      setSaving(false);
    }
  };

  const handleEditExperience = (exp: Experience) => {
    setEditingExperience(exp);
    // Parse period back to dates if needed (for now just set empty)
    resetExperience({
      role: exp.role,
      company: exp.company,
      start_date: "",
      end_date: "",
      is_current: false,
      description: exp.description || "",
      location: exp.location || ""
    });
    setIsExperienceSheetOpen(true);
  };

  const handleAddExperienceClick = () => {
    setEditingExperience(null);
    resetExperience({
      role: "",
      company: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
      location: ""
    });
    setIsExperienceSheetOpen(true);
  };

  const handleSaveEducation = async (data: EducationFormData) => {
    if (!profile) return;
    
    setSaving(true);
    try {
      if (editingEducation) {
        // Update existing education
        const updatedData = await updateEducation(editingEducation.id, {
          degree: data.degree,
          institution: data.institution,
          field_of_study: data.field_of_study || undefined,
          start_year: data.start_year || undefined,
          end_year: data.end_year || undefined,
          grade: data.grade || undefined,
          description: data.description || undefined
        });

        if (updatedData) {
          setEducationList(educationList.map(edu => 
            edu.id === editingEducation.id 
              ? {
                  ...edu,
                  degree: updatedData.degree,
                  institution: updatedData.institution,
                  field: updatedData.field_of_study || undefined,
                  year: updatedData.start_year && updatedData.end_year 
                    ? `${updatedData.start_year} - ${updatedData.end_year}`
                    : updatedData.start_year || updatedData.end_year || "",
                  grade: updatedData.grade || undefined,
                  description: updatedData.description || undefined
                }
              : edu
          ));
          toast.success('Education updated successfully');
        }
      } else {
        // Add new education
        const insertedData = await addEducation({
          degree: data.degree,
          institution: data.institution,
          field_of_study: data.field_of_study || undefined,
          start_year: data.start_year || undefined,
          end_year: data.end_year || undefined,
          grade: data.grade || undefined,
          description: data.description || undefined
        });

        if (insertedData) {
          setEducationList([
            ...educationList,
            {
              id: insertedData.id,
              degree: insertedData.degree,
              institution: insertedData.institution,
              field: insertedData.field_of_study || undefined,
              year: insertedData.start_year && insertedData.end_year 
                ? `${insertedData.start_year} - ${insertedData.end_year}`
                : insertedData.start_year || insertedData.end_year || "",
              grade: insertedData.grade || undefined,
              description: insertedData.description || undefined
            }
          ]);
          toast.success('Education added successfully');
        }
      }
      
      setIsEducationSheetOpen(false);
      setEditingEducation(null);
      resetEducation();
    } catch (error) {
      console.error('Error saving education:', error);
      toast.error('Failed to save education');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEducation = async (id: number) => {
    setSaving(true);
    try {
      await deleteEducation(id);
      setEducationList(educationList.filter(edu => edu.id !== id));
      setIsEducationSheetOpen(false);
      setEditingEducation(null);
      toast.success('Education deleted');
    } catch (error) {
      console.error('Error deleting education:', error);
      toast.error('Failed to delete education');
    } finally {
      setSaving(false);
    }
  };

  const handleEditEducation = (edu: Education) => {
    setEditingEducation(edu);
    // Parse year range
    const years = (edu.year || '').split(' - ');
    resetEducation({
      degree: edu.degree,
      institution: edu.institution,
      field_of_study: edu.field || "",
      start_year: years[0] || "",
      end_year: years[1] || "",
      grade: edu.grade || "",
      description: edu.description || ""
    });
    setIsEducationSheetOpen(true);
  };

  const handleAddEducationClick = () => {
    setEditingEducation(null);
    resetEducation({
      degree: "",
      institution: "",
      field_of_study: "",
      start_year: "",
      end_year: "",
      grade: "",
      description: ""
    });
    setIsEducationSheetOpen(true);
  };

  const handleAddSkill = async (skillToAdd?: string | any) => {
    const skillName = typeof skillToAdd === 'string' ? skillToAdd : newSkill;
    if (!skillName || skillsList.includes(skillName) || !profile) return;
    
    try {
      await addSkill(skillName);
      setSkillsList([...skillsList, skillName]);
      if (typeof skillToAdd !== 'string') setNewSkill("");
      toast.success('Skill added');
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error('Failed to add skill');
    }
  };

  const handleRemoveSkill = async (skillName: string) => {
    if (!profile) return;

    try {
      // Find the skill item by name and get its ID
      const skillsData = await getSkills();
      const itemToDelete = skillsData?.find(s => s.name === skillName);
      if (itemToDelete) {
        await deleteSkill(itemToDelete.id);
      }
      setSkillsList(skillsList.filter(s => s !== skillName));
      toast.success('Skill removed');
    } catch (error) {
      console.error('Error removing skill:', error);
      toast.error('Failed to remove skill');
    }
  };

  const handleSaveRecommendation = async (data: RecommendationFormData) => {
    if (!profile) return;
    
    setSaving(true);
    try {
      if (editingRecommendation) {
        // Update existing recommendation
        const updatedData = await updateRecommendation(editingRecommendation.id, {
          author_name: data.author_name,
          author_title: data.author_title || undefined,
          author_company: data.author_company || undefined,
          relationship: data.relationship || undefined,
          rating: data.rating ?? 5,
          text: data.text,
          is_featured: data.is_featured ?? false,
          is_visible: data.is_visible ?? true
        });

        if (updatedData) {
          setRecommendationsList(recommendationsList.map(rec => 
            rec.id === editingRecommendation.id 
              ? {
                  ...rec,
                  author: updatedData.author_name,
                  title: updatedData.author_title || undefined,
                  company: updatedData.author_company || undefined,
                  relationship: updatedData.relationship || undefined,
                  rating: updatedData.rating,
                  text: updatedData.text,
                  featured: updatedData.is_featured
                }
              : rec
          ));
          toast.success('Recommendation updated successfully');
        }
      } else {
        // Add new recommendation
        const insertedData = await addRecommendation({
          author_name: data.author_name,
          author_title: data.author_title || undefined,
          author_company: data.author_company || undefined,
          relationship: data.relationship || undefined,
          rating: data.rating ?? 5,
          text: data.text,
          is_featured: data.is_featured ?? false,
          is_visible: data.is_visible ?? true
        });

        if (insertedData) {
          setRecommendationsList([
            ...recommendationsList,
            {
              id: insertedData.id,
              author: insertedData.author_name,
              title: insertedData.author_title || undefined,
              company: insertedData.author_company || undefined,
              relationship: insertedData.relationship || undefined,
              rating: insertedData.rating,
              text: insertedData.text,
              featured: insertedData.is_featured
            }
          ]);
          toast.success('Recommendation added successfully');
        }
      }
      
      setIsRecommendationSheetOpen(false);
      setEditingRecommendation(null);
      resetRecommendation();
    } catch (error) {
      console.error('Error saving recommendation:', error);
      toast.error('Failed to save recommendation');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRecommendation = async (id: number) => {
    setSaving(true);
    try {
      await deleteRecommendation(id);
      setRecommendationsList(recommendationsList.filter(rec => rec.id !== id));
      setIsRecommendationSheetOpen(false);
      setEditingRecommendation(null);
      toast.success('Recommendation deleted');
    } catch (error) {
      console.error('Error deleting recommendation:', error);
      toast.error('Failed to delete recommendation');
    } finally {
      setSaving(false);
    }
  };

  const handleEditRecommendation = (rec: Recommendation) => {
    setEditingRecommendation(rec);
    resetRecommendation({
      author_name: rec.author,
      author_title: rec.title || "",
      author_company: rec.company || "",
      relationship: rec.relationship || "",
      rating: rec.rating,
      text: rec.text,
      is_featured: rec.featured || false,
      is_visible: true
    });
    setIsRecommendationSheetOpen(true);
  };

  const handleAddRecommendationClick = () => {
    setEditingRecommendation(null);
    resetRecommendation({
      author_name: "",
      author_title: "",
      author_company: "",
      relationship: "",
      rating: 5,
      text: "",
      is_featured: false,
      is_visible: true
    });
    setIsRecommendationSheetOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-page-background">
        {/* Breadcrumb Bar Skeleton */}
        <div className="bg-card border-b border-border">
          <div className="container py-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Left Column Skeleton */}
            <div className="space-y-6">
              {/* Profile Header Skeleton */}
              <Card className="overflow-hidden">
                <div className="h-40 bg-muted" />
                <CardContent className="relative pt-0">
                  <div className="absolute -top-12 left-6">
                    <Skeleton className="h-24 w-24 rounded-full border-4 border-background" />
                  </div>
                  <div className="pt-16 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Skeleton className="h-8 w-48" />
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-5 w-64 mb-2" />
                        <Skeleton className="h-4 w-32 mb-4" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-9 w-28" />
                          <Skeleton className="h-9 w-32" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Skeleton */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>

              {/* Video Skeleton */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-full aspect-video rounded-lg" />
                </CardContent>
              </Card>

              {/* Services Skeleton */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-56" />
                  </div>
                  <Skeleton className="h-8 w-24" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specialization Skeleton */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-8 w-24 rounded-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience Skeleton */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education Skeleton */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-56" />
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar Skeleton */}
            <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
              {/* Page Navigation Skeleton */}
              <Card>
                <CardHeader className="pb-3">
                  <Skeleton className="h-5 w-24" />
                </CardHeader>
                <CardContent className="space-y-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Skeleton key={i} className="h-8 w-full rounded-md" />
                  ))}
                </CardContent>
              </Card>

              {/* Profile Completion Skeleton */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Settings Skeleton */}
              <Card>
                <CardHeader className="pb-3">
                  <Skeleton className="h-5 w-20" />
                </CardHeader>
                <CardContent className="space-y-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-4 ml-auto" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Member Since Skeleton */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <div className="p-8 text-center">Please log in to view profile.</div>;
  }

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase() || 'U';
  };

  const getFullName = (profile: Profile | null) => {
    if (!profile) return 'User';
    const firstName = profile.first_name || '';
    const lastName = profile.last_name || '';
    return `${firstName} ${lastName}`.trim() || 'User';
  };

  const formatPeriod = (startDate?: string, endDate?: string, isCurrent?: boolean) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const startYear = start.getFullYear();
    
    if (isCurrent || !endDate) {
      return `${startYear} - Present`;
    }
    
    const end = new Date(endDate);
    const endYear = end.getFullYear();
    
    return `${startYear} - ${endYear}`;
  };

  return (
    <div className="min-h-screen bg-page-background">
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

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Header with Avatar */}
            <ProfileHeader
              profile={profile}
              onEditProfile={() => setIsProfileSheetOpen(true)}
              onEditBanner={() => setIsBannerSheetOpen(true)}
              getFullName={getFullName}
              getInitials={getInitials}
            />

            {/* About */}
            <ProfileAbout
              bio={profile.bio}
              onEdit={() => setIsProfileSheetOpen(true)}
            />

            {/* Video */}
            <ProfileVideo
              videoUrl={profile.video_url}
              onEdit={() => setIsProfileSheetOpen(true)}
            />

            {/* Services */}
            <ProfileServices
              services={servicesList}
              onServiceClick={setSelectedService}
            />

            {/* Specialization */}
            <Card id="specialization" className="scroll-mt-24">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">Specialization</CardTitle>
                  <p className="text-sm text-muted-foreground">Areas of expertise and focus</p>
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Specialization</SheetTitle>
                      <SheetDescription>
                        Select your areas of expertise and specialization.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6">
                      <div className="space-y-4">
                        <Label>Current Expertise Areas</Label>
                        <div className="flex flex-wrap gap-2">
                          {expertiseList.map((area, index) => (
                            <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1.5">
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
                            {["Estate Planning", "Tax Strategy", "Philanthropy", "Real Estate", "Retirement Planning", "Investment Management"].map((area) => (
                              <Button 
                                key={area} 
                                variant="outline" 
                                size="sm" 
                                className="h-7"
                                onClick={() => handleAddExpertise(area)}
                                disabled={expertiseList.includes(area)}
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
                {expertiseList.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {expertiseList.map((area, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1.5">
                        {area}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No specializations added yet</p>
                )}
              </CardContent>
            </Card>

            {/* Experience */}
            <ProfileExperience
              experience={experienceList}
              onAdd={handleAddExperienceClick}
              onEdit={handleEditExperience}
            />
            <ProfileEducation
              education={educationList}
              onAdd={handleAddEducationClick}
              onEdit={handleEditEducation}
            />
            <ProfileSkills
              skills={skillsList}
              newSkill={newSkill}
              onNewSkillChange={setNewSkill}
              onAddSkill={handleAddSkill}
              onRemoveSkill={handleRemoveSkill}
            />
            <ProfileCredentials
              credentials={credentialsList}
              onAdd={() => setIsCredentialSheetOpen(true)}
            />
            <ProfileRecommendations
              recommendations={recommendationsList}
              onAdd={handleAddRecommendationClick}
              onEdit={handleEditRecommendation}
              onClick={setSelectedRecommendation}
            />
            <ProfileContact
              contact={profile}
              onEdit={() => setIsProfileSheetOpen(true)}
            />
          </div>
          {/* Right Column - Sidebar */}
          <ProfileSidebar
            profile={profile}
            hideProfileCompletionCard={hideProfileCompletionCard}
            settingsLinks={settingsLinks}
            onEditProfile={() => setIsProfileSheetOpen(true)}
            onHideProfileCompletionCard={handleHideProfileCompletionCard}
          />
        </div>
      </div>

      {/* Dialogs */}
      <ServicePreviewDialog 
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
      <RecommendationDialog
        recommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
      />
      <Sheet open={isProfileSheetOpen} onOpenChange={setIsProfileSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Update your personal information and contact details.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleProfileSubmit(handleSaveProfile)}>
            <div className="space-y-6 py-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <AvatarUpload
                  currentAvatarUrl={profile.avatar_url}
                  fallbackName={getFullName(profile)}
                  size="lg"
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
              
              <Separator />
              
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
                  placeholder="e.g., Senior Financial Advisor"
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
                  placeholder="+1 (555) 000-0000"
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
                  placeholder="e.g., New York, NY"
                  {...registerProfile("location")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  placeholder="e.g., Wealth Management Inc."
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
                  placeholder="https://linkedin.com/in/username"
                  {...registerProfile("linkedin")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input 
                  id="twitter" 
                  placeholder="@username"
                  {...registerProfile("twitter")}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="video_url">Intro Video URL</Label>
                <Input 
                  id="video_url" 
                  placeholder="https://youtube.com/watch?v=..."
                  {...registerProfile("video_url")}
                />
                <p className="text-xs text-muted-foreground">Link to your introduction video (YouTube, Vimeo, etc.)</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="bio">Bio</Label>
                  <span className="text-xs text-muted-foreground">{bioCharCount}/2000</span>
                </div>
                <Textarea 
                  id="bio" 
                  rows={6}
                  placeholder="Tell clients about yourself, your experience, and what makes you unique..."
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
                <Badge variant={editingCredential.status === "verified" ? "success" : "secondary"}>
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

      {/* Edit Banner Sheet */}
      <Sheet open={isBannerSheetOpen} onOpenChange={setIsBannerSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Profile Banner</SheetTitle>
            <SheetDescription>
              Upload a banner image for your profile. Recommended size: 1200x300px
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <BannerUpload
              currentBannerUrl={profile.banner_url}
              onUpload={async (file) => {
                const newUrl = await updateProfileBanner(profile.id, file);
                setProfile({ ...profile, banner_url: newUrl });
                toast.success('Banner updated successfully');
                setIsBannerSheetOpen(false);
                return newUrl;
              }}
              onRemove={async () => {
                await removeProfileBanner(profile.id);
                setProfile({ ...profile, banner_url: null });
                toast.success('Banner removed');
                setIsBannerSheetOpen(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Add/Edit Experience Sheet */}
      <Sheet open={isExperienceSheetOpen} onOpenChange={setIsExperienceSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingExperience ? 'Edit' : 'Add'} Experience</SheetTitle>
            <SheetDescription>
              {editingExperience ? 'Update your work experience' : 'Add a new position to your work history'}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleExperienceSubmit(handleSaveExperience)}>
            <div className="space-y-4 py-6">
              <div className="space-y-2">
                <Label htmlFor="role">Role/Position *</Label>
                <Input
                  id="role"
                  placeholder="e.g., Senior Financial Advisor"
                  {...registerExperience("role")}
                />
                {experienceErrors.role && (
                  <p className="text-sm text-destructive">{experienceErrors.role.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  placeholder="e.g., Goldman Sachs"
                  {...registerExperience("company")}
                />
                {experienceErrors.company && (
                  <p className="text-sm text-destructive">{experienceErrors.company.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., New York, NY"
                  {...registerExperience("location")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="month"
                    {...registerExperience("start_date")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="month"
                    disabled={watchExperience("is_current")}
                    {...registerExperience("end_date")}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_current"
                  className="h-4 w-4 rounded border-gray-300"
                  {...registerExperience("is_current")}
                />
                <Label htmlFor="is_current" className="cursor-pointer">
                  I currently work here
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your role and achievements..."
                  rows={4}
                  maxLength={500}
                  {...registerExperience("description")}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {watchExperience("description")?.length || 0}/500
                </p>
              </div>
            </div>

            <SheetFooter className="flex-col gap-2 sm:flex-row">
              {editingExperience && (
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full sm:w-auto"
                  disabled={saving}
                  onClick={() => handleDeleteExperience(editingExperience.id)}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Delete
                </Button>
              )}
              <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Add/Edit Education Sheet */}
      <Sheet open={isEducationSheetOpen} onOpenChange={setIsEducationSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingEducation ? 'Edit' : 'Add'} Education</SheetTitle>
            <SheetDescription>
              {editingEducation ? 'Update your educational qualification' : 'Add a new degree or certification'}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleEducationSubmit(handleSaveEducation)}>
            <div className="space-y-4 py-6">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree/Certificate *</Label>
                <Input
                  id="degree"
                  placeholder="e.g., Bachelor of Business Administration"
                  {...registerEducation("degree")}
                />
                {educationErrors.degree && (
                  <p className="text-sm text-destructive">{educationErrors.degree.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">Institution *</Label>
                <Input
                  id="institution"
                  placeholder="e.g., Harvard University"
                  {...registerEducation("institution")}
                />
                {educationErrors.institution && (
                  <p className="text-sm text-destructive">{educationErrors.institution.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="field_of_study">Field of Study</Label>
                <Input
                  id="field_of_study"
                  placeholder="e.g., Finance"
                  {...registerEducation("field_of_study")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_year">Start Year</Label>
                  <Input
                    id="start_year"
                    placeholder="2015"
                    maxLength={4}
                    {...registerEducation("start_year")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_year">End Year</Label>
                  <Input
                    id="end_year"
                    placeholder="2019"
                    maxLength={4}
                    {...registerEducation("end_year")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade/GPA</Label>
                <Input
                  id="grade"
                  placeholder="e.g., 3.8 GPA or First Class"
                  {...registerEducation("grade")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edu_description">Description</Label>
                <Textarea
                  id="edu_description"
                  placeholder="Achievements, activities, or relevant coursework..."
                  rows={4}
                  maxLength={500}
                  {...registerEducation("description")}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {watchEducation("description")?.length || 0}/500
                </p>
              </div>
            </div>

            <SheetFooter className="flex-col gap-2 sm:flex-row">
              {editingEducation && (
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full sm:w-auto"
                  disabled={saving}
                  onClick={() => handleDeleteEducation(editingEducation.id)}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Delete
                </Button>
              )}
              <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* View Recommendation Dialog */}
      {/* Service Preview Dialog */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Service Details</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{selectedService.name}</h3>
                {selectedService.description && (
                  <p className="text-muted-foreground">{selectedService.description}</p>
                )}
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="font-semibold text-lg">{selectedService.price}</p>
                </div>
                {selectedService.duration && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="font-medium">{selectedService.duration}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" asChild>
                  <Link href="/services">
                    <Edit className="h-4 w-4 mr-2" />
                    Manage Services
                  </Link>
                </Button>
                <Button onClick={() => setSelectedService(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Recommendation Preview Dialog */}
      <Dialog open={!!selectedRecommendation} onOpenChange={(open) => !open && setSelectedRecommendation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Recommendation</DialogTitle>
          </DialogHeader>
          {selectedRecommendation && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 shrink-0">
                  <AvatarFallback colorSeed={selectedRecommendation.author} className="text-lg">
                    {selectedRecommendation.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-lg">{selectedRecommendation.author}</p>
                      {selectedRecommendation.title && (
                        <p className="text-sm text-muted-foreground">{selectedRecommendation.title}</p>
                      )}
                      {selectedRecommendation.company && (
                        <p className="text-sm text-muted-foreground">{selectedRecommendation.company}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < selectedRecommendation.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  {selectedRecommendation.relationship && (
                    <Badge variant="outline" className="mt-2">
                      {selectedRecommendation.relationship}
                    </Badge>
                  )}
                </div>
              </div>
              <Separator />
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  "{selectedRecommendation.text}"
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedRecommendation(null);
                    handleEditRecommendation(selectedRecommendation);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button onClick={() => setSelectedRecommendation(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Recommendation Sheet */}
      <Sheet open={isRecommendationSheetOpen} onOpenChange={setIsRecommendationSheetOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingRecommendation ? 'Edit' : 'Add'} Recommendation</SheetTitle>
            <SheetDescription>
              {editingRecommendation ? 'Update client testimonial' : 'Add a client testimonial or recommendation'}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleRecommendationSubmit(handleSaveRecommendation)}>
            <div className="space-y-4 py-6">
              <div className="space-y-2">
                <Label htmlFor="author_name">Name *</Label>
                <Input
                  id="author_name"
                  placeholder="e.g., John Smith"
                  {...registerRecommendation("author_name")}
                />
                {recommendationErrors.author_name && (
                  <p className="text-sm text-destructive">{recommendationErrors.author_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="author_title">Title/Position</Label>
                <Input
                  id="author_title"
                  placeholder="e.g., CEO"
                  {...registerRecommendation("author_title")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author_company">Company</Label>
                <Input
                  id="author_company"
                  placeholder="e.g., ABC Corp"
                  {...registerRecommendation("author_company")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  id="relationship"
                  placeholder="e.g., Former Client, Colleague"
                  {...registerRecommendation("relationship")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    defaultValue="5"
                    className="w-20"
                    {...registerRecommendation("rating")}
                  />
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < (watchRecommendation("rating") || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} 
                      />
                    ))}
                  </div>
                </div>
                {recommendationErrors.rating && (
                  <p className="text-sm text-destructive">{recommendationErrors.rating.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rec_text">Recommendation Text *</Label>
                <Textarea
                  id="rec_text"
                  placeholder="Write the recommendation text..."
                  rows={6}
                  maxLength={1000}
                  {...registerRecommendation("text")}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {watchRecommendation("text")?.length || 0}/1000
                </p>
                {recommendationErrors.text && (
                  <p className="text-sm text-destructive">{recommendationErrors.text.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    className="h-4 w-4 rounded border-gray-300"
                    {...registerRecommendation("is_featured")}
                  />
                  <Label htmlFor="is_featured" className="cursor-pointer">
                    Feature this recommendation
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_visible"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300"
                    {...registerRecommendation("is_visible")}
                  />
                  <Label htmlFor="is_visible" className="cursor-pointer">
                    Visible on profile
                  </Label>
                </div>
              </div>
            </div>

            <SheetFooter className="flex-col gap-2 sm:flex-row">
              {editingRecommendation && (
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full sm:w-auto"
                  disabled={saving}
                  onClick={() => handleDeleteRecommendation(editingRecommendation.id)}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Delete
                </Button>
              )}
              <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
