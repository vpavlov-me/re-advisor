"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  getFamily,
  getFamilyMembers,
  addFamilyMember,
  deleteFamily as deleteFamilyApi
} from "@/lib/supabase/families";
import { getTasksByFamily, createTask, toggleTaskComplete } from "@/lib/supabase/tasks";
import { getConsultationsByFamily, createConsultation } from "@/lib/supabase";
import { getServicesByFamily, createFamilyService } from "@/lib/services";
import { createInvoice } from "@/lib/transactions";
import { toast } from "sonner";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  MoreVertical,
  Building2,
  MapPin,
  Mail,
  Phone,
  Video,
  CheckCircle,
  Plus,
  Edit,
  MessageSquare,
  UserPlus,
  ListTodo,
  Loader2,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { FamilyDetailSkeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DatePicker } from "@/components/ui/date-picker";

// Types
type AdvisorRole = "external-consul" | "consultant" | "personal-advisor";
type PaymentStatus = "pending" | "paid" | "no-invoices";
type FamilyStatus = "active" | "pending" | "inactive";

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar?: string;
}

interface Task {
  id: number;
  title: string;
  due_date: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

interface Service {
  id: number;
  name: string;
  status: string;
  progress: number;
  price: string;
  start_date: string;
  description?: string;
}

interface Consultation {
  id: number;
  title: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
}

interface Family {
  id: number;
  name: string;
  role: AdvisorRole;
  status: FamilyStatus;
  payment_status: PaymentStatus;
  industry: string;
  location: string;
  email: string;
  phone: string;
  description: string;
  created_at: string;
  last_contact?: string;
  members: FamilyMember[];
  tasks: Task[];
  services: Service[];
  consultations: Consultation[];
}

function getRoleBadge(role: AdvisorRole) {
  const variants = {
    "external-consul": { className: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300", label: "External Consul" },
    "consultant": { className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", label: "Consultant" },
    "personal-advisor": { className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", label: "Personal Family Advisor" },
  };
  const variant = variants[role] || variants.consultant;
  return <Badge variant="secondary" className={variant.className}>{variant.label}</Badge>;
}

function getPaymentBadge(payment: PaymentStatus) {
  const variants = {
    "paid": { className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", label: "Paid" },
    "pending": { className: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300", label: "Pending" },
    "no-invoices": { className: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400", label: "No Invoices" },
  };
  const variant = variants[payment] || variants["no-invoices"];
  return <Badge variant="secondary" className={variant.className}>{variant.label}</Badge>;
}

function getStatusBadge(status: FamilyStatus) {
  const variants = {
    active: { className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", label: "Active" },
    pending: { className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300", label: "Pending" },
    inactive: { className: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400", label: "Inactive" },
  };
  const variant = variants[status] || variants.pending;
  return <Badge variant="secondary" className={variant.className}>{variant.label}</Badge>;
}

export default function FamilyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const familyId = params.id as string;

  const [family, setFamily] = useState<Family | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Dialog states
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isProposeServiceDialogOpen, setIsProposeServiceDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form states
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "Child" });
  const [newTask, setNewTask] = useState<{ title: string; dueDate: Date | undefined; priority: string }>({ title: "", dueDate: undefined, priority: "medium" });
  const [newProposal, setNewProposal] = useState({ name: "", price: "", description: "" });
  const [newConsultation, setNewConsultation] = useState<{ title: string; date: Date | undefined; time: string }>({ title: "", date: undefined, time: "" });
  const [newInvoice, setNewInvoice] = useState<{ amount: string; dueDate: Date | undefined; serviceId: string }>({ amount: "", dueDate: undefined, serviceId: "" });

  const fetchFamily = useCallback(async () => {
    setIsLoading(true);
    try {
      const familyIdNum = parseInt(familyId);
      
      // Fetch family data using abstraction
      const familyData = await getFamily(familyIdNum);
      if (!familyData) throw new Error("Family not found");

      // Fetch members
      const membersData = await getFamilyMembers(familyIdNum);

      // Fetch tasks
      const tasksData = await getTasksByFamily(familyIdNum);

      // Fetch services
      const { data: servicesData } = await getServicesByFamily(familyIdNum);

      // Fetch consultations
      const consultationsData = await getConsultationsByFamily(familyIdNum);

      const family: Family = {
        id: familyData.id,
        name: familyData.name,
        role: familyData.role || "consultant",
        status: familyData.status || "active",
        payment_status: familyData.payment_status || "no-invoices",
        industry: familyData.industry || "Unknown",
        location: familyData.location || "Unknown",
        email: familyData.email || "",
        phone: familyData.phone || "",
        description: familyData.description || "",
        created_at: familyData.created_at,
        last_contact: familyData.last_contact,
        members: membersData?.map((m: any) => ({
          id: m.id,
          name: m.name,
          role: m.role,
          email: m.email,
          avatar: m.name.substring(0, 2).toUpperCase()
        })) || [],
        tasks: tasksData?.map((t: any) => ({
          id: t.id,
          title: t.title,
          due_date: t.due_date,
          priority: t.priority || "medium",
          completed: t.completed || false
        })) || [],
        services: servicesData?.map((s: any) => ({
          id: s.id,
          name: s.name,
          status: s.status || "Active",
          progress: s.progress || 0,
          price: s.price || "$0",
          start_date: s.start_date,
          description: s.description
        })) || [],
        consultations: consultationsData?.map((c: any) => ({
          id: c.id,
          title: c.title,
          date: c.date,
          time: c.time,
          status: c.status || "scheduled"
        })) || []
      };

      setFamily(family);
    } catch (error) {
      console.error("Error fetching family:", error);
      toast.error("Family not found");
      router.push("/families");
    } finally {
      setIsLoading(false);
    }
  }, [familyId, router]);

  useEffect(() => {
    fetchFamily();
  }, [fetchFamily]);

  const handleAddMember = async () => {
    if (!family || !newMember.name || !newMember.email) return;

    setSaving(true);
    try {
      const data = await addFamilyMember({
        family_id: family.id,
        name: newMember.name,
        email: newMember.email,
        role: newMember.role
      });

      const member: FamilyMember = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        avatar: data.name.substring(0, 2).toUpperCase()
      };

      setFamily({ ...family, members: [...family.members, member] });
      setIsAddMemberDialogOpen(false);
      setNewMember({ name: "", email: "", role: "Child" });
      toast.success("Member added successfully");
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member");
    } finally {
      setSaving(false);
    }
  };

  const handleAddTask = async () => {
    if (!family || !newTask.title || !newTask.dueDate) return;

    setSaving(true);
    try {
      const data = await createTask({
        family_id: family.id,
        title: newTask.title,
        due_date: newTask.dueDate.toISOString().split('T')[0],
        priority: newTask.priority as "low" | "medium" | "high"
      });

      const task: Task = {
        id: data.id,
        title: data.title,
        due_date: data.due_date,
        priority: data.priority,
        completed: false
      };

      setFamily({ ...family, tasks: [task, ...family.tasks] });
      setIsAddTaskDialogOpen(false);
      setNewTask({ title: "", dueDate: undefined, priority: "medium" });
      toast.success("Task added successfully");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    } finally {
      setSaving(false);
    }
  };

  const toggleTaskCompletion = async (taskId: number) => {
    if (!family) return;

    const task = family.tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      await toggleTaskComplete(taskId);

      setFamily({
        ...family,
        tasks: family.tasks.map(t =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      });
      toast.success(task.completed ? "Task reopened" : "Task completed");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const handleProposeService = async () => {
    if (!family || !newProposal.name || !newProposal.price) return;

    setSaving(true);
    try {
      const { data, error } = await createFamilyService({
        family_id: family.id,
        name: newProposal.name,
        price: `$${newProposal.price}`,
        description: newProposal.description
      });

      if (error) throw error;

      const service: Service = {
        id: data!.id,
        name: data!.name,
        status: "Pending",
        progress: 0,
        price: data!.price || `$${newProposal.price}`,
        start_date: data!.start_date || new Date().toISOString(),
        description: data!.description || undefined
      };

      setFamily({ ...family, services: [service, ...family.services] });
      setIsProposeServiceDialogOpen(false);
      setNewProposal({ name: "", price: "", description: "" });
      toast.success("Service proposal sent");
    } catch (error) {
      console.error("Error proposing service:", error);
      toast.error("Failed to send proposal");
    } finally {
      setSaving(false);
    }
  };

  const handleScheduleConsultation = async () => {
    if (!family || !newConsultation.title || !newConsultation.date) return;

    setSaving(true);
    try {
      const data = await createConsultation({
        family_id: family.id,
        title: newConsultation.title,
        date: newConsultation.date.toISOString().split('T')[0],
        time: newConsultation.time || "10:00 AM",
        status: "scheduled"
      });

      const consultation: Consultation = {
        id: data.id,
        title: data.title,
        date: data.date,
        time: data.time,
        status: "scheduled"
      };

      setFamily({ ...family, consultations: [consultation, ...family.consultations] });
      setIsScheduleDialogOpen(false);
      setNewConsultation({ title: "", date: undefined, time: "" });
      toast.success("Consultation scheduled");
    } catch (error) {
      console.error("Error scheduling consultation:", error);
      toast.error("Failed to schedule consultation");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateInvoice = async () => {
    if (!family || !newInvoice.amount || !newInvoice.dueDate) return;

    setSaving(true);
    try {
      const { error } = await createInvoice({
        family_id: family.id,
        amount: parseFloat(newInvoice.amount),
        due_date: newInvoice.dueDate.toISOString().split('T')[0],
        description: newInvoice.serviceId ? `Invoice for ${newInvoice.serviceId}` : "Service invoice"
      });

      if (error) throw error;

      setFamily({ ...family, payment_status: "pending" });
      setIsInvoiceDialogOpen(false);
      setNewInvoice({ amount: "", dueDate: undefined, serviceId: "" });
      toast.success("Invoice created");
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error("Failed to create invoice");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFamily = async () => {
    if (!family) return;

    setIsDeleting(true);
    try {
      await deleteFamilyApi(family.id);

      toast.success("Family removed");
      router.push("/families");
    } catch (error) {
      console.error("Error deleting family:", error);
      toast.error("Failed to delete family");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return <FamilyDetailSkeleton />;
  }


  if (!family) {
    return (
      <div className="min-h-screen bg-page-background flex items-center justify-center">
        <div className="text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-lg font-medium mb-2">Family not found</h2>
          <Button asChild>
            <Link href="/families">Back to Families</Link>
          </Button>
        </div>
      </div>
    );
  }

  const upcomingConsultations = family.consultations.filter(c => c.status === "scheduled");
  const openTasks = family.tasks.filter(t => !t.completed);

  return (
    <div className="min-h-screen bg-page-background">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-40 bg-page-background/95 backdrop-blur supports-[backdrop-filter]:bg-page-background/60 border-b">
        {/* Breadcrumb */}
        <div className="bg-card/50 border-b border-border/50">
          <div className="container py-2">
            <div className="flex items-center gap-2 text-sm">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Home</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <Link href="/families" className="text-muted-foreground hover:text-foreground transition-colors">
                Family Clients
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-foreground font-medium truncate max-w-[200px]">{family.name}</span>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild className="shrink-0">
                <Link href="/families">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback colorSeed={family.name} className="text-sm">
                  {family.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h1 className="text-lg font-semibold truncate">{family.name}</h1>
                <div className="flex items-center gap-2">
                  {getRoleBadge(family.role)}
                  {getStatusBadge(family.status)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" asChild className="hidden sm:flex">
                <Link href={`/messages?family=${family.id}`}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Link>
              </Button>
              <Button size="sm" onClick={() => setIsScheduleDialogOpen(true)}>
                <Calendar className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Schedule</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild className="sm:hidden">
                    <Link href={`/messages?family=${family.id}`}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsInvoiceDialogOpen(true)}>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Create Invoice
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Family
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Family Description - moved outside header */}
        {family.description && (
          <p className="text-sm text-muted-foreground mb-6">{family.description}</p>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">
              Tasks
              {openTasks.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">{openTasks.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Family Info */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Family Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{family.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{family.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{family.email || "Not provided"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{family.phone || "Not provided"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Client since {new Date(family.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{family.members.length} members</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Services</span>
                    <span className="font-medium">{family.services.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Upcoming Meetings</span>
                    <span className="font-medium">{upcomingConsultations.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Open Tasks</span>
                    <span className="font-medium">{openTasks.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Payment Status</span>
                    {getPaymentBadge(family.payment_status)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Members */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Family Members</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setIsAddMemberDialogOpen(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {family.members.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No members added yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {family.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                        <Avatar>
                          <AvatarFallback colorSeed={member.name}>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-foreground truncate">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Next Meeting */}
            {upcomingConsultations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Next Meeting</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{upcomingConsultations[0].title}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(upcomingConsultations[0].date).toLocaleDateString()} at {upcomingConsultations[0].time}
                        </div>
                      </div>
                    </div>
                    <Button>Join Meeting</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Advisor Personal Tasks</h3>
                <p className="text-sm text-muted-foreground">
                  These tasks are private to you and not visible to the family.
                </p>
              </div>
              <Button size="sm" onClick={() => setIsAddTaskDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>

            {family.tasks.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-muted-foreground">
                    <ListTodo className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No tasks yet</p>
                    <p className="text-sm">Create your first task to track work for this family</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {family.tasks.map((task) => (
                  <Card key={task.id} className={task.completed ? "opacity-60" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                            task.completed ? "bg-primary border-primary" : "border-muted-foreground"
                          }`}
                          onClick={() => toggleTaskCompletion(task.id)}
                        >
                          {task.completed && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {task.title}
                          </div>
                          {task.due_date && (
                            <div className="text-xs text-muted-foreground">
                              Due: {new Date(task.due_date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            task.priority === "high"
                              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                              : task.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Active Services</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsInvoiceDialogOpen(true)}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
                <Button size="sm" onClick={() => setIsProposeServiceDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Propose Service
                </Button>
              </div>
            </div>

            {family.services.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-muted-foreground">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No active services</p>
                    <p className="text-sm">Propose a service to this family</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {family.services.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">{service.name}</h4>
                          <div className="text-sm text-muted-foreground">
                            Started: {service.start_date ? new Date(service.start_date).toLocaleDateString() : "N/A"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-foreground">{service.price}</div>
                          <Badge
                            variant="secondary"
                            className={
                              service.status === "Active"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : service.status === "In Progress"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            }
                          >
                            {service.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">{service.progress}%</span>
                        </div>
                        <Progress value={service.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Consultation History</h3>
              <Button size="sm" onClick={() => setIsScheduleDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>

            {family.consultations.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No consultations yet</p>
                    <p className="text-sm">Schedule your first consultation with this family</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {family.consultations.map((consultation) => (
                  <Card key={consultation.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                            consultation.status === "scheduled" ? "bg-blue-100" : "bg-gray-100"
                          }`}
                        >
                          <Video
                            className={`h-5 w-5 ${
                              consultation.status === "scheduled" ? "text-blue-600" : "text-gray-500"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{consultation.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(consultation.date).toLocaleDateString()} at {consultation.time}
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            consultation.status === "scheduled"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              : consultation.status === "completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          }
                        >
                          {consultation.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Member Dialog */}
      <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
            <DialogDescription>Add a new member to {family.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="e.g. John Smith"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Role in Family</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              >
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
                <option value="Spouse">Spouse</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Create a new task for {family.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Task Title</Label>
              <Input
                placeholder="e.g. Review quarterly report"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Due Date</Label>
                <DatePicker
                  date={newTask.dueDate}
                  onDateChange={(date) => setNewTask({ ...newTask, dueDate: date })}
                  placeholder="Select due date"
                  minDate={new Date()}
                />
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Propose Service Dialog */}
      <Dialog open={isProposeServiceDialogOpen} onOpenChange={setIsProposeServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Propose New Service</DialogTitle>
            <DialogDescription>Create a service proposal for {family.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Service Name</Label>
              <Input
                placeholder="e.g. Family Constitution Workshop"
                value={newProposal.name}
                onChange={(e) => setNewProposal({ ...newProposal, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Price ($)</Label>
              <Input
                type="number"
                placeholder="5000"
                value={newProposal.price}
                onChange={(e) => setNewProposal({ ...newProposal, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                placeholder="Describe the service deliverables..."
                value={newProposal.description}
                onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProposeServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProposeService} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Send Proposal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Consultation Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Consultation</DialogTitle>
            <DialogDescription>Set up a new meeting with {family.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Meeting Title</Label>
              <Input
                placeholder="e.g. Quarterly Review"
                value={newConsultation.title}
                onChange={(e) => setNewConsultation({ ...newConsultation, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <DatePicker
                  date={newConsultation.date}
                  onDateChange={(date) => setNewConsultation({ ...newConsultation, date })}
                  placeholder="Select date"
                  minDate={new Date()}
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={newConsultation.time}
                  onChange={(e) => setNewConsultation({ ...newConsultation, time: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleConsultation} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Schedule Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Invoice Dialog */}
      <Dialog open={isInvoiceDialogOpen} onOpenChange={setIsInvoiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
            <DialogDescription>Generate a new invoice for {family.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Amount ($)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <DatePicker
                date={newInvoice.dueDate}
                onDateChange={(date) => setNewInvoice({ ...newInvoice, dueDate: date })}
                placeholder="Select due date"
                minDate={new Date()}
              />
            </div>
            <div className="space-y-2">
              <Label>Linked Service (Optional)</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                value={newInvoice.serviceId}
                onChange={(e) => setNewInvoice({ ...newInvoice, serviceId: e.target.value })}
              >
                <option value="">Select a service...</option>
                {family.services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvoiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateInvoice} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Generate Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Family</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {family.name}? This action cannot be undone and will remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteFamily}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Remove Family
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
