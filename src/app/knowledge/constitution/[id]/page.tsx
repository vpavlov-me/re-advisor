"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  CheckCircle2, 
  MoreVertical,
  FileText,
  Layout,
  Loader2,
  Trash2,
  Share2,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { supabase } from "@/lib/supabaseClient";

// Predefined Sections (BR-KC-007: Constitution Template Structure)
const SECTIONS = [
  { id: "ways-to-create", number: 1, title: "1. Ways to Create Your Constitution", description: "Methods and approaches for creating your family constitution" },
  { id: "preamble", number: 2, title: "2. Preamble", description: "Introduction and purpose statement of the constitution" },
  { id: "values-mission", number: 3, title: "3. Values and Mission", description: "Core family values and mission statement" },
  { id: "governance", number: 4, title: "4. Governance Structure", description: "Family governance framework and leadership roles" },
  { id: "wealth-management", number: 5, title: "5. Wealth Management", description: "Principles for managing and preserving family wealth" },
  { id: "education", number: 6, title: "6. Education and Development", description: "Family member education and personal development" },
  { id: "decision-making", number: 7, title: "7. Decision Making Process", description: "How family decisions are made and approved" },
  { id: "succession", number: 8, title: "8. Succession Planning", description: "Leadership transition and succession guidelines" },
  { id: "philanthropy", number: 9, title: "9. Philanthropy", description: "Charitable giving and social responsibility" },
  { id: "conflict-resolution", number: 10, title: "10. Conflict Resolution", description: "Process for handling disagreements and disputes" },
  { id: "voting-rules", number: 11, title: "11. Voting Rules and Procedures", description: "Voting mechanisms and procedures for family decisions" },
  { id: "amendment", number: 12, title: "12. Constitution Amendment Process", description: "How the constitution can be modified or amended" },
];

interface ConstitutionSection {
  id: number;
  template_id: number;
  section_number: number;
  title: string;
  content: string;
  is_required: boolean;
}

interface ConstitutionTemplate {
  id: number;
  advisor_id: string;
  title: string;
  description: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export default function ConstitutionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [template, setTemplate] = useState<ConstitutionTemplate | null>(null);
  const [templateData, setTemplateData] = useState({
    title: "",
    description: "",
    sections: SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: "" }), {} as Record<string, string>)
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTitleDialogOpen, setIsTitleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
          toast.error("Invalid template ID");
          router.push("/knowledge");
          return;
        }

        // Fetch template
        const { data: templateData, error: templateError } = await supabase
          .from('constitution_templates')
          .select('*')
          .eq('id', numericId)
          .single();

        if (templateError) throw templateError;

        if (!templateData) {
          toast.error("Template not found");
          router.push("/knowledge");
          return;
        }

        setTemplate(templateData);

        // Fetch sections
        const { data: sectionsData, error: sectionsError } = await supabase
          .from('constitution_sections')
          .select('*')
          .eq('template_id', numericId)
          .order('section_number');

        if (sectionsError) {
          console.error("Error fetching sections:", sectionsError);
        }

        // Map sections to our format
        const sectionsMap: Record<string, string> = {};
        SECTIONS.forEach(section => {
          const dbSection = sectionsData?.find(s => s.section_number === section.number);
          sectionsMap[section.id] = dbSection?.content || "";
        });

        setTemplateData({
          title: templateData.title,
          description: templateData.description || "",
          sections: sectionsMap
        });
      } catch (error) {
        console.error("Error fetching template:", error);
        toast.error("Failed to load template");
        router.push("/knowledge");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, [id, router]);

  const handleSectionChange = (sectionId: string, content: string) => {
    setTemplateData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: content
      }
    }));
  };

  const calculateProgress = () => {
    const filledSections = Object.values(templateData.sections).filter(
      content => content.trim().length > 0 && content !== "<p></p>"
    ).length;
    return Math.round((filledSections / SECTIONS.length) * 100);
  };

  const handleSave = async (publish = false) => {
    if (!template || !templateData.title.trim()) {
      toast.error("Please enter a title for the template");
      return;
    }

    setIsSaving(true);
    try {
      // Update template
      const { error: templateError } = await supabase
        .from('constitution_templates')
        .update({
          title: templateData.title,
          description: templateData.description,
          is_published: publish ? true : template.is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', template.id);

      if (templateError) throw templateError;

      // Delete existing sections and recreate
      await supabase
        .from('constitution_sections')
        .delete()
        .eq('template_id', template.id);

      // Create new sections
      const sectionsToInsert = SECTIONS.map((section) => ({
        template_id: template.id,
        section_number: section.number,
        title: section.title,
        content: templateData.sections[section.id] || "",
        is_required: true
      }));

      const { error: sectionsError } = await supabase
        .from('constitution_sections')
        .insert(sectionsToInsert);

      if (sectionsError) {
        console.error("Error saving sections:", sectionsError);
      }

      // Update local state
      setTemplate({
        ...template,
        title: templateData.title,
        description: templateData.description,
        is_published: publish ? true : template.is_published,
        updated_at: new Date().toISOString()
      });

      toast.success(publish ? "Template published successfully!" : "Changes saved successfully!");
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!template) return;

    setIsDeleting(true);
    try {
      // Delete sections first
      await supabase
        .from('constitution_sections')
        .delete()
        .eq('template_id', template.id);

      // Delete template
      const { error } = await supabase
        .from('constitution_templates')
        .delete()
        .eq('id', template.id);

      if (error) throw error;

      toast.success("Template deleted");
      router.push("/knowledge");
    } catch (error) {
      console.error("Error deleting template:", error);
      toast.error("Failed to delete template");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleClearSection = () => {
    handleSectionChange(activeSection, "");
    toast.success("Section cleared");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading template...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-lg font-medium mb-2">Template not found</h2>
          <Button asChild>
            <Link href="/knowledge">Back to Knowledge Center</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/knowledge">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div 
              className="cursor-pointer hover:bg-muted/50 p-2 rounded-md -m-2"
              onClick={() => setIsTitleDialogOpen(true)}
            >
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-lg">{templateData.title}</h1>
                <Badge variant={template.is_published ? "default" : "outline"}>
                  {template.is_published ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Click to edit title</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="mr-4 text-sm text-muted-foreground hidden sm:block">
              Progress: <span className="font-medium text-foreground">{calculateProgress()}%</span>
            </div>
            <Button variant="outline" onClick={() => setIsPreviewOpen(true)}>
              <Eye className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Preview</span>
            </Button>
            <Button variant="outline" onClick={() => handleSave(false)} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 sm:mr-2 animate-spin" /> : <Save className="h-4 w-4 sm:mr-2" />}
              <span className="hidden sm:inline">Save</span>
            </Button>
            {!template.is_published && (
              <Button onClick={() => handleSave(true)} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Publish
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share with Family
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="h-4 w-4 mr-2" />
                  View Assignments
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive" 
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex-1 container py-6 grid grid-cols-12 gap-6 h-[calc(100vh-65px)]">
        {/* Sidebar - Sections Navigation */}
        <div className="col-span-3 flex flex-col h-full">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Sections</CardTitle>
              <CardDescription>Select a section to edit</CardDescription>
            </CardHeader>
            <Separator />
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {SECTIONS.map((section) => {
                  const content = templateData.sections[section.id];
                  const isFilled = content.trim().length > 0 && content !== "<p></p>";
                  const isActive = activeSection === section.id;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors flex items-start gap-3 ${
                        isActive 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className={`mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isFilled 
                          ? "bg-green-100 border-green-200 text-green-600" 
                          : isActive ? "border-primary" : "border-muted-foreground"
                      }`}>
                        {isFilled && <CheckCircle2 className="h-3 w-3" />}
                      </div>
                      <div className="flex-1">
                        <div className="line-clamp-1">{section.title}</div>
                        {isActive && (
                          <div className="text-xs opacity-80 mt-0.5 font-normal line-clamp-1">
                            {section.description}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Main Editor Area */}
        <div className="col-span-9 flex flex-col h-full">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{SECTIONS.find(s => s.id === activeSection)?.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {SECTIONS.find(s => s.id === activeSection)?.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Layout className="h-4 w-4 mr-2" />
                      Load Example Content
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={handleClearSection}>
                      Clear Section
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
              {/* Rich Text Editor */}
              <RichTextEditor
                content={templateData.sections[activeSection]}
                onChange={(content) => handleSectionChange(activeSection, content)}
                placeholder={`Start writing the ${SECTIONS.find(s => s.id === activeSection)?.title} here...`}
                className="flex-1 border-0 rounded-none"
              />
            </CardContent>
            <div className="p-4 border-t bg-muted/10 flex justify-end items-center">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={activeSection === SECTIONS[0].id}
                  onClick={() => {
                    const idx = SECTIONS.findIndex(s => s.id === activeSection);
                    if (idx > 0) setActiveSection(SECTIONS[idx - 1].id);
                  }}
                >
                  Previous Section
                </Button>
                <Button 
                  size="sm"
                  disabled={activeSection === SECTIONS[SECTIONS.length - 1].id}
                  onClick={() => {
                    const idx = SECTIONS.findIndex(s => s.id === activeSection);
                    if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].id);
                  }}
                >
                  Next Section
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Title Edit Dialog */}
      <Dialog open={isTitleDialogOpen} onOpenChange={setIsTitleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Template Details</DialogTitle>
            <DialogDescription>
              Update the title and description of your constitution template.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                value={templateData.title}
                onChange={(e) => setTemplateData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Standard Family Constitution"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                value={templateData.description}
                onChange={(e) => setTemplateData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this template..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsTitleDialogOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>
              This is how the constitution template will look to families.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 border rounded-md p-8 mt-4">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">{templateData.title}</h1>
                {templateData.description && (
                  <p className="text-xl text-muted-foreground">{templateData.description}</p>
                )}
              </div>
              
              {SECTIONS.map((section) => {
                const content = templateData.sections[section.id];
                if (!content || content === "<p></p>") return null;
                
                return (
                  <div key={section.id} className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">{section.title}</h2>
                    <div 
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                );
              })}
              
              {Object.values(templateData.sections).every(c => !c || c === "<p></p>") && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No content added yet.</p>
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{templateData.title}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
