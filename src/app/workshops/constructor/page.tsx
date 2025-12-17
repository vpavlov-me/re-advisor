"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  Copy,
  Trash2,
  Edit,
  Share2,
  Eye,
  MoreVertical,
  Clock,
  Users,
  FileText,
  CheckCircle2,
  Archive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { WorkshopTemplateWithScreens, WorkshopTemplateCategory, WorkshopTemplateStatus } from "@/types/workshop-constructor";

export default function WorkshopConstructorPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<WorkshopTemplateWithScreens[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<WorkshopTemplateStatus | "all">("all");

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      setTemplates([
        {
          id: "1",
          created_by: "user1",
          name: "Strategic Planning Workshop",
          description: "Comprehensive strategic planning session for family businesses",
          duration_minutes: 180,
          target_audience: "Family Council, Board",
          category: "Strategy",
          is_public: false,
          is_master: true,
          cloned_from: null,
          version: 1,
          status: "published",
          settings: { enableAI: true, enableChat: true },
          screens: [],
          screen_count: 8,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: new Date().toISOString(),
        },
        {
          id: "2",
          created_by: "user1",
          name: "Dividend Policy Framework",
          description: "Workshop for establishing family dividend policy",
          duration_minutes: 120,
          target_audience: "Shareholders Council",
          category: "Governance",
          is_public: false,
          is_master: false,
          cloned_from: null,
          version: 1,
          status: "draft",
          settings: { enableAI: false },
          screens: [],
          screen_count: 6,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: null,
        },
      ]);
    } catch (error) {
      toast.error("Failed to load templates");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = () => {
    router.push("/workshops/constructor/create");
  };

  const handleEditTemplate = (id: string) => {
    router.push(`/workshops/constructor/${id}/edit`);
  };

  const handlePreviewTemplate = (id: string) => {
    router.push(`/workshops/constructor/${id}/preview`);
  };

  const handleCloneTemplate = async (template: WorkshopTemplateWithScreens) => {
    try {
      // TODO: API call to clone template
      toast.success(`Cloned "${template.name}"`);
      loadTemplates();
    } catch (error) {
      toast.error("Failed to clone template");
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    try {
      // TODO: API call to delete template
      toast.success("Template deleted");
      loadTemplates();
    } catch (error) {
      toast.error("Failed to delete template");
    }
  };

  const handleArchiveTemplate = async (id: string) => {
    try {
      // TODO: API call to archive template
      toast.success("Template archived");
      loadTemplates();
    } catch (error) {
      toast.error("Failed to archive template");
    }
  };

  const handleShareTemplate = (id: string) => {
    router.push(`/workshops/constructor/${id}/share`);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || template.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryColor = (category: WorkshopTemplateCategory) => {
    const colors: Record<WorkshopTemplateCategory, string> = {
      "Governance": "bg-blue-100 text-blue-800",
      "Succession": "bg-purple-100 text-purple-800",
      "Values": "bg-green-100 text-green-800",
      "Strategy": "bg-orange-100 text-orange-800",
      "Assessment": "bg-pink-100 text-pink-800",
      "Custom": "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.Custom;
  };

  const getStatusColor = (status: WorkshopTemplateStatus) => {
    const colors: Record<WorkshopTemplateStatus, string> = {
      "draft": "bg-gray-100 text-gray-800",
      "published": "bg-green-100 text-green-800",
      "archived": "bg-yellow-100 text-yellow-800",
    };
    return colors[status];
  };

  const stats = [
    {
      label: "Total Templates",
      value: templates.length,
      icon: FileText,
      color: "text-blue-600"
    },
    {
      label: "Published",
      value: templates.filter(t => t.status === "published").length,
      icon: CheckCircle2,
      color: "text-green-600"
    },
    {
      label: "In Draft",
      value: templates.filter(t => t.status === "draft").length,
      icon: Edit,
      color: "text-orange-600"
    },
    {
      label: "Master Templates",
      value: templates.filter(t => t.is_master).length,
      icon: Copy,
      color: "text-purple-600"
    },
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workshop Constructor</h1>
          <p className="text-muted-foreground mt-1">
            Create, manage, and share custom workshop templates
          </p>
        </div>
        <Button onClick={handleCreateTemplate} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Create Workshop
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search workshops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Governance">Governance</SelectItem>
                <SelectItem value="Succession">Succession</SelectItem>
                <SelectItem value="Values">Values</SelectItem>
                <SelectItem value="Strategy">Strategy</SelectItem>
                <SelectItem value="Assessment">Assessment</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Templates List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="my-templates">My Templates</TabsTrigger>
          <TabsTrigger value="master">Master Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-muted-foreground">Loading templates...</p>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || categoryFilter !== "all" || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Create your first workshop template to get started"}
                </p>
                <Button onClick={handleCreateTemplate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Workshop
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(template.category)}>
                            {template.category}
                          </Badge>
                          <Badge className={getStatusColor(template.status)}>
                            {template.status}
                          </Badge>
                          {template.is_master && (
                            <Badge variant="outline">Master</Badge>
                          )}
                        </div>
                        <CardTitle className="line-clamp-1">{template.name}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-1">
                          {template.description}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditTemplate(template.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePreviewTemplate(template.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCloneTemplate(template)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Clone
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareTemplate(template.id)}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share with Family
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleArchiveTemplate(template.id)}>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <FileText className="h-4 w-4 mr-1" />
                          {template.screen_count} screens
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {template.duration_minutes ? `${template.duration_minutes} min` : "N/A"}
                        </div>
                      </div>
                      {template.target_audience && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          {template.target_audience}
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleEditTemplate(template.id)}
                          className="flex-1"
                          variant={template.status === "published" ? "outline" : "default"}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        {template.status === "published" && (
                          <Button
                            onClick={() => handleShareTemplate(template.id)}
                            className="flex-1"
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-templates">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">My Templates view - showing only templates created by you</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="master">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Master Templates - reusable templates for multiple families</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
