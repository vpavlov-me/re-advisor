"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
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
  Star,
  Building2,
  MapPin,
  Mail,
  Phone,
  FileText,
  Clock,
  X,
  Edit,
  MessageSquare,
  Video,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Eye,
  UserPlus,
  ListTodo,
  ChevronDown,
  ChevronLeft
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
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

// Advisor roles
type AdvisorRole = "external-consul" | "consultant" | "personal-advisor";

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

// Families data with extended info per Epic-013
const families: Family[] = [
  {
    id: 1,
    name: "Roye Family",
    members: 8,
    role: "personal-advisor" as AdvisorRole,
    meetings: { upcoming: 3, nextDate: "Jan 20" },
    payment: "pending" as const,
    status: "active" as const,
    lastContact: "2 hours ago",
    industry: "Media & Entertainment",
    location: "New York, NY",
    email: "contact@royefamily.com",
    phone: "+1 (212) 555-0123",
    since: "January 2023",
    description: "Multi-generational media conglomerate seeking governance restructuring and succession planning.",
    membersList: [
      { name: "Logan Roy", role: "Patriarch", avatar: "LR", email: "logan@royemedia.com" },
      { name: "Kendall Roy", role: "Eldest Son", avatar: "KR", email: "kendall@royemedia.com" },
      { name: "Siobhan Roy", role: "Daughter", avatar: "SR", email: "shiv@royemedia.com" },
      { name: "Roman Roy", role: "Youngest Son", avatar: "RR", email: "roman@royemedia.com" },
    ],
    tasks: [
      { id: 1, title: "Prepare succession proposal", dueDate: "Jan 25", priority: "high", completed: false },
      { id: 2, title: "Review constitution draft", dueDate: "Jan 22", priority: "medium", completed: true },
      { id: 3, title: "Schedule quarterly review", dueDate: "Jan 30", priority: "low", completed: false },
    ],
    services: [
      { name: "Family Constitution", status: "In Progress", progress: 65, price: "$8,500", startDate: "Oct 2024" },
      { name: "Succession Planning", status: "Scheduled", progress: 0, price: "$12,000", startDate: "Feb 2025" },
      { name: "Governance Advisory", status: "Active", progress: 40, price: "$4,000", startDate: "Nov 2024" },
    ],
    consultations: [
      { title: "Constitution Workshop", date: "Jan 20, 2025", time: "2:00 PM", status: "scheduled" },
      { title: "Family Assembly", date: "Jan 25, 2025", time: "10:00 AM", status: "scheduled" },
      { title: "Governance Review", date: "Dec 15, 2024", time: "3:00 PM", status: "completed" },
    ],
  },
  {
    id: 2,
    name: "Harrington Family",
    members: 12,
    role: "consultant" as AdvisorRole,
    meetings: { upcoming: 2, nextDate: "Jan 22" },
    payment: "paid" as const,
    status: "active" as const,
    lastContact: "1 day ago",
    industry: "Real Estate",
    location: "Los Angeles, CA",
    email: "info@harringtonfamily.com",
    phone: "+1 (310) 555-0456",
    since: "March 2022",
    description: "Established real estate family transitioning to next generation leadership.",
    membersList: [
      { name: "Clara Harrington", role: "Matriarch", avatar: "CH", email: "clara@harrington.com" },
      { name: "Oliver Harrington", role: "CEO", avatar: "OH", email: "oliver@harrington.com" },
      { name: "Emma Harrington", role: "CFO", avatar: "EH", email: "emma@harrington.com" },
    ],
    tasks: [
      { id: 1, title: "Finalize leadership transition plan", dueDate: "Jan 28", priority: "high", completed: false },
    ],
    services: [
      { name: "Leadership Transition", status: "In Progress", progress: 80, price: "$15,000", startDate: "Sep 2024" },
      { name: "Family Office Setup", status: "Active", progress: 55, price: "$20,000", startDate: "Oct 2024" },
    ],
    consultations: [
      { title: "Transition Review", date: "Jan 22, 2025", time: "11:00 AM", status: "scheduled" },
      { title: "Office Setup Call", date: "Jan 18, 2025", time: "4:00 PM", status: "completed" },
    ],
  },
  {
    id: 3,
    name: "Chen Family",
    members: 6,
    role: "external-consul" as AdvisorRole,
    meetings: { upcoming: 1, nextDate: "Jan 28" },
    payment: "pending" as const,
    status: "pending" as const,
    lastContact: "3 days ago",
    industry: "Technology",
    location: "San Francisco, CA",
    email: "chen@chenfamilyoffice.com",
    phone: "+1 (415) 555-0789",
    since: "August 2024",
    description: "Tech startup founders preparing for IPO and family wealth structuring.",
    membersList: [
      { name: "Wei Chen", role: "Founder", avatar: "WC", email: "wei@chen.tech" },
      { name: "Lin Chen", role: "Co-Founder", avatar: "LC", email: "lin@chen.tech" },
    ],
    tasks: [
      { id: 1, title: "Initial wealth assessment", dueDate: "Jan 30", priority: "medium", completed: false },
    ],
    services: [
      { name: "Wealth Structuring", status: "Pending", progress: 10, price: "$10,000", startDate: "Jan 2025" },
    ],
    consultations: [
      { title: "IPO Planning", date: "Jan 28, 2025", time: "9:00 AM", status: "scheduled" },
    ],
  },
  {
    id: 4,
    name: "Morrison Family",
    members: 4,
    role: "consultant" as AdvisorRole,
    meetings: { upcoming: 0, nextDate: null },
    payment: "paid" as const,
    status: "active" as const,
    lastContact: "1 week ago",
    industry: "Healthcare",
    location: "Boston, MA",
    email: "morrison@healthcare.com",
    phone: "+1 (617) 555-0321",
    since: "June 2024",
    description: "Healthcare professionals establishing family governance framework.",
    membersList: [
      { name: "Dr. James Morrison", role: "Patriarch", avatar: "JM", email: "james@morrison.med" },
      { name: "Dr. Sarah Morrison", role: "Matriarch", avatar: "SM", email: "sarah@morrison.med" },
    ],
    tasks: [],
    services: [
      { name: "Governance Framework", status: "Active", progress: 35, price: "$6,500", startDate: "Jul 2024" },
    ],
    consultations: [
      { title: "Framework Review", date: "Dec 20, 2024", time: "2:00 PM", status: "completed" },
    ],
  },
  {
    id: 5,
    name: "Blackwell Family",
    members: 15,
    role: "personal-advisor" as AdvisorRole,
    meetings: { upcoming: 5, nextDate: "Jan 18" },
    payment: "paid" as const,
    status: "active" as const,
    lastContact: "4 hours ago",
    industry: "Finance",
    location: "Chicago, IL",
    email: "office@blackwellfamily.com",
    phone: "+1 (312) 555-0654",
    since: "November 2021",
    description: "Multi-branch financial dynasty with complex governance needs.",
    membersList: [
      { name: "Richard Blackwell", role: "Chairman", avatar: "RB", email: "richard@blackwell.fin" },
      { name: "Victoria Blackwell", role: "Vice Chair", avatar: "VB", email: "victoria@blackwell.fin" },
      { name: "Thomas Blackwell", role: "Director", avatar: "TB", email: "thomas@blackwell.fin" },
      { name: "Elizabeth Blackwell", role: "Director", avatar: "EB", email: "elizabeth@blackwell.fin" },
    ],
    tasks: [
      { id: 1, title: "Quarterly trust review", dueDate: "Jan 20", priority: "high", completed: false },
      { id: 2, title: "Update philanthropy strategy", dueDate: "Feb 1", priority: "medium", completed: false },
    ],
    services: [
      { name: "Trust Management", status: "Active", progress: 90, price: "$25,000", startDate: "Dec 2021" },
      { name: "Next-Gen Education", status: "In Progress", progress: 60, price: "$12,000", startDate: "Mar 2024" },
      { name: "Philanthropy Strategy", status: "Active", progress: 45, price: "$8,000", startDate: "Jun 2024" },
      { name: "Investment Advisory", status: "Active", progress: 75, price: "$18,000", startDate: "Jan 2023" },
    ],
    consultations: [
      { title: "Trust Review", date: "Jan 18, 2025", time: "10:00 AM", status: "scheduled" },
      { title: "Investment Call", date: "Jan 19, 2025", time: "3:00 PM", status: "scheduled" },
      { title: "Philanthropy Workshop", date: "Dec 10, 2024", time: "1:00 PM", status: "completed" },
    ],
  },
  {
    id: 6,
    name: "Williams Family",
    members: 7,
    role: "external-consul" as AdvisorRole,
    meetings: { upcoming: 0, nextDate: null },
    payment: "no-invoices" as const,
    status: "inactive" as const,
    lastContact: "2 weeks ago",
    industry: "Manufacturing",
    location: "Detroit, MI",
    email: "williams@manufacturing.com",
    phone: "+1 (313) 555-0987",
    since: "September 2024",
    description: "Manufacturing family on temporary hold.",
    membersList: [
      { name: "Robert Williams", role: "CEO", avatar: "RW", email: "robert@williams.mfg" },
    ],
    tasks: [],
    services: [],
    consultations: [],
  },
];

// Stats
const stats = [
  { label: "Total Families", value: "6", icon: Users },
  { label: "Active Engagements", value: "5", icon: Briefcase },
  { label: "Upcoming Meetings", value: "11", icon: Calendar },
  { label: "Pending Payments", value: "2", icon: DollarSign },
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
  const [selectedFamily, setSelectedFamily] = useState<typeof families[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [workspaceTab, setWorkspaceTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [familiesList, setFamiliesList] = useState<Family[]>(families);

  useEffect(() => {
    const fetchFamilies = async () => {
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
    };

    fetchFamilies();
  }, []);

  // Invite Form State
  const [inviteForm, setInviteForm] = useState({
    familyName: "",
    contactName: "",
    contactEmail: "",
    role: "consultant",
    message: ""
  });

  // Task Form State
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: "",
    priority: "medium"
  });

  // Propose Service State
  const [isProposeServiceDialogOpen, setIsProposeServiceDialogOpen] = useState(false);
  const [newProposal, setNewProposal] = useState({
    name: "",
    price: "",
    description: ""
  });

  const handleProposeService = () => {
    if (!selectedFamily || !newProposal.name || !newProposal.price) return;

    const service = {
      name: newProposal.name,
      status: "Pending" as const,
      progress: 0,
      price: `$${newProposal.price}`,
      startDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    const updatedFamily = {
      ...selectedFamily,
      services: [service, ...selectedFamily.services]
    };

    setFamiliesList(familiesList.map(f => f.id === selectedFamily.id ? updatedFamily : f));
    setSelectedFamily(updatedFamily);
    setIsProposeServiceDialogOpen(false);
    setNewProposal({ name: "", price: "", description: "" });
  };

  // Schedule Consultation State
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [newConsultation, setNewConsultation] = useState({
    title: "",
    date: "",
    time: ""
  });

  const handleScheduleConsultation = () => {
    if (!selectedFamily || !newConsultation.title || !newConsultation.date) return;

    const consultation = {
      title: newConsultation.title,
      date: new Date(newConsultation.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: newConsultation.time || "10:00 AM",
      status: "scheduled" as const
    };

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
    setNewConsultation({ title: "", date: "", time: "" });
  };

  // Create Invoice State
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    serviceId: "",
    amount: "",
    dueDate: ""
  });

  const handleCreateInvoice = () => {
    if (!selectedFamily || !newInvoice.amount || !newInvoice.dueDate) return;
    
    // In a real app, this would create an invoice record.
    // For now, we'll just update the payment status of the family to "pending" if it wasn't already.
    
    const updatedFamily = {
      ...selectedFamily,
      payment: "pending" as const
    };

    setFamiliesList(familiesList.map(f => f.id === selectedFamily.id ? updatedFamily : f));
    setSelectedFamily(updatedFamily);
    setIsInvoiceDialogOpen(false);
    setNewInvoice({ serviceId: "", amount: "", dueDate: "" });
  };

  const handleInviteFamily = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFamily = {
      id: Math.max(...familiesList.map(f => f.id)) + 1,
      name: inviteForm.familyName || `${inviteForm.contactName}'s Family`,
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
  };

  const handleAddTask = () => {
    if (!selectedFamily || !newTask.title) return;

    const task = {
      id: Math.random(),
      title: newTask.title,
      dueDate: new Date(newTask.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
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
    setNewTask({ title: "", dueDate: "", priority: "medium" });
  };

  const toggleTaskCompletion = (taskId: number) => {
    if (!selectedFamily) return;

    const updatedTasks = selectedFamily.tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );

    const updatedFamily = { ...selectedFamily, tasks: updatedTasks };
    setFamiliesList(familiesList.map(f => f.id === selectedFamily.id ? updatedFamily : f));
    setSelectedFamily(updatedFamily);
  };
  const openFamilyWorkspace = (family: typeof families[0]) => {
    setSelectedFamily(family);
    setWorkspaceTab("overview");
    setIsDialogOpen(true);
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
          {stats.map((stat) => (
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
                    onClick={() => openFamilyWorkspace(family)}
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
                          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => openFamilyWorkspace(family)}>
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
                            <Button variant="outline" size="sm">
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
                <Input 
                  id="dueDate" 
                  type="date" 
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
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
                <Input 
                  id="consultationDate" 
                  type="date" 
                  value={newConsultation.date}
                  onChange={(e) => setNewConsultation({...newConsultation, date: e.target.value})}
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
              <Input 
                id="invoiceDate" 
                type="date" 
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
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
    </div>
  );
}
