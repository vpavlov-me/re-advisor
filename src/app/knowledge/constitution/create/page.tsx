"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  MoreVertical,
  FileText,
  Layout,
  Type,
  ListOrdered,
  Settings
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Predefined Sections
const SECTIONS = [
  { id: "vision", title: "1. Family Vision & Mission", description: "Purpose and long-term aspirations" },
  { id: "values", title: "2. Family Values", description: "Core principles and beliefs" },
  { id: "governance", title: "3. Governance Structure", description: "Leadership roles and organization" },
  { id: "decision", title: "4. Decision-Making Process", description: "How decisions are made and approved" },
  { id: "conflict", title: "5. Conflict Resolution", description: "Process for handling disagreements" },
  { id: "succession", title: "6. Succession Planning", description: "Leadership transition guidelines" },
  { id: "education", title: "7. Education & Development", description: "Family member growth and learning" },
  { id: "philanthropy", title: "8. Philanthropy Guidelines", description: "Charitable giving framework" },
  { id: "assets", title: "9. Asset Management Principles", description: "Wealth stewardship guidelines" },
  { id: "communication", title: "10. Communication Standards", description: "How family communicates" },
  { id: "meetings", title: "11. Meeting Protocols", description: "Meeting structure and processes" },
  { id: "amendment", title: "12. Amendment Process", description: "How constitution can be changed" },
];

export default function CreateConstitutionTemplatePage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [templateData, setTemplateData] = useState({
    title: "New Constitution Template",
    description: "",
    sections: SECTIONS.reduce((acc, section) => ({ ...acc, [section.id]: "" }), {} as Record<string, string>)
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSectionChange = (id: string, content: string) => {
    setTemplateData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [id]: content
      }
    }));
  };

  const calculateProgress = () => {
    const filledSections = Object.values(templateData.sections).filter(content => content.trim().length > 0).length;
    return Math.round((filledSections / SECTIONS.length) * 100);
  };

  const handleSave = async (asDraft = true) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: templateData.title,
          description: templateData.description,
          sections: templateData.sections,
          isDraft: asDraft,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save template');
      }

      const data = await response.json();
      console.log("Template saved:", data);
      alert(asDraft ? "Draft saved successfully!" : "Template published successfully!");
      // Optionally redirect or update UI state
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-lg">{templateData.title}</h1>
                <Badge variant="outline">Draft</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Last saved just now</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="mr-4 text-sm text-muted-foreground">
              Progress: <span className="font-medium text-foreground">{calculateProgress()}%</span>
            </div>
            <Button variant="outline" onClick={() => setIsPreviewOpen(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={() => handleSave(true)} disabled={isSaving}>
              Save Draft
            </Button>
            <Button onClick={() => handleSave(false)} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              Publish
            </Button>
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
                  const isFilled = templateData.sections[section.id].trim().length > 0;
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
                    <DropdownMenuItem className="text-destructive">
                      Clear Section
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col">
              {/* Toolbar (Mock) */}
              <div className="flex items-center gap-1 p-2 border-b bg-muted/20">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Type className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 font-bold">B</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 italic">I</Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 underline">U</Button>
                <Separator orientation="vertical" className="h-4 mx-1" />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ListOrdered className="h-4 w-4" /></Button>
              </div>
              
              {/* Editor */}
              <Textarea 
                className="flex-1 resize-none border-0 focus-visible:ring-0 p-6 text-base leading-relaxed"
                placeholder={`Start writing the ${SECTIONS.find(s => s.id === activeSection)?.title} here...`}
                value={templateData.sections[activeSection]}
                onChange={(e) => handleSectionChange(activeSection, e.target.value)}
              />
            </CardContent>
            <div className="p-4 border-t bg-muted/10 flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                {templateData.sections[activeSection].length} characters
              </div>
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
                <h1 className="text-4xl font-bold mb-4">Family Constitution</h1>
                <p className="text-xl text-muted-foreground">Draft Template</p>
              </div>
              
              {SECTIONS.map((section) => {
                const content = templateData.sections[section.id];
                if (!content) return null;
                
                return (
                  <div key={section.id} className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">{section.title}</h2>
                    <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                      {content}
                    </div>
                  </div>
                );
              })}
              
              {Object.values(templateData.sections).every(c => !c) && (
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
    </div>
  );
}
