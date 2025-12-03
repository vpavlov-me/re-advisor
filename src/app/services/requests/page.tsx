"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import {
  Home,
  ChevronRight,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Users,
  Eye,
  MessageSquare,
  MoreVertical,
  ChevronDown,
  ChevronLeft,
  Loader2,
  FileText,
  Plus,
  Check,
  X,
  Timer,
  Package,
  Crown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
type ServiceRequestStatus = 
  | "pending_consultant"
  | "awaiting_family_approval"
  | "in_progress"
  | "delivered"
  | "completed_paid"
  | "declined_consultant"
  | "declined_family"
  | "cancelled";

type ServiceRequest = {
  id: number;
  request_number: string;
  family_id: number;
  family_name: string;
  family_email?: string;
  consultant_id: string;
  original_service_id: number | null;
  original_service_name: string;
  status: ServiceRequestStatus;
  family_notes: string | null;
  consultant_comment: string | null;
  decline_reason: string | null;
  original_amount: number;
  additional_amount: number;
  total_amount: number;
  estimated_timeline: string | null;
  booked_at: string;
  consultant_response_deadline: string;
  consultant_confirmed_at: string | null;
  family_approved_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  paid_at: string | null;
  items: ServiceRequestItem[];
  deliverables: ServiceDeliverable[];
};

type ServiceRequestItem = {
  id: number;
  service_request_id: number;
  service_id: number | null;
  service_name: string;
  service_description: string | null;
  price_at_booking: number;
  is_original: boolean;
  added_by: "family" | "consultant";
};

type ServiceDeliverable = {
  id: number;
  service_request_id: number;
  title: string;
  description: string | null;
  external_link: string;
  uploaded_at: string;
};

type ConsultantService = {
  id: number;
  name: string;
  description: string;
  price: string;
  price_amount: number;
};

// Status configuration
const statusConfig: Record<ServiceRequestStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending_consultant: { 
    label: "Pending Your Review", 
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300", 
    icon: Clock 
  },
  awaiting_family_approval: { 
    label: "Awaiting Family Approval", 
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", 
    icon: Timer 
  },
  in_progress: { 
    label: "In Progress", 
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300", 
    icon: Loader2 
  },
  delivered: { 
    label: "Delivered", 
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300", 
    icon: Package 
  },
  completed_paid: { 
    label: "Completed & Paid", 
    color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", 
    icon: CheckCircle 
  },
  declined_consultant: { 
    label: "Declined", 
    color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", 
    icon: XCircle 
  },
  declined_family: { 
    label: "Family Declined", 
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300", 
    icon: XCircle 
  },
  cancelled: { 
    label: "Cancelled", 
    color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400", 
    icon: AlertCircle 
  },
};

const declineReasons = [
  { value: "outside_expertise", label: "Outside my expertise" },
  { value: "unavailable", label: "Not available for this timeline" },
  { value: "scope_mismatch", label: "Scope doesn't match my services" },
  { value: "other", label: "Other" },
];

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Helper to calculate time remaining
const getTimeRemaining = (deadline: string) => {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) return { expired: true, text: "Expired" };
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return { expired: false, text: `${days}d ${hours % 24}h left` };
  }
  
  return { expired: false, text: `${hours}h ${minutes}m left` };
};

export default function ServiceRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [consultantServices, setConsultantServices] = useState<ConsultantService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  
  // Dialog states
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
  const [isDeliverableDialogOpen, setIsDeliverableDialogOpen] = useState(false);
  
  // Form states
  const [acceptForm, setAcceptForm] = useState({
    additionalServices: [] as number[],
    comment: "",
    estimatedTimeline: "",
  });
  const [declineForm, setDeclineForm] = useState({
    reason: "",
    otherReason: "",
  });
  const [deliverableForm, setDeliverableForm] = useState({
    title: "",
    description: "",
    externalLink: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch service requests
  const fetchRequests = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // For now, use mock data since tables might not exist yet
      // In production, this would fetch from service_requests table
      const mockRequests: ServiceRequest[] = [
        {
          id: 1,
          request_number: "SR-20251203-1-001",
          family_id: 1,
          family_name: "The Anderson Family",
          family_email: "anderson@example.com",
          consultant_id: user.id,
          original_service_id: 1,
          original_service_name: "Family Governance Workshop",
          status: "pending_consultant",
          family_notes: "We're looking to establish our first family constitution. Would prefer sessions in the afternoon if possible.",
          consultant_comment: null,
          decline_reason: null,
          original_amount: 5000,
          additional_amount: 0,
          total_amount: 5000,
          estimated_timeline: null,
          booked_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          consultant_response_deadline: new Date(Date.now() + 46 * 60 * 60 * 1000).toISOString(), // 46 hours from now
          consultant_confirmed_at: null,
          family_approved_at: null,
          started_at: null,
          completed_at: null,
          paid_at: null,
          items: [
            {
              id: 1,
              service_request_id: 1,
              service_id: 1,
              service_name: "Family Governance Workshop",
              service_description: "Comprehensive workshop to establish family governance framework",
              price_at_booking: 5000,
              is_original: true,
              added_by: "family",
            },
          ],
          deliverables: [],
        },
        {
          id: 2,
          request_number: "SR-20251201-2-001",
          family_id: 2,
          family_name: "The Williams Family",
          family_email: "williams@example.com",
          consultant_id: user.id,
          original_service_id: 2,
          original_service_name: "Succession Planning",
          status: "in_progress",
          family_notes: "Need help with business succession planning for our manufacturing company.",
          consultant_comment: "Based on your notes, I recommend adding a mediation session to address any potential family conflicts during the planning process.",
          decline_reason: null,
          original_amount: 8000,
          additional_amount: 2000,
          total_amount: 10000,
          estimated_timeline: "4-6 weeks",
          booked_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          consultant_response_deadline: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          consultant_confirmed_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          family_approved_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          started_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          completed_at: null,
          paid_at: null,
          items: [
            {
              id: 2,
              service_request_id: 2,
              service_id: 2,
              service_name: "Succession Planning",
              service_description: "Strategic business succession planning",
              price_at_booking: 8000,
              is_original: true,
              added_by: "family",
            },
            {
              id: 3,
              service_request_id: 2,
              service_id: 3,
              service_name: "Mediation Session",
              service_description: "Family conflict resolution session",
              price_at_booking: 2000,
              is_original: false,
              added_by: "consultant",
            },
          ],
          deliverables: [],
        },
        {
          id: 3,
          request_number: "SR-20251128-3-001",
          family_id: 3,
          family_name: "The Chen Family",
          family_email: "chen@example.com",
          consultant_id: user.id,
          original_service_id: 3,
          original_service_name: "Next Generation Education",
          status: "delivered",
          family_notes: "We have three children aged 18-25 who need financial literacy education.",
          consultant_comment: null,
          decline_reason: null,
          original_amount: 3500,
          additional_amount: 0,
          total_amount: 3500,
          estimated_timeline: "3 weeks",
          booked_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          consultant_response_deadline: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
          consultant_confirmed_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
          family_approved_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          started_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          completed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          paid_at: null,
          items: [
            {
              id: 4,
              service_request_id: 3,
              service_id: 3,
              service_name: "Next Generation Education",
              service_description: "Financial literacy program for heirs",
              price_at_booking: 3500,
              is_original: true,
              added_by: "family",
            },
          ],
          deliverables: [
            {
              id: 1,
              service_request_id: 3,
              title: "Financial Literacy Curriculum",
              description: "Complete curriculum for the 3-week program",
              external_link: "https://docs.google.com/document/d/example1",
              uploaded_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: 2,
              service_request_id: 3,
              title: "Assessment Reports",
              description: "Individual assessment for each participant",
              external_link: "https://docs.google.com/document/d/example2",
              uploaded_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ],
        },
        {
          id: 4,
          request_number: "SR-20251115-4-001",
          family_id: 4,
          family_name: "The Martinez Family",
          family_email: "martinez@example.com",
          consultant_id: user.id,
          original_service_id: 1,
          original_service_name: "Family Governance Workshop",
          status: "completed_paid",
          family_notes: null,
          consultant_comment: null,
          decline_reason: null,
          original_amount: 5000,
          additional_amount: 0,
          total_amount: 5000,
          estimated_timeline: "2 weeks",
          booked_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          consultant_response_deadline: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
          consultant_confirmed_at: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
          family_approved_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
          started_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
          completed_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          paid_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 5,
              service_request_id: 4,
              service_id: 1,
              service_name: "Family Governance Workshop",
              service_description: "Comprehensive workshop to establish family governance framework",
              price_at_booking: 5000,
              is_original: true,
              added_by: "family",
            },
          ],
          deliverables: [
            {
              id: 3,
              service_request_id: 4,
              title: "Family Constitution Draft",
              description: "Complete draft of family constitution",
              external_link: "https://docs.google.com/document/d/example3",
              uploaded_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ],
        },
      ];

      setRequests(mockRequests);

      // Fetch consultant's services for adding to requests
      const { data: servicesData } = await supabase
        .from("services")
        .select("id, name, description, price, price_amount")
        .eq("advisor_id", user.id)
        .eq("status", "active");

      if (servicesData) {
        setConsultantServices(
          servicesData.map((s: any) => ({
            id: s.id,
            name: s.name,
            description: s.description || "",
            price: s.price || "$0",
            price_amount: s.price_amount || 0,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load service requests");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Filter requests by tab
  const getFilteredRequests = () => {
    let filtered = requests;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.family_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.request_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.original_service_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply tab filter
    switch (activeTab) {
      case "pending":
        return filtered.filter((r) => r.status === "pending_consultant");
      case "active":
        return filtered.filter((r) =>
          ["awaiting_family_approval", "in_progress", "delivered"].includes(r.status)
        );
      case "completed":
        return filtered.filter((r) => r.status === "completed_paid");
      case "declined":
        return filtered.filter((r) =>
          ["declined_consultant", "declined_family", "cancelled"].includes(r.status)
        );
      default:
        return filtered;
    }
  };

  const filteredRequests = getFilteredRequests();

  // Stats
  const stats = [
    {
      label: "Pending Review",
      value: requests.filter((r) => r.status === "pending_consultant").length,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      label: "Active Services",
      value: requests.filter((r) =>
        ["awaiting_family_approval", "in_progress", "delivered"].includes(r.status)
      ).length,
      icon: Loader2,
      color: "text-purple-600",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(
        requests
          .filter((r) => r.status === "completed_paid")
          .reduce((sum, r) => sum + r.total_amount, 0)
      ),
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "Completion Rate",
      value:
        requests.length > 0
          ? `${Math.round(
              (requests.filter((r) => r.status === "completed_paid").length /
                requests.filter((r) => !["pending_consultant"].includes(r.status)).length) *
                100
            ) || 0}%`
          : "0%",
      icon: CheckCircle,
      color: "text-blue-600",
    },
  ];

  // Handle accept request
  const handleAcceptRequest = async () => {
    if (!selectedRequest) return;
    setIsSubmitting(true);

    try {
      // Calculate new total with additional services
      const additionalAmount = acceptForm.additionalServices.reduce((sum, serviceId) => {
        const service = consultantServices.find((s) => s.id === serviceId);
        return sum + (service?.price_amount || 0);
      }, 0);

      // In production, update the service_request in Supabase
      // For now, update local state
      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id
            ? {
                ...r,
                status: "awaiting_family_approval" as ServiceRequestStatus,
                consultant_comment: acceptForm.comment || null,
                estimated_timeline: acceptForm.estimatedTimeline || null,
                additional_amount: additionalAmount,
                total_amount: r.original_amount + additionalAmount,
                consultant_confirmed_at: new Date().toISOString(),
                items: [
                  ...r.items,
                  ...acceptForm.additionalServices.map((serviceId, idx) => {
                    const service = consultantServices.find((s) => s.id === serviceId)!;
                    return {
                      id: Date.now() + idx,
                      service_request_id: r.id,
                      service_id: serviceId,
                      service_name: service.name,
                      service_description: service.description,
                      price_at_booking: service.price_amount,
                      is_original: false,
                      added_by: "consultant" as const,
                    };
                  }),
                ],
              }
            : r
        )
      );

      toast.success(
        acceptForm.additionalServices.length > 0
          ? "Request accepted with additional services"
          : "Request accepted"
      );
      setIsAcceptDialogOpen(false);
      setIsDetailSheetOpen(false);
      setAcceptForm({ additionalServices: [], comment: "", estimatedTimeline: "" });
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Failed to accept request");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle decline request
  const handleDeclineRequest = async () => {
    if (!selectedRequest) return;
    setIsSubmitting(true);

    try {
      const reason =
        declineForm.reason === "other" ? declineForm.otherReason : declineForm.reason;

      // In production, update the service_request in Supabase
      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id
            ? {
                ...r,
                status: "declined_consultant" as ServiceRequestStatus,
                decline_reason: reason,
              }
            : r
        )
      );

      toast.success("Request declined");
      setIsDeclineDialogOpen(false);
      setIsDetailSheetOpen(false);
      setDeclineForm({ reason: "", otherReason: "" });
    } catch (error) {
      console.error("Error declining request:", error);
      toast.error("Failed to decline request");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle mark complete
  const handleMarkComplete = async (request: ServiceRequest) => {
    setIsSubmitting(true);

    try {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === request.id
            ? {
                ...r,
                status: "delivered" as ServiceRequestStatus,
                completed_at: new Date().toISOString(),
              }
            : r
        )
      );

      toast.success("Service marked as delivered");
      setIsDetailSheetOpen(false);
    } catch (error) {
      console.error("Error marking complete:", error);
      toast.error("Failed to mark as complete");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle add deliverable
  const handleAddDeliverable = async () => {
    if (!selectedRequest) return;
    setIsSubmitting(true);

    try {
      const newDeliverable: ServiceDeliverable = {
        id: Date.now(),
        service_request_id: selectedRequest.id,
        title: deliverableForm.title,
        description: deliverableForm.description || null,
        external_link: deliverableForm.externalLink,
        uploaded_at: new Date().toISOString(),
      };

      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id
            ? { ...r, deliverables: [...r.deliverables, newDeliverable] }
            : r
        )
      );

      toast.success("Deliverable added");
      setIsDeliverableDialogOpen(false);
      setDeliverableForm({ title: "", description: "", externalLink: "" });
    } catch (error) {
      console.error("Error adding deliverable:", error);
      toast.error("Failed to add deliverable");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open detail sheet
  const openDetailSheet = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setIsDetailSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Families & Services</span>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-card border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-1 -mb-px">
            <a
              href="/families"
              className="relative h-12 px-4 inline-flex items-center rounded-none border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border transition-colors"
            >
              <Users className="h-4 w-4 mr-2" />
              Family Clients
            </a>
            <a
              href="/services"
              className="relative h-12 px-4 inline-flex items-center rounded-none border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border transition-colors"
            >
              <Crown className="h-4 w-4 mr-2" />
              My Services
            </a>
            <span
              className="relative h-12 px-4 inline-flex items-center rounded-none border-b-2 border-primary text-primary font-medium"
            >
              <FileText className="h-4 w-4 mr-2" />
              Service Requests
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Service Requests</h1>
            <p className="text-muted-foreground mt-1">
              Manage incoming service requests from families
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div className={`h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs & Search */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="pending" className="gap-2">
                    <Clock className="h-4 w-4" />
                    Pending ({requests.filter((r) => r.status === "pending_consultant").length})
                  </TabsTrigger>
                  <TabsTrigger value="active" className="gap-2">
                    <Loader2 className="h-4 w-4" />
                    Active ({requests.filter((r) => ["awaiting_family_approval", "in_progress", "delivered"].includes(r.status)).length})
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Completed ({requests.filter((r) => r.status === "completed_paid").length})
                  </TabsTrigger>
                  <TabsTrigger value="declined" className="gap-2">
                    <XCircle className="h-4 w-4" />
                    Declined
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  className="pl-9 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">No requests found</h3>
                <p className="text-muted-foreground">
                  {activeTab === "pending"
                    ? "No pending requests at the moment"
                    : searchQuery
                    ? "Try a different search term"
                    : "No requests in this category"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request) => {
                  const statusInfo = statusConfig[request.status];
                  const StatusIcon = statusInfo.icon;
                  const timeRemaining =
                    request.status === "pending_consultant"
                      ? getTimeRemaining(request.consultant_response_deadline)
                      : null;

                  return (
                    <Card
                      key={request.id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => openDetailSheet(request)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="text-sm bg-primary/10 text-primary">
                                {request.family_name
                                  .split(" ")
                                  .slice(1, 3)
                                  .map((w) => w[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-medium text-foreground">
                                  {request.family_name}
                                </h4>
                                <Badge variant="secondary" className={statusInfo.color}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {statusInfo.label}
                                </Badge>
                                {timeRemaining && !timeRemaining.expired && (
                                  <Badge
                                    variant="outline"
                                    className="text-yellow-600 border-yellow-300"
                                  >
                                    <Timer className="h-3 w-3 mr-1" />
                                    {timeRemaining.text}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {request.original_service_name}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">
                                  {formatCurrency(request.total_amount)}
                                </span>
                                <span>•</span>
                                <span>Booked {formatDate(request.booked_at)}</span>
                                <span>•</span>
                                <span>{request.request_number}</span>
                              </div>
                              {request.family_notes && (
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                                  "{request.family_notes}"
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {request.status === "pending_consultant" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRequest(request);
                                    setIsAcceptDialogOpen(true);
                                  }}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRequest(request);
                                    setIsDeclineDialogOpen(true);
                                  }}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Decline
                                </Button>
                              </>
                            )}
                            {request.status === "in_progress" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkComplete(request);
                                }}
                              >
                                <Package className="h-4 w-4 mr-1" />
                                Mark Delivered
                              </Button>
                            )}
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                openDetailSheet(request);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Sheet */}
      <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedRequest && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  {selectedRequest.request_number}
                  <Badge
                    variant="secondary"
                    className={statusConfig[selectedRequest.status].color}
                  >
                    {statusConfig[selectedRequest.status].label}
                  </Badge>
                </SheetTitle>
                <SheetDescription>
                  Booked on {formatDate(selectedRequest.booked_at)}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 py-6">
                {/* Family Info */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Family</h4>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {selectedRequest.family_name
                          .split(" ")
                          .slice(1, 3)
                          .map((w) => w[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedRequest.family_name}</p>
                      {selectedRequest.family_email && (
                        <p className="text-sm text-muted-foreground">
                          {selectedRequest.family_email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Response Deadline */}
                {selectedRequest.status === "pending_consultant" && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                      <Timer className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Response Required</p>
                        <p className="text-sm">
                          {getTimeRemaining(selectedRequest.consultant_response_deadline).text}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Services */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Services</h4>
                  {selectedRequest.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{item.service_name}</p>
                          {!item.is_original && (
                            <Badge variant="outline" className="text-xs">
                              Added by consultant
                            </Badge>
                          )}
                        </div>
                        {item.service_description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.service_description}
                          </p>
                        )}
                      </div>
                      <p className="font-semibold">{formatCurrency(item.price_at_booking)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t">
                    <p className="font-medium">Total</p>
                    <p className="font-semibold text-lg">
                      {formatCurrency(selectedRequest.total_amount)}
                    </p>
                  </div>
                </div>

                {/* Family Notes */}
                {selectedRequest.family_notes && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Family Notes</h4>
                    <p className="text-sm p-3 bg-muted/50 rounded-lg">
                      {selectedRequest.family_notes}
                    </p>
                  </div>
                )}

                {/* Consultant Comment */}
                {selectedRequest.consultant_comment && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Your Comment</h4>
                    <p className="text-sm p-3 bg-muted/50 rounded-lg">
                      {selectedRequest.consultant_comment}
                    </p>
                  </div>
                )}

                {/* Timeline */}
                {selectedRequest.estimated_timeline && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Estimated Timeline
                    </h4>
                    <p className="text-sm">{selectedRequest.estimated_timeline}</p>
                  </div>
                )}

                {/* Deliverables */}
                {(selectedRequest.status === "in_progress" ||
                  selectedRequest.status === "delivered" ||
                  selectedRequest.status === "completed_paid") && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-muted-foreground">Deliverables</h4>
                      {selectedRequest.status === "in_progress" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsDeliverableDialogOpen(true)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Deliverable
                        </Button>
                      )}
                    </div>
                    {selectedRequest.deliverables.length === 0 ? (
                      <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
                        No deliverables added yet
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {selectedRequest.deliverables.map((d) => (
                          <a
                            key={d.id}
                            href={d.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                          >
                            <FileText className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <p className="font-medium hover:underline">{d.title}</p>
                              {d.description && (
                                <p className="text-sm text-muted-foreground">{d.description}</p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                Added {formatDate(d.uploaded_at)}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Decline Reason */}
                {selectedRequest.decline_reason && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Decline Reason</h4>
                    <p className="text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-400">
                      {selectedRequest.decline_reason}
                    </p>
                  </div>
                )}
              </div>

              <SheetFooter className="gap-2">
                {selectedRequest.status === "pending_consultant" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeclineDialogOpen(true)}
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                    <Button
                      onClick={() => setIsAcceptDialogOpen(true)}
                      className="flex-1"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept Request
                    </Button>
                  </>
                )}
                {selectedRequest.status === "in_progress" && (
                  <Button
                    onClick={() => handleMarkComplete(selectedRequest)}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Package className="h-4 w-4 mr-2" />
                    )}
                    Mark as Delivered
                  </Button>
                )}
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Accept Dialog */}
      <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Accept Service Request</DialogTitle>
            <DialogDescription>
              Review and accept this request. You can optionally add additional services.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Additional Services */}
            {consultantServices.length > 0 && (
              <div className="space-y-3">
                <Label>Add Additional Services (Optional)</Label>
                <p className="text-sm text-muted-foreground">
                  Select services to add to this request if needed
                </p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {consultantServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted"
                    >
                      <Checkbox
                        id={`service-${service.id}`}
                        checked={acceptForm.additionalServices.includes(service.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setAcceptForm((prev) => ({
                              ...prev,
                              additionalServices: [...prev.additionalServices, service.id],
                            }));
                          } else {
                            setAcceptForm((prev) => ({
                              ...prev,
                              additionalServices: prev.additionalServices.filter(
                                (id) => id !== service.id
                              ),
                            }));
                          }
                        }}
                      />
                      <label
                        htmlFor={`service-${service.id}`}
                        className="flex-1 flex justify-between cursor-pointer"
                      >
                        <span className="text-sm">{service.name}</span>
                        <span className="text-sm font-medium">{service.price}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comment */}
            {acceptForm.additionalServices.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="comment">Explanation for Additional Services *</Label>
                <Textarea
                  id="comment"
                  placeholder="Explain why these additional services are recommended..."
                  value={acceptForm.comment}
                  onChange={(e) =>
                    setAcceptForm((prev) => ({ ...prev, comment: e.target.value }))
                  }
                  className="min-h-[80px]"
                />
              </div>
            )}

            {/* Timeline */}
            <div className="space-y-2">
              <Label htmlFor="timeline">Estimated Timeline (Optional)</Label>
              <Input
                id="timeline"
                placeholder="e.g., 2-3 weeks"
                value={acceptForm.estimatedTimeline}
                onChange={(e) =>
                  setAcceptForm((prev) => ({ ...prev, estimatedTimeline: e.target.value }))
                }
              />
            </div>

            {/* Price Summary */}
            {selectedRequest && (
              <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Original Service</span>
                  <span>{formatCurrency(selectedRequest.original_amount)}</span>
                </div>
                {acceptForm.additionalServices.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Additional Services</span>
                    <span>
                      {formatCurrency(
                        acceptForm.additionalServices.reduce((sum, id) => {
                          const service = consultantServices.find((s) => s.id === id);
                          return sum + (service?.price_amount || 0);
                        }, 0)
                      )}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>
                    {formatCurrency(
                      selectedRequest.original_amount +
                        acceptForm.additionalServices.reduce((sum, id) => {
                          const service = consultantServices.find((s) => s.id === id);
                          return sum + (service?.price_amount || 0);
                        }, 0)
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAcceptDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAcceptRequest}
              disabled={
                isSubmitting ||
                (acceptForm.additionalServices.length > 0 && !acceptForm.comment.trim())
              }
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              {acceptForm.additionalServices.length > 0
                ? "Accept with Additional Services"
                : "Accept Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Decline Dialog */}
      <Dialog open={isDeclineDialogOpen} onOpenChange={setIsDeclineDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Service Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for declining this request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Declining *</Label>
              <Select
                value={declineForm.reason}
                onValueChange={(value) =>
                  setDeclineForm((prev) => ({ ...prev, reason: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {declineReasons.map((reason) => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {declineForm.reason === "other" && (
              <div className="space-y-2">
                <Label htmlFor="otherReason">Please specify *</Label>
                <Textarea
                  id="otherReason"
                  placeholder="Provide details..."
                  value={declineForm.otherReason}
                  onChange={(e) =>
                    setDeclineForm((prev) => ({ ...prev, otherReason: e.target.value }))
                  }
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeclineDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeclineRequest}
              disabled={
                isSubmitting ||
                !declineForm.reason ||
                (declineForm.reason === "other" && !declineForm.otherReason.trim())
              }
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <X className="h-4 w-4 mr-2" />
              )}
              Decline Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Deliverable Dialog */}
      <Dialog open={isDeliverableDialogOpen} onOpenChange={setIsDeliverableDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Deliverable</DialogTitle>
            <DialogDescription>
              Add a link to your deliverable (Google Docs, Dropbox, etc.)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="deliverableTitle">Title *</Label>
              <Input
                id="deliverableTitle"
                placeholder="e.g., Family Constitution Draft"
                value={deliverableForm.title}
                onChange={(e) =>
                  setDeliverableForm((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliverableLink">External Link *</Label>
              <Input
                id="deliverableLink"
                type="url"
                placeholder="https://docs.google.com/..."
                value={deliverableForm.externalLink}
                onChange={(e) =>
                  setDeliverableForm((prev) => ({ ...prev, externalLink: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliverableDescription">Description (Optional)</Label>
              <Textarea
                id="deliverableDescription"
                placeholder="Brief description of this deliverable..."
                value={deliverableForm.description}
                onChange={(e) =>
                  setDeliverableForm((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeliverableDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddDeliverable}
              disabled={
                isSubmitting ||
                !deliverableForm.title.trim() ||
                !deliverableForm.externalLink.trim()
              }
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Add Deliverable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
