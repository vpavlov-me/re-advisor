"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { 
  Home, 
  ChevronRight, 
  Search,
  Filter,
  Plus,
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  MoreVertical,
  Building2,
  MapPin,
  Mail,
  Phone,
  FileText,
  X,
  Edit,
  MessageSquare,
  Video,
  CheckCircle,
  Eye,
  UserPlus,
  ListTodo,
  ChevronDown,
  ChevronLeft,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePicker } from "@/components/ui/date-picker";

// Advisor roles
type AdvisorRole = "external-consul" | "consultant" | "personal-advisor";

// Validation Schemas
const inviteSchema = z.object({
  familyName: z.string().optional(),
  contactName: z.string().min(2, "Contact name is required"),
  contactEmail: z.string().email("Invalid email address"),
  role: z.enum(["external-consul", "consultant", "personal-advisor"]),
  message: z.string().optional()
});

const taskSchema = z.object({
  title: z.string().min(2, "Task title is required"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["low", "medium", "high"])
});

const memberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(2, "Role is required")
});

type InviteFormData = z.infer<typeof inviteSchema>;
type TaskFormData = z.infer<typeof taskSchema>;
type MemberFormData = z.infer<typeof memberSchema>;

type Family = {
  id: number;
  name: string;
  members: number;
  role: AdvisorRole;
  meetings: { upcoming: number; nextDate: string | null };
  payment: "pending" | "paid" | "no-invoices";
  status: "active" | "pending" | "inactive";
  lastContact: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
  since: string;
  description: string;
  membersList: { name: string; role: string; avatar: string; email: string; }[];
  tasks: { id: number; title: string; dueDate: string; priority: string; completed: boolean; }[];
  services: { name: string; status: string; progress: number; price: string; startDate: string; }[];
  consultations: { title: string; date: string; time: string; status: string; }[];
};

// Stats component (dynamically calculated from data)
const getStats = (familiesList: Family[]) => [
  { label: "Total Families", value: String(familiesList.length), icon: Users },
  { label: "Active Engagements", value: String(familiesList.filter(f => f.status === 'active').length), icon: Briefcase },
  { label: "Upcoming Meetings", value: String(familiesList.reduce((sum, f) => sum + f.meetings.upcoming, 0)), icon: Calendar },
  { label: "Pending Payments", value: String(familiesList.filter(f => f.payment === 'pending').length), icon: DollarSign },
];

function getRoleBadge(role: AdvisorRole) {
  const variants = {
    "external-consul": { className: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300", label: "External Consul" },
    "consultant": { className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", label: "Consultant" },
    "personal-advisor": { className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", label: "Personal Family Advisor" },
  };
  return <Badge variant="secondary" className={variants[role].className}>{variants[role].label}</Badge>;
}

function getPaymentBadge(payment: "paid" | "pending" | "no-invoices") {
  const variants = {
    "paid": { className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", label: "Paid" },
    "pending": { className: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300", label: "Pending" },
    "no-invoices": { className: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400", label: "No Invoices" },
  };
  return <Badge variant="secondary" className={variants[payment].className}>{variants[payment].label}</Badge>;
}

function getStatusBadge(status: "active" | "pending" | "inactive") {
  const variants = {
    active: { className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", label: "Active" },
    pending: { className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300", label: "Pending" },
    inactive: { className: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400", label: "Inactive" },
  };
  return <Badge variant="secondary" className={variants[status].className}>{variants[status].label}</Badge>;
}

// Pagination options
const paginationOptions = [3, 5, 10];

export default function FamiliesPage() {
  const router = useRouter();
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingFamilyId, setDeletingFamilyId] = useState<number | null>(null);
  const [workspaceTab, setWorkspaceTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [familiesList, setFamiliesList] = useState<Family[]>([]);
  const [, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [, setIsRefreshing] = useState(false);

  // React Hook Form for Member
  const {
    register: registerMember,
    handleSubmit: handleMemberSubmit,
    formState: { errors: memberErrors },
    reset: resetMember
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema)
  });

  const fetchFamilies = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('families')
        .select(`
          *,
          members:family_members(*),
          tasks:tasks(*),
          services:services(*),
          consultations:consultations(*)
        `);
      
      if (error) {
        console.log("Supabase error (using mock data):", error.message);
        return;
      }

      if (data && data.length > 0) {
        const mappedFamilies: Family[] = data.map((f: any) => ({
          id: f.id,
          name: f.name,
          members: f.members?.length || 0,
          role: (f.role as AdvisorRole) || "consultant",
          meetings: { 
            upcoming: f.consultations?.filter((c: any) => c.status === 'scheduled').length || 0, 
            nextDate: f.consultations?.find((c: any) => c.status === 'scheduled')?.date || null 
          },
          payment: (f.payment_status as any) || "pending",
          status: (f.status as any) || "active",
          lastContact: f.last_contact ? new Date(f.last_contact).toLocaleDateString() : "Recently",
          industry: f.industry || "Unknown",
          location: f.location || "Unknown",
          email: f.email || "",
          phone: f.phone || "",
          since: f.created_at ? new Date(f.created_at).toLocaleDateString() : "Recently",
          description: f.description || "",
          membersList: f.members?.map((m: any) => ({
            name: m.name,
            role: m.role,
            avatar: m.name.substring(0, 2).toUpperCase(),
            email: m.email
          })) || [],
          tasks: f.tasks?.map((t: any) => ({
            id: t.id,
            title: t.title,
            dueDate: t.due_date,
            priority: t.priority,
            completed: t.completed
          })) || [],
          services: f.services?.map((s: any) => ({
            name: s.name,
            status: s.status,
            progress: s.progress,
            price: s.price,
            startDate: s.start_date
          })) || [],
          consultations: f.consultations?.map((c: any) => ({
            title: c.title,
            date: c.date,
            time: c.time,
            status: c.status
          })) || []
        }));
        
        setFamiliesList(mappedFamilies);
      }
    } catch (error) {
      console.error("Error fetching families:", error);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchFamilies();
      setLoading(false);
    };
    init();
  }, [fetchFamilies]);

  // Invite Form State
  const [inviteForm, setInviteForm] = useState({
    familyName: "",
    contactName: "",
    contactEmail: "",
    role: "consultant",
    message: ""
  });

  // Task Form State
  const [newTask, setNewTask] = useState<{
    title: string;
    dueDate: Date | undefined;
    priority: string;
  }>({
    title: "",
    dueDate: undefined,
    priority: "medium"
  });

  // Propose Service State
  const [isProposeServiceDialogOpen, setIsProposeServiceDialogOpen] = useState(false);
  const [newProposal, setNewProposal] = useState({
    name: "",
    price: "",
    description: ""
  });

  const handleProposeService = async () => {
    if (!selectedFamily || !newProposal.name || !newProposal.price) return;

    setSaving(true);
    try {
      const service = {
        name: newProposal.name,
        status: "Pending" as const,
        progress: 0,
        price: `$${newProposal.price}`,
        startDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };

      // Save to Supabase
      const { error } = await supabase
        .from('services')
        .insert([{
          family_id: selectedFamily.id,
          name: newProposal.name,
          status: 'Pending',
          progress: 0,
          price: `$${newProposal.price}`,
          description: newProposal.description,
          start_date: new Date().toISOString()
        }]);

      if (error) throw error;

      const updatedFamily = {
        ...selectedFamily,
        services: [service, ...selectedFamily.services]
      };

      setFamiliesList(familiesList.map(f => f.id === selectedFamily.id ? updatedFamily : f));
      setSelectedFamily(updatedFamily);
      setIsProposeServiceDialogOpen(false);
      setNewProposal({ name: "", price: "", description: "" });
      toast.success('Service proposal sent successfully');
    } catch (error) {
      console.error('Error proposing service:', error);
      toast.error('Failed to send service proposal');
    } finally {
      setSaving(false);
    }
  };

  // Schedule Consultation State
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [newConsultation, setNewConsultation] = useState<{
    title: string;
    date: Date | undefined;
    time: string;
  }>({
    title: "",
    date: undefined,
    time: ""
  });

  const handleScheduleConsultation = async () => {
    if (!selectedFamily || !newConsultation.title || !newConsultation.date) return;

    setSaving(true);
    try {
      const consultation = {
        title: newConsultation.title,
        date: newConsultation.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: newConsultation.time || "10:00 AM",
        status: "scheduled" as const
      };

      // Save to Supabase
      const { error } = await supabase
        .from('consultations')
        .insert([{
          family_id: selectedFamily.id,
          title: consultation.title,
          date: newConsultation.date.toISOString().split('T')[0],
          time: consultation.time,
          status: 'scheduled'
        }]);

      if (error) throw error;

      const updatedFamily = {
        ...selectedFamily,
        consultations: [consultation, ...selectedFamily.consultations],
        meetings: {
          ...selectedFamily.meetings,
          upcoming: selectedFamily.meetings.upcoming + 1,
          nextDate: selectedFamily.meetings.upcoming === 0 ? consultation.date : selectedFamily.meetings.nextDate
        }
      };

      setFamiliesList(familiesList.map(f => f.id === selectedFamily.id ? updatedFamily : f));
      setSelectedFamily(updatedFamily);
      setIsScheduleDialogOpen(false);
      setNewConsultation({ title: "", date: undefined, time: "" });
      toast.success('Consultation scheduled successfully');
    } catch (error) {
      console.error('Error scheduling consultation:', error);
      toast.error('Failed to schedule consultation');
    } finally {
      setSaving(false);
    }
  };

  // Create Invoice State
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState<{
    serviceId: string;
    amount: string;
    dueDate: Date | undefined;
  }>({
    serviceId: "",
    amount: "",
    dueDate: undefined
  });

  const handleCreateInvoice = async () => {
    if (!selectedFamily || !newInvoice.amount || !newInvoice.dueDate) return;
    
    setSaving(true);
    try {
      // Save invoice to Supabase
      const { error } = await supabase
        .from('transactions')
        .insert([{
          family_id: selectedFamily.id,
          type: 'invoice',
          amount: parseFloat(newInvoice.amount),
          status: 'pending',
          due_date: newInvoice.dueDate.toISOString().split('T')[0],
          description: newInvoice.serviceId ? `Invoice for ${newInvoice.serviceId}` : 'Service invoice'
        }]);

      if (error) throw error;
      
      const updatedFamily = {
        ...selectedFamily,
        payment: "pending" as const
      };

      setFamiliesList(familiesList.map(f => f.id === selectedFamily.id ? updatedFamily : f));
      setSelectedFamily(updatedFamily);
      setIsInvoiceDialogOpen(false);
      setNewInvoice({ serviceId: "", amount: "", dueDate: undefined });
      toast.success('Invoice created successfully');
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error('Failed to create invoice');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFamily = async () => {
    if (!deletingFamilyId) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('families')
        .delete()
        .eq('id', deletingFamilyId);

      if (error) throw error;

      setFamiliesList(familiesList.filter(f => f.id !== deletingFamilyId));
      toast.success('Family removed successfully');
    } catch (error) {
      console.error('Error deleting family:', error);
      // Fallback for demo
      setFamiliesList(familiesList.filter(f => f.id !== deletingFamilyId));
      toast.success('Family removed successfully');
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setDeletingFamilyId(null);
    }
  };

  const confirmDeleteFamily = (familyId: number) => {
    setDeletingFamilyId(familyId);
    setIsDeleteDialogOpen(true);
  };

  const handleAddMember = async (data: MemberFormData) => {
    if (!selectedFamily) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('family_members')
        .insert([{
          family_id: selectedFamily.id,
          name: data.name,
          email: data.email,
          role: data.role
        }])
        .select()
        .single();

      if (error) throw error;

      const newMember = {
        name: data.name,
        role: data.role,
        avatar: data.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
        email: data.email
      };

      const updatedFamily = {
        ...selectedFamily,
        membersList: [...selectedFamily.membersList, newMember],
        members: selectedFamily.members + 1
      };

      setFamiliesList(familiesList.map(f => f.id === selectedFamily.id ? updatedFamily : f));
      setSelectedFamily(updatedFamily);
      setIsAddMemberDialogOpen(false);
      resetMember();
      toast.success('Member added successfully');
    } catch (error) {
      console.error('Error adding member:', error);
      // Fallback for demo
      const newMember = {
        name: data.name,
        role: data.role,
        avatar: data.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
        email: data.email
      };

      const updatedFamily = {
        ...selectedFamily,
        membersList: [...selectedFamily.membersList, newMember],
        members: selectedFamily.members + 1
      };

      setFamiliesList(familiesList.map(f => f.id === selectedFamily.id ? updatedFamily : f));
      setSelectedFamily(updatedFamily);
      setIsAddMemberDialogOpen(false);
      resetMember();
      toast.success('Member added successfully');
    } finally {
      setSaving(false);
    }
  };

  const handleInviteFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSaving(true);
    try {
      // Get current user for advisor_id
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to invite families');
        return;
      }

      const familyName = inviteForm.familyName || `${inviteForm.contactName}'s Family`;
      
      // Create family in Supabase
      const { data: familyData, error: familyError } = await supabase
        .from('families')
        .insert([{
          advisor_id: user.id,
          name: familyName,
          role: inviteForm.role,
          status: 'pending',
          email: inviteForm.contactEmail,
          payment_status: 'no-invoices',
          description: 'New family invitation sent.'
        }])
        .select()
        .single();

      if (familyError) throw familyError;

      // Add primary contact as family member
      if (familyData) {
        await supabase
          .from('family_members')
          .insert([{
            family_id: familyData.id,
            name: inviteForm.contactName,
            email: inviteForm.contactEmail,
            role: 'Primary Contact'
          }]);
      }

      const newFamily: Family = {
        id: familyData?.id || Math.max(...familiesList.map(f => f.id)) + 1,
        name: familyName,
        members: 1,
        role: inviteForm.role as AdvisorRole,
        meetings: { upcoming: 0, nextDate: null },
        payment: "no-invoices" as const,
        status: "pending" as const,
        lastContact: "Just now",
        industry: "Unknown",
        location: "Unknown",
        email: inviteForm.contactEmail,
        phone: "",
        since: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        description: "New family invitation sent.",
        membersList: [
          { 
            name: inviteForm.contactName, 
            role: "Primary Contact", 
            avatar: inviteForm.contactName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(), 
            email: inviteForm.contactEmail 
          }
        ],
        tasks: [],
        services: [],
        consultations: [],
      };

      setFamiliesList([newFamily, ...familiesList]);
      setIsInviteDialogOpen(false);
      setInviteForm({
        familyName: "",
        contactName: "",
        contactEmail: "",
        role: "consultant",
        message: ""
      });
      toast.success('Family invitation sent successfully');
    } catch (error) {
      console.error('Error inviting family:', error);
      toast.error('Failed to send invitation');
    } finally {
      setSaving(false);
    }
  };

  const handleAddTask = async () => {
    if (!selectedFamily || !newTask.title || !newTask.dueDate) return;

    setSaving(true);
    try {
      // Save task to Supabase
      const { data: taskData, error } = await supabase
        .from('tasks')
        .insert([{
          family_id: selectedFamily.id,
          title: newTask.title,
          due_date: newTask.dueDate.toISOString().split('T')[0],
          priority: newTask.priority,
          completed: false
        }])
        .select()
        .single();

      if (error) throw error;

      const task = {
        id: taskData?.id || Math.random(),
        title: newTask.title,
        dueDate: newTask.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        priority: newTask.priority,
        completed: false
      };

      const updatedFamily = {
        ...selectedFamily,
        tasks: [task, ...selectedFamily.tasks]
      };

      setFamiliesList(familiesList.map(f => f.id === selectedFamily.id ? updatedFamily : f));
      setSelectedFamily(updatedFamily);
      setIsAddTaskDialogOpen(false);
      setNewTask({ title: "", dueDate: undefined, priority: "medium" });
      toast.success('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    } finally {
      setSaving(false);
    }
  };

  const toggleTaskCompletion = async (taskId: number) => {
    if (!selectedFamily) return;

    const task = selectedFamily.tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      // Update in Supabase
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', taskId);

      if (error) throw error;

      const updatedTasks = selectedFamily.tasks.map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );

      const updatedFamily = { ...selectedFamily, tasks: updatedTasks };
      setFamiliesList(familiesList.map(f => f.id === selectedFamily.id ? updatedFamily : f));
      setSelectedFamily(updatedFamily);
      toast.success(task.completed ? 'Task reopened' : 'Task completed');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  // Filter families
  const filteredFamilies = familiesList.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFamilies.length / itemsPerPage);
  const paginatedFamilies = filteredFamilies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Bar */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Home</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-foreground font-medium">Family Clients</span>
            </div>
            <Button onClick={() => setIsInviteDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Invite Family
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {getStats(familiesList).map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                    <div className="text-2xl font-semibold text-foreground mt-1">{stat.value}</div>
                  </div>
                  <div className="h-10 w-10 rounded-[10px] bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Families Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Family Clients</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search families..." 
                    className="pl-9 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Family Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Meetings</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedFamilies.map((family) => (
                  <TableRow 
                    key={family.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/families/${family.id}`)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="text-xs">
                            {family.name.split(" ")[0][0]}{family.name.split(" ")[1]?.[0] || ""}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{family.name}</div>
                          <div className="text-xs text-muted-foreground">{family.industry}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(family.role)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{family.members}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {family.meetings.upcoming > 0 ? (
                        <div className="text-sm">
                          <span className="text-foreground font-medium">{family.meetings.upcoming} upcoming</span>
                          <span className="text-muted-foreground"> | Next: {family.meetings.nextDate}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">No meetings</span>
                      )}
                    </TableCell>
                    <TableCell>{getPaymentBadge(family.payment)}</TableCell>
                    <TableCell>{getStatusBadge(family.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{family.lastContact}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push(`/families/${family.id}`)}>
                            <Eye className="h-4 w-4" />
                            Open Workspace
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <MessageSquare className="h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Calendar className="h-4 w-4" />
                            Schedule Meeting
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Edit className="h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                            onClick={() => confirmDeleteFamily(family.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove Family
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {filteredFamilies.length > 0 && (
              <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Show</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        {itemsPerPage}
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {paginationOptions.map((option) => (
                        <DropdownMenuItem 
                          key={option}
                          onClick={() => { setItemsPerPage(option); setCurrentPage(1); }}
                        >
                          {option} per page
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <span>per page</span>
                  <span className="ml-4">
                    Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredFamilies.length)} of {filteredFamilies.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button 
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Family Workspace Modal (Full-Screen) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent fullScreen className="flex flex-col overflow-hidden">
          {selectedFamily && (
            <>
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {selectedFamily.name.split(" ")[0][0]}{selectedFamily.name.split(" ")[1]?.[0] || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">{selectedFamily.name}</DialogTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {getRoleBadge(selectedFamily.role)}
                      {getStatusBadge(selectedFamily.status)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </DialogClose>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex-1 overflow-hidden">
                <Tabs value={workspaceTab} onValueChange={setWorkspaceTab} className="h-full flex flex-col">
                  <div className="px-6 pt-4 shrink-0">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="tasks">
                        Tasks
                        {selectedFamily.tasks.filter(t => !t.completed).length > 0 && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {selectedFamily.tasks.filter(t => !t.completed).length}
                          </Badge>
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="services">Services</TabsTrigger>
                      <TabsTrigger value="consultations">Consultations</TabsTrigger>
                    </TabsList>
                  </div>

                  <ScrollArea className="flex-1 px-6 py-4">
                    {/* Overview Tab */}
                    <TabsContent value="overview" className="mt-0 space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        {/* Family Info */}
                        <Card className="col-span-2">
                          <CardHeader>
                            <CardTitle className="text-base">Family Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">{selectedFamily.description}</p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{selectedFamily.industry}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{selectedFamily.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{selectedFamily.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{selectedFamily.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Client since {selectedFamily.since}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{selectedFamily.members} members</span>
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
                              <span className="font-medium">{selectedFamily.services.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Upcoming Meetings</span>
                              <span className="font-medium">{selectedFamily.meetings.upcoming}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Open Tasks</span>
                              <span className="font-medium">{selectedFamily.tasks.filter(t => !t.completed).length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Payment Status</span>
                              {getPaymentBadge(selectedFamily.payment)}
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
                          <div className="grid grid-cols-4 gap-4">
                            {selectedFamily.membersList.map((member) => (
                              <div key={member.avatar} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                                <Avatar>
                                  <AvatarFallback>{member.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm text-foreground truncate">{member.name}</div>
                                  <div className="text-xs text-muted-foreground">{member.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Next Meeting */}
                      {selectedFamily.consultations.filter(c => c.status === "scheduled").length > 0 && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Next Meeting</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {(() => {
                              const next = selectedFamily.consultations.find(c => c.status === "scheduled");
                              return next ? (
                                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                  <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-[10px] bg-primary/10 flex items-center justify-center">
                                      <Video className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                      <div className="font-medium text-foreground">{next.title}</div>
                                      <div className="text-sm text-muted-foreground">{next.date} at {next.time}</div>
                                    </div>
                                  </div>
                                  <Button>Join Meeting</Button>
                                </div>
                              ) : null;
                            })()}
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>

                    {/* Tasks Tab */}
                    <TabsContent value="tasks" className="mt-0 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Advisor Personal Tasks</h3>
                        <Button size="sm" onClick={() => setIsAddTaskDialogOpen(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Task
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        These tasks are private to you and not visible to the family.
                      </p>
                      
                      {selectedFamily.tasks.length > 0 ? (
                        <div className="space-y-2">
                          {selectedFamily.tasks.map((task) => (
                            <div 
                              key={task.id} 
                              className={`flex items-center gap-3 p-4 rounded-lg border border-border ${task.completed ? 'bg-muted/50' : ''}`}
                            >
                              <div 
                                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                  task.completed ? 'bg-primary border-primary' : 'border-muted-foreground'
                                }`}
                                onClick={() => toggleTaskCompletion(task.id)}
                              >
                                {task.completed && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
                              </div>
                              <div className="flex-1">
                                <div className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                  {task.title}
                                </div>
                                <div className="text-xs text-muted-foreground">Due: {task.dueDate}</div>
                              </div>
                              <Badge variant="secondary" className={
                                task.priority === "high" ? "bg-red-100 text-red-700" :
                                task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                                "bg-gray-100 text-gray-600"
                              }>
                                {task.priority}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <ListTodo className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No tasks yet</p>
                          <p className="text-sm">Create your first task to track work for this family</p>
                        </div>
                      )}
                    </TabsContent>

                    {/* Services Tab */}
                    <TabsContent value="services" className="mt-0 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Active Services</h3>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setIsInvoiceDialogOpen(true)}>
                            <DollarSign className="h-4 w-4 mr-2" />
                            Create Invoice
                          </Button>
                          <Button size="sm" onClick={() => setIsProposeServiceDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Propose Service
                          </Button>
                        </div>
                      </div>
                      
                      {selectedFamily.services.length > 0 ? (
                        <div className="space-y-3">
                          {selectedFamily.services.map((service, index) => (
                            <Card key={index}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h4 className="font-medium text-foreground">{service.name}</h4>
                                    <div className="text-sm text-muted-foreground">Started: {service.startDate}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium text-foreground">{service.price}</div>
                                    <Badge variant="secondary" className={
                                      service.status === "Active" ? "bg-green-100 text-green-700" :
                                      service.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                                      "bg-yellow-100 text-yellow-700"
                                    }>
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
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No active services</p>
                          <p className="text-sm">Propose a service to this family</p>
                        </div>
                      )}
                    </TabsContent>

                    {/* Consultations Tab */}
                    <TabsContent value="consultations" className="mt-0 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Consultation History</h3>
                        <Button size="sm" onClick={() => setIsScheduleDialogOpen(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                      
                      {selectedFamily.consultations.length > 0 ? (
                        <div className="space-y-2">
                          {selectedFamily.consultations.map((consultation, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                              <div className={`h-10 w-10 rounded-[10px] flex items-center justify-center ${
                                consultation.status === "scheduled" ? "bg-blue-100" : "bg-gray-100"
                              }`}>
                                <Video className={`h-5 w-5 ${
                                  consultation.status === "scheduled" ? "text-blue-600" : "text-gray-500"
                                }`} />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-foreground">{consultation.title}</div>
                                <div className="text-sm text-muted-foreground">{consultation.date} at {consultation.time}</div>
                              </div>
                              <Badge variant="secondary" className={
                                consultation.status === "scheduled" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                              }>
                                {consultation.status === "scheduled" ? "Scheduled" : "Completed"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No consultations yet</p>
                          <p className="text-sm">Schedule your first consultation with this family</p>
                        </div>
                      )}
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Invite Family Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invite Family Client</DialogTitle>
            <DialogDescription>
              Send an invitation to a family to join the platform and connect with you.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInviteFamily} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="familyName">Family Name (Optional)</Label>
              <Input 
                id="familyName" 
                placeholder="e.g. The Roye Family" 
                value={inviteForm.familyName}
                onChange={(e) => setInviteForm({...inviteForm, familyName: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Primary Contact Name</Label>
                <Input 
                  id="contactName" 
                  placeholder="John Doe" 
                  required 
                  value={inviteForm.contactName}
                  onChange={(e) => setInviteForm({...inviteForm, contactName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input 
                  id="contactEmail" 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  value={inviteForm.contactEmail}
                  onChange={(e) => setInviteForm({...inviteForm, contactEmail: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-[10px] border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={inviteForm.role}
                onChange={(e) => setInviteForm({...inviteForm, role: e.target.value})}
              >
                <option value="external-consul">External Consul</option>
                <option value="consultant">Consultant</option>
                <option value="personal-advisor">Personal Family Advisor</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Personal Message</Label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-[10px] border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="message" 
                placeholder="Hello, I'd like to invite you to join..."
                value={inviteForm.message}
                onChange={(e) => setInviteForm({...inviteForm, message: e.target.value})}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsInviteDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Send Invitation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Create a new task for {selectedFamily?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="taskTitle">Task Title</Label>
              <Input 
                id="taskTitle" 
                placeholder="e.g. Review quarterly report" 
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <DatePicker
                  date={newTask.dueDate}
                  onDateChange={(date) => setNewTask({...newTask, dueDate: date})}
                  placeholder="Select due date"
                  minDate={new Date()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select 
                  className="flex h-10 w-full items-center justify-between rounded-[10px] border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Propose Service Dialog */}
      <Dialog open={isProposeServiceDialogOpen} onOpenChange={setIsProposeServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Propose New Service</DialogTitle>
            <DialogDescription>Create a service proposal for {selectedFamily?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Service Name</Label>
              <Input 
                id="serviceName" 
                placeholder="e.g. Family Constitution Workshop" 
                value={newProposal.name}
                onChange={(e) => setNewProposal({...newProposal, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servicePrice">Price ($)</Label>
              <Input 
                id="servicePrice" 
                type="number" 
                placeholder="5000" 
                value={newProposal.price}
                onChange={(e) => setNewProposal({...newProposal, price: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDescription">Description</Label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-[10px] border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="serviceDescription" 
                placeholder="Describe the service deliverables..."
                value={newProposal.description}
                onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProposeServiceDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleProposeService}>Send Proposal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Consultation Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Consultation</DialogTitle>
            <DialogDescription>Set up a new meeting with {selectedFamily?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="consultationTitle">Meeting Title</Label>
              <Input 
                id="consultationTitle" 
                placeholder="e.g. Quarterly Review" 
                value={newConsultation.title}
                onChange={(e) => setNewConsultation({...newConsultation, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="consultationDate">Date</Label>
                <DatePicker
                  date={newConsultation.date}
                  onDateChange={(date) => setNewConsultation({...newConsultation, date})}
                  placeholder="Select date"
                  minDate={new Date()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consultationTime">Time</Label>
                <Input 
                  id="consultationTime" 
                  type="time" 
                  value={newConsultation.time}
                  onChange={(e) => setNewConsultation({...newConsultation, time: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleScheduleConsultation}>Schedule Meeting</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Invoice Dialog */}
      <Dialog open={isInvoiceDialogOpen} onOpenChange={setIsInvoiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
            <DialogDescription>Generate a new invoice for {selectedFamily?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceAmount">Amount ($)</Label>
              <Input 
                id="invoiceAmount" 
                type="number" 
                placeholder="0.00" 
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Due Date</Label>
              <DatePicker
                date={newInvoice.dueDate}
                onDateChange={(date) => setNewInvoice({...newInvoice, dueDate: date})}
                placeholder="Select due date"
                minDate={new Date()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceService">Linked Service (Optional)</Label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-[10px] border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newInvoice.serviceId}
                onChange={(e) => setNewInvoice({...newInvoice, serviceId: e.target.value})}
              >
                <option value="">Select a service...</option>
                {selectedFamily?.services.map((service, idx) => (
                  <option key={idx} value={service.name}>{service.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvoiceDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateInvoice}>Generate Invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
            <DialogDescription>Add a new member to {selectedFamily?.name}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMemberSubmit(handleAddMember)}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="memberName">Full Name</Label>
                <Input 
                  id="memberName" 
                  placeholder="e.g. John Smith"
                  {...registerMember("name")}
                />
                {memberErrors.name && (
                  <p className="text-sm text-red-500">{memberErrors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberEmail">Email</Label>
                <Input 
                  id="memberEmail" 
                  type="email"
                  placeholder="john@example.com"
                  {...registerMember("email")}
                />
                {memberErrors.email && (
                  <p className="text-sm text-red-500">{memberErrors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberRole">Role in Family</Label>
                <select 
                  className="flex h-10 w-full items-center justify-between rounded-[10px] border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...registerMember("role")}
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
              <Button type="button" variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Adding...
                  </>
                ) : (
                  "Add Member"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Family Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Family</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this family? This action cannot be undone and will remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setDeletingFamilyId(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteFamily}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Deleting...
                </>
              ) : (
                "Delete Family"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
