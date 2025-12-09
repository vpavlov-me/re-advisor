"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { 
  Home, 
  ChevronRight, 
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Users,
  DollarSign,
  Clock,
  Star,
  Eye,
  Copy,
  TrendingUp,
  AlertCircle,
  Settings,
  Check,
  ChevronDown,
  FileText,
  Crown
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/status-badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getServices,
  createService,
  updateService,
  deleteService,
  duplicateService,
  type CreateServiceInput,
} from "@/lib/services";

// Constants
const SERVICE_CATEGORIES = ["Governance", "Planning", "Mediation", "Assessment", "Education", "Other"];
const PRICING_MODELS = ["Hourly Rate", "Fixed Package", "Monthly Retainer", "Per Session"];
const DURATIONS = ["30 min", "1 hour", "1.5 hours", "2 hours", "4 hours", "Full Day", "As needed"];

// Services data
const initialServices: Service[] = [];

type Service = {
  id: string | number;
  name: string;
  description: string;
  priceModel?: string;
  priceAmount?: string;
  price: string;
  duration: string;
  category: string;
  status: "active" | "draft" | "paused";
  activeClients: number;
  totalRevenue: string;
  rating: number;
  reviews: number;
};

// Map service status to StatusBadge status type
type ServiceStatus = "active" | "draft" | "paused";

const serviceStatusMap = {
  active: "active",
  draft: "inactive",
  paused: "pending",
} as const;

const serviceStatusLabels: Record<ServiceStatus, string> = {
  active: "Active",
  draft: "Draft",
  paused: "Paused",
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  // Global Policies State
  const [policies, setPolicies] = useState({
    noticePeriod: "48 hours",
    maxClients: "10"
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceModel: "Fixed Package",
    priceAmount: "",
    duration: "1 hour",
    category: "Governance",
    status: "draft" as "active" | "draft" | "paused"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Computed stats from real data
  const stats = [
    { 
      label: "Active Services", 
      value: services.filter(s => s.status === "active").length.toString(), 
      icon: Eye, 
      change: services.length > 0 ? `${services.length} total` : "No services yet"
    },
    { 
      label: "Total Clients", 
      value: services.reduce((sum, s) => sum + s.activeClients, 0).toString(), 
      icon: Users, 
      change: "Across all services"
    },
    { 
      label: "Total Revenue", 
      value: services.length > 0 
        ? `$${services.reduce((sum, s) => sum + parseFloat(s.totalRevenue.replace(/[^0-9.]/g, '') || '0'), 0).toLocaleString()}`
        : "$0", 
      icon: DollarSign, 
      change: services.length > 0 ? "From all services" : "No revenue yet"
    },
    { 
      label: "Avg. Rating", 
      value: services.filter(s => s.rating > 0).length > 0
        ? (services.reduce((sum, s) => sum + s.rating, 0) / services.filter(s => s.rating > 0).length).toFixed(1)
        : "-", 
      icon: Star, 
      change: services.reduce((sum, s) => sum + s.reviews, 0) > 0 
        ? `Based on ${services.reduce((sum, s) => sum + s.reviews, 0)} reviews`
        : "No reviews yet"
    },
  ];

  useEffect(() => {
    fetchServicesData();
  }, []);

  const fetchServicesData = async () => {
    try {
      setLoading(true);
      const { data, error } = await getServices();
      
      if (error) {
        console.log("Error fetching services:", error.message);
        setLoading(false);
        return;
      }
      
      if (data) {
        const mappedServices: Service[] = data.map((s: any) => ({
          id: s.id,
          name: s.name,
          description: s.description,
          priceModel: s.rate_type,
          priceAmount: s.rate?.toString(),
          price: s.rate ? `$${s.rate}` : "$0",
          duration: "1 hour", // Default, not stored in current schema
          category: s.service_type?.category || "Other",
          status: s.is_published ? "active" : "draft",
          activeClients: s.current_clients || 0,
          totalRevenue: "$0",
          rating: 0,
          reviews: 0
        }));
        setServices(mappedServices);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (targetStatus: string) => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    // Stricter validation for Active status
    if (targetStatus === "active") {
      if (!formData.description.trim()) newErrors.description = "Description is required for active services";
      if (!formData.priceAmount.trim()) newErrors.priceAmount = "Price is required";
      if (isNaN(Number(formData.priceAmount))) newErrors.priceAmount = "Price must be a valid number";
      if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenCreate = () => {
    setEditingService(null);
    setErrors({});
    setFormData({
      name: "",
      description: "",
      priceModel: "Fixed Package",
      priceAmount: "",
      duration: "1 hour",
      category: "Governance",
      status: "draft"
    });
    setIsSheetOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setErrors({});
    setFormData({
      name: service.name,
      description: service.description,
      priceModel: service.priceModel || "Fixed Package",
      priceAmount: service.priceAmount || service.price.replace(/[^0-9]/g, ''),
      duration: service.duration,
      category: service.category,
      status: service.status
    });
    setIsSheetOpen(true);
  };

  const handleSave = async () => {
    if (!validateForm(formData.status)) {
      return;
    }

    setSaving(true);
    
    try {
      const serviceInput: CreateServiceInput = {
        name: formData.name,
        description: formData.description,
        rate: parseFloat(formData.priceAmount) || null,
        rate_type: formData.priceModel === "Hourly Rate" ? "hourly" : 
                   formData.priceModel === "Monthly Retainer" ? "retainer" : "fixed",
        service_type_id: null,
        max_clients: null,
        is_published: formData.status === "active"
      };
      
      let result;
      
      if (editingService) {
        result = await updateService({ id: editingService.id as number, ...serviceInput });
      } else {
        result = await createService(serviceInput);
      }

      const { data: savedData, error } = result;

      if (error) throw error;

      if (savedData) {
        const mappedService: Service = {
          id: savedData.id,
          name: savedData.name,
          description: savedData.description || "",
          priceModel: savedData.rate_type,
          priceAmount: savedData.rate?.toString(),
          price: savedData.rate ? `$${savedData.rate}` : "$0",
          duration: formData.duration,
          category: savedData.service_type?.category || formData.category,
          status: savedData.is_published ? "active" : "draft",
          activeClients: savedData.current_clients || 0,
          totalRevenue: "$0",
          rating: 0,
          reviews: 0
        };

        if (editingService) {
          setServices(services.map(s => s.id === editingService.id ? mappedService : s));
          toast.success("Service updated successfully");
        } else {
          setServices([mappedService, ...services]);
          toast.success("Service created successfully");
        }
        setIsSheetOpen(false);
      }
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (service: Service) => {
    setServiceToDelete(service);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return;

    setDeleting(serviceToDelete.id);
    
    try {
      const { error } = await deleteService(serviceToDelete.id as number);

      if (error) throw error;

      setServices(services.filter(s => s.id !== serviceToDelete.id));
      toast.success("Service deleted successfully");
      setIsDeleteDialogOpen(false);
      setServiceToDelete(null);
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    } finally {
      setDeleting(null);
    }
  };

  const handleDuplicate = async (service: Service) => {
    try {
      const { data, error } = await duplicateService(service.id as number);

      if (error) throw error;

      if (data) {
        const mappedService: Service = {
          id: data.id,
          name: data.name,
          description: data.description || "",
          priceModel: data.rate_type,
          priceAmount: data.rate?.toString(),
          price: data.rate ? `$${data.rate}` : "$0",
          duration: "1 hour",
          category: data.service_type?.category || "Other",
          status: data.is_published ? "active" : "draft",
          activeClients: 0,
          totalRevenue: "$0",
          rating: 0,
          reviews: 0
        };
        setServices([mappedService, ...services]);
        toast.success("Service duplicated successfully");
      }
    } catch (error) {
      console.error("Error duplicating service:", error);
      toast.error("Failed to duplicate service");
    }
  };

  const handlePublish = async (service: Service) => {
    try {
      const { error } = await updateService({ id: service.id as number, is_published: true });

      if (error) throw error;

      setServices(services.map(s => 
        s.id === service.id ? { ...s, status: 'active' as const } : s
      ));
      toast.success("Service published successfully");
    } catch (error) {
      console.error("Error publishing service:", error);
      toast.error("Failed to publish service");
    }
  };

  return (
    <div className="min-h-screen bg-page-background">
      {/* Breadcrumb Bar */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Home</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-foreground font-medium">Services</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Policies
              </Button>
              <Button onClick={handleOpenCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Create Service
              </Button>
            </div>
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
            <span
              className="relative h-12 px-4 inline-flex items-center rounded-none border-b-2 border-primary text-primary font-medium"
            >
              <Crown className="h-4 w-4 mr-2" />
              My Services
            </span>
            <Link
              href="/services/requests"
              className="relative h-12 px-4 inline-flex items-center rounded-none border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border transition-colors"
            >
              <FileText className="h-4 w-4 mr-2" />
              Service Requests
            </Link>
          </nav>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" className="text-primary" />
          </div>
        ) : (
        /* Tabs */
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Services ({services.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({services.filter(s => s.status === "active").length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({services.filter(s => s.status === "draft").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {services.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No services yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first service to start attracting clients</p>
                  <Button onClick={handleOpenCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Service
                  </Button>
                </CardContent>
              </Card>
            ) : (
              services.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                        <StatusBadge status={serviceStatusMap[service.status]} label={serviceStatusLabels[service.status]} />
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                        {service.description}
                      </p>
                      
                      <div className="grid grid-cols-5 gap-4">
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Price</span>
                          <span className="font-semibold text-foreground">{service.price}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Duration</span>
                          <span className="text-sm text-foreground">{service.duration}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Active Clients</span>
                          <span className="text-sm text-foreground">{service.activeClients}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Total Revenue</span>
                          <span className="text-sm text-foreground">{service.totalRevenue}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Rating</span>
                          {service.rating > 0 ? (
                            <span className="text-sm text-foreground flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              {service.rating} ({service.reviews} reviews)
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">No reviews yet</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setEditingService(service);
                        setIsPreviewOpen(true);
                      }}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleOpenEdit(service)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDuplicate(service)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(service)} className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {services.filter(s => s.status === "active").length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No active services. Publish a draft to make it visible to clients.</p>
                </CardContent>
              </Card>
            ) : (
            services.filter(s => s.status === "active").map((service) => (
              <Card key={service.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                        <StatusBadge status={serviceStatusMap[service.status]} label={serviceStatusLabels[service.status]} />
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                        {service.description}
                      </p>
                      
                      <div className="grid grid-cols-5 gap-4">
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Price</span>
                          <span className="font-semibold text-foreground">{service.price}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Duration</span>
                          <span className="text-sm text-foreground">{service.duration}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Active Clients</span>
                          <span className="text-sm text-foreground">{service.activeClients}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Total Revenue</span>
                          <span className="text-sm text-foreground">{service.totalRevenue}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Rating</span>
                          <span className="text-sm text-foreground flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            {service.rating} ({service.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setEditingService(service);
                        setIsPreviewOpen(true);
                      }}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleOpenEdit(service)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDuplicate(service)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(service)} className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
            )}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            {services.filter(s => s.status === "draft").map((service) => (
              <Card key={service.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                        <StatusBadge status={serviceStatusMap[service.status]} label={serviceStatusLabels[service.status]} />
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                        {service.description}
                      </p>
                      
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm text-yellow-700 dark:text-yellow-400">
                          Complete your service details to publish it
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenEdit(service)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Continue Editing
                      </Button>
                      <Button size="sm" onClick={() => handlePublish(service)}>Publish</Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDeleteClick(service)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {services.filter(s => s.status === "draft").length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No draft services</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        )}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingService ? "Edit Service" : "Create New Service"}</SheetTitle>
            <SheetDescription>
              {editingService ? "Update your service details below." : "Add a new service to your portfolio."}
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Family Constitution Workshop"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priceModel">Pricing Model</Label>
                <Select
                  value={formData.priceModel}
                  onValueChange={(value) => setFormData({...formData, priceModel: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pricing model" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRICING_MODELS.map(model => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceAmount">Amount (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="priceAmount" 
                    value={formData.priceAmount} 
                    onChange={(e) => setFormData({...formData, priceAmount: e.target.value})}
                    placeholder="5000"
                    className={`pl-9 ${errors.priceAmount ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.priceAmount && <p className="text-xs text-red-500">{errors.priceAmount}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Session Duration</Label>
              <div className="flex gap-2">
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="e.g. 1 hour"
                  className={errors.duration ? "border-red-500" : ""}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {DURATIONS.map(d => (
                      <DropdownMenuItem key={d} onClick={() => setFormData({...formData, duration: d})}>
                        {d}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {errors.duration && <p className="text-xs text-red-500">{errors.duration}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe what this service includes..."
                className={`min-h-[100px] ${errors.description ? "border-red-500" : ""}`}
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({...formData, status: value as ServiceStatus})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg text-sm">
              <div className="flex items-center gap-2 mb-2 font-medium">
                <Settings className="h-4 w-4" />
                Active Policies
              </div>
              <div className="grid grid-cols-2 gap-4 text-muted-foreground">
                <div>Notice Period: <span className="text-foreground">{policies.noticePeriod}</span></div>
                <div>Max Clients: <span className="text-foreground">{policies.maxClients}</span></div>
              </div>
              <Button variant="link" className="px-0 h-auto mt-2 text-xs" onClick={() => {
                setIsSheetOpen(false);
                setIsSettingsOpen(true);
              }}>
                Change Policies
              </Button>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" disabled={saving}>Cancel</Button>
            </SheetClose>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                "Save Service"
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{serviceToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={!!deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={!!deleting}>
              {deleting ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Policies Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Advisor Operational Policies</DialogTitle>
            <DialogDescription>
              These settings apply to all your services and bookings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="noticePeriod">Minimum Notice Period</Label>
              <Select
                value={policies.noticePeriod}
                onValueChange={(value) => setPolicies({...policies, noticePeriod: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select notice period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24 hours">24 hours</SelectItem>
                  <SelectItem value="48 hours">48 hours</SelectItem>
                  <SelectItem value="3 days">3 days</SelectItem>
                  <SelectItem value="1 week">1 week</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Minimum time before a session can be booked.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxClients">Maximum Concurrent Clients</Label>
              <Input 
                id="maxClients" 
                type="number"
                value={policies.maxClients}
                onChange={(e) => setPolicies({...policies, maxClients: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">Limit the number of active families you work with.</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsSettingsOpen(false)}>Save Policies</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Service Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Service Preview</DialogTitle>
            <DialogDescription>
              This is how families will see your service in the marketplace.
            </DialogDescription>
          </DialogHeader>
          {editingService && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/30 p-6 border-b">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Badge variant="outline" className="mb-2">{editingService.category}</Badge>
                    <h2 className="text-2xl font-bold">{editingService.name}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{editingService.price}</div>
                    <div className="text-sm text-muted-foreground">{editingService.priceModel || "Fixed Package"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {editingService.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {policies.noticePeriod} notice required
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About this service</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {editingService.description}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Ready to book?</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      This service is available for booking. Please ensure you can meet the {policies.noticePeriod} notice requirement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
