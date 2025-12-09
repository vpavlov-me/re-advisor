"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getServiceRequests,
  type ServiceRequest,
  type ServiceRequestStatus,
  type ServiceRequestItem,
  type ServiceDeliverable,
  type ConsultantService
} from "@/lib/supabase";
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
  Crown,
  ExternalLink
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
import { StatusBadge } from "@/components/ui/status-badge";
import { Spinner } from "@/components/ui/spinner";
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

// Status configuration - maps to StatusBadge and provides icons
const statusConfig = {
  pending_consultant: {
    status: "pending-consultant" as const,
    label: "Pending Your Review",
    icon: Clock
  },
  awaiting_family_approval: {
    status: "awaiting-family-approval" as const,
    label: "Awaiting Family Approval",
    icon: Timer
  },
  in_progress: {
    status: "in-progress" as const,
    label: "In Progress",
    icon: Loader2
  },
  delivered: {
    status: "delivered" as const,
    label: "Delivered",
    icon: Package
  },
  completed_paid: {
    status: "completed-paid" as const,
    label: "Completed & Paid",
    icon: CheckCircle
  },
  declined_consultant: {
    status: "declined-consultant" as const,
    label: "Declined",
    icon: XCircle
  },
  declined_family: {
    status: "declined-family" as const,
    label: "Family Declined",
    icon: XCircle
  },
  cancelled: {
    status: "cancelled" as const,
    label: "Cancelled",
    icon: AlertCircle
  },
} satisfies Record<ServiceRequestStatus, { status: string; label: string; icon: React.ElementType }>;

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
const getTimeRemaining = (deadline?: string) => {
  if (!deadline) return { expired: true, text: "No deadline" };
  
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
      const { requests: fetchedRequests, consultantServices: fetchedServices } = await getServiceRequests();
      
      setRequests(fetchedRequests);
      setConsultantServices(fetchedServices);
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
                consultant_comment: acceptForm.comment || undefined,
                estimated_timeline: acceptForm.estimatedTimeline || undefined,
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
        description: deliverableForm.description || undefined,
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
    <div className="min-h-screen bg-page-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Services</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="container py-6">
        <h1 className="text-3xl font-bold">Services</h1>
      </div>

      {/* Sub Navigation */}
      <div className="bg-card border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-1 -mb-px">
            <Link
              href="/services"
              className="relative h-12 px-4 inline-flex items-center rounded-none border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border transition-colors"
            >
              <Crown className="h-4 w-4 mr-2" />
              My Services
            </Link>
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
                    <Spinner size="sm" />
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
                <Spinner size="lg" className="text-primary" />
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
                                <StatusBadge
                                  status={statusInfo.status}
                                  label={statusInfo.label}
                                />
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
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0">
          {selectedRequest && (
            <div className="flex flex-col h-full">
              {/* Header - Fixed */}
              <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-semibold">{selectedRequest.request_number}</h2>
                      <StatusBadge
                        status={statusConfig[selectedRequest.status].status}
                        label={statusConfig[selectedRequest.status].label}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Booked on {formatDate(selectedRequest.booked_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {/* Response Deadline Alert */}
                {selectedRequest.status === "pending_consultant" && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                        <Timer className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <p className="font-medium text-yellow-800 dark:text-yellow-200">Response Required</p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-0.5">
                          {getTimeRemaining(selectedRequest.consultant_response_deadline).text} remaining to respond
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Family Card */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Family</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
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
                  </CardContent>
                </Card>

                {/* Services Card */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Services</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {selectedRequest.items.map((item, index) => (
                      <div
                        key={item.id}
                        className={`flex items-start justify-between gap-4 ${
                          index !== selectedRequest.items.length - 1 ? "pb-3 border-b" : ""
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium">{item.service_name}</p>
                            {!item.is_original && (
                              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                Added by consultant
                              </Badge>
                            )}
                          </div>
                          {item.service_description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {item.service_description}
                            </p>
                          )}
                        </div>
                        <p className="font-semibold text-right whitespace-nowrap">
                          {formatCurrency(item.price_at_booking)}
                        </p>
                      </div>
                    ))}
                    {/* Total */}
                    <div className="flex justify-between items-center pt-3 border-t-2">
                      <p className="font-semibold">Total</p>
                      <p className="font-bold text-xl text-primary">
                        {formatCurrency(selectedRequest.total_amount)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes Section */}
                {(selectedRequest.family_notes || selectedRequest.consultant_comment) && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Notes & Comments</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      {selectedRequest.family_notes && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                            Family Notes
                          </p>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-foreground leading-relaxed">
                              {selectedRequest.family_notes}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedRequest.consultant_comment && (
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                            Your Comment
                          </p>
                          <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                            <p className="text-sm text-foreground leading-relaxed">
                              {selectedRequest.consultant_comment}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Timeline Card */}
                {selectedRequest.estimated_timeline && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="font-medium">{selectedRequest.estimated_timeline}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Deliverables Card */}
                {(selectedRequest.status === "in_progress" ||
                  selectedRequest.status === "delivered" ||
                  selectedRequest.status === "completed_paid") && (
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Deliverables</CardTitle>
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
                    </CardHeader>
                    <CardContent className="pt-0">
                      {selectedRequest.deliverables.length === 0 ? (
                        <div className="text-center py-6 border-2 border-dashed rounded-lg">
                          <FileText className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                          <p className="text-sm text-muted-foreground">No deliverables added yet</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {selectedRequest.deliverables.map((d) => (
                            <a
                              key={d.id}
                              href={d.external_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-colors group"
                            >
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium group-hover:text-primary transition-colors">{d.title}</p>
                                {d.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-1">{d.description}</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                  Added {formatDate(d.uploaded_at)}
                                </p>
                              </div>
                              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                            </a>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Decline Reason Alert */}
                {selectedRequest.decline_reason && (
                  <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                        <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium text-red-800 dark:text-red-200">Decline Reason</p>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-0.5">
                          {selectedRequest.decline_reason}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions - Fixed */}
              <div className="sticky bottom-0 bg-background border-t px-6 py-4">
                <div className="flex gap-3">
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
                        <Spinner size="sm" className="mr-2" />
                      ) : (
                        <Package className="h-4 w-4 mr-2" />
                      )}
                      Mark as Delivered
                    </Button>
                  )}
                  {(selectedRequest.status !== "pending_consultant" && selectedRequest.status !== "in_progress") && (
                    <SheetClose asChild>
                      <Button variant="outline" className="flex-1">Close</Button>
                    </SheetClose>
                  )}
                </div>
              </div>
            </div>
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
                <Spinner size="sm" className="mr-2" />
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
                <Spinner size="sm" className="mr-2" />
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
                <Spinner size="sm" className="mr-2" />
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
