"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Eye, Clock, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { WorkshopTemplateBlock } from "@/types/workshop-constructor";

interface TemplateLibraryBrowserProps {
  onAddBlock: (block: WorkshopTemplateBlock) => void;
}

const MOCK_BLOCKS: WorkshopTemplateBlock[] = [
  {
    id: "1",
    block_key: "kickoff-welcome",
    name: "Welcome & Kickoff",
    description: "Standard workshop welcome and introduction",
    category: "kickoff",
    screen_type: "text",
    content_type: "introduction",
    default_content: {
      title: "Welcome to the Workshop",
      content: "Thank you for participating in today's workshop...",
    },
    default_navigation: {},
    default_ai_config: { enabled: false },
    tags: ["introduction", "welcome"],
    estimated_duration: 10,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    block_key: "raci-matrix",
    name: "RACI Matrix",
    description: "Define roles and responsibilities for decisions",
    category: "exercise",
    screen_type: "exercise",
    content_type: "raci-matrix",
    default_content: {
      title: "RACI Matrix - Decision Rights",
      description: "Define who is Responsible, Accountable, Consulted, and Informed",
    },
    default_navigation: {},
    default_ai_config: { enabled: true, style: "supportive" },
    tags: ["governance", "raci", "decisions"],
    estimated_duration: 30,
    thumbnail_url: null,
    usage_count: 45,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    block_key: "swot-analysis",
    name: "SWOT Analysis",
    description: "Analyze Strengths, Weaknesses, Opportunities, Threats",
    category: "exercise",
    screen_type: "exercise",
    content_type: "swot",
    default_content: {
      title: "SWOT Analysis",
      description: "Analyze internal and external strategic factors",
    },
    default_navigation: {},
    default_ai_config: { enabled: true, style: "neutral" },
    tags: ["swot", "strategy", "analysis"],
    estimated_duration: 30,
    thumbnail_url: null,
    usage_count: 67,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    block_key: "values-assessment",
    name: "Values Assessment",
    description: "Identify personal and family values",
    category: "assessment",
    screen_type: "assessment",
    content_type: "values-selection",
    default_content: {
      title: "Values Assessment",
      description: "Select your top 5 values",
    },
    default_navigation: {},
    default_ai_config: { enabled: false },
    tags: ["values", "assessment", "discovery"],
    estimated_duration: 20,
    thumbnail_url: null,
    usage_count: 89,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function TemplateLibraryBrowser({ onAddBlock }: TemplateLibraryBrowserProps) {
  const [blocks, setBlocks] = useState<WorkshopTemplateBlock[]>([]);
  const [filteredBlocks, setFilteredBlocks] = useState<WorkshopTemplateBlock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedBlock, setSelectedBlock] = useState<WorkshopTemplateBlock | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlocks();
  }, []);

  useEffect(() => {
    filterBlocks();
  }, [blocks, searchQuery, categoryFilter]);

  const loadBlocks = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setBlocks(MOCK_BLOCKS);
    } catch (error) {
      toast.error("Failed to load template blocks");
    } finally {
      setLoading(false);
    }
  };

  const filterBlocks = () => {
    let filtered = blocks;

    if (searchQuery) {
      filtered = filtered.filter(block =>
        block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(block => block.category === categoryFilter);
    }

    setFilteredBlocks(filtered);
  };

  const handleAddBlock = (block: WorkshopTemplateBlock) => {
    onAddBlock(block);
  };

  const handlePreview = (block: WorkshopTemplateBlock) => {
    setSelectedBlock(block);
    setPreviewOpen(true);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      kickoff: "bg-blue-100 text-blue-800",
      assessment: "bg-purple-100 text-purple-800",
      exercise: "bg-green-100 text-green-800",
      discussion: "bg-orange-100 text-orange-800",
      governance: "bg-indigo-100 text-indigo-800",
      strategy: "bg-pink-100 text-pink-800",
      succession: "bg-yellow-100 text-yellow-800",
      wrapup: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.exercise;
  };

  const groupedBlocks = filteredBlocks.reduce((acc, block) => {
    if (!acc[block.category]) {
      acc[block.category] = [];
    }
    acc[block.category].push(block);
    return acc;
  }, {} as Record<string, WorkshopTemplateBlock[]>);

  return (
    <div className="flex flex-col h-full">
      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="kickoff">Kickoff & Introduction</SelectItem>
            <SelectItem value="assessment">Assessment</SelectItem>
            <SelectItem value="exercise">Exercise</SelectItem>
            <SelectItem value="discussion">Discussion</SelectItem>
            <SelectItem value="governance">Governance</SelectItem>
            <SelectItem value="strategy">Strategy</SelectItem>
            <SelectItem value="succession">Succession</SelectItem>
            <SelectItem value="wrapup">Wrap-up</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Blocks</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 mt-4">
          <ScrollArea className="h-[500px]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredBlocks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No blocks found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="space-y-6 pr-4">
                {Object.entries(groupedBlocks).map(([category, categoryBlocks]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-sm mb-3 capitalize flex items-center gap-2">
                      <Badge className={getCategoryColor(category)}>
                        {category}
                      </Badge>
                      <span className="text-muted-foreground">
                        ({categoryBlocks.length})
                      </span>
                    </h3>
                    <div className="space-y-2">
                      {categoryBlocks.map((block) => (
                        <div
                          key={block.id}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-background"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1">
                                {block.name}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {block.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              {block.estimated_duration && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {block.estimated_duration}m
                                </span>
                              )}
                              {block.default_ai_config.enabled && (
                                <span className="flex items-center gap-1 text-purple-600">
                                  <Sparkles className="h-3 w-3" />
                                  AI
                                </span>
                              )}
                              {block.usage_count > 0 && (
                                <span className="text-muted-foreground">
                                  Used {block.usage_count}x
                                </span>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePreview(block)}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Preview
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleAddBlock(block)}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add
                              </Button>
                            </div>
                          </div>

                          {block.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {block.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <Tag className="h-2 w-2 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="popular" className="flex-1 mt-4">
          <ScrollArea className="h-[500px]">
            <div className="space-y-2 pr-4">
              {filteredBlocks
                .sort((a, b) => b.usage_count - a.usage_count)
                .slice(0, 10)
                .map((block) => (
                  <div
                    key={block.id}
                    className="p-3 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{block.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Used {block.usage_count} times
                        </p>
                      </div>
                      <Button size="sm" onClick={() => handleAddBlock(block)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="recent" className="flex-1 mt-4">
          <ScrollArea className="h-[500px]">
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">Recently added blocks will appear here</p>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedBlock?.name}</DialogTitle>
            <DialogDescription>{selectedBlock?.description}</DialogDescription>
          </DialogHeader>

          {selectedBlock && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(selectedBlock.category)}>
                  {selectedBlock.category}
                </Badge>
                <Badge variant="outline">{selectedBlock.screen_type}</Badge>
                {selectedBlock.content_type && (
                  <Badge variant="outline">{selectedBlock.content_type}</Badge>
                )}
              </div>

              <div className="p-4 border rounded-lg bg-muted/5">
                <h4 className="font-semibold mb-2">Default Content</h4>
                <pre className="text-sm text-muted-foreground overflow-auto">
                  {JSON.stringify(selectedBlock.default_content, null, 2)}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Duration:</span>{" "}
                  {selectedBlock.estimated_duration || "N/A"} minutes
                </div>
                <div>
                  <span className="font-medium">AI Enabled:</span>{" "}
                  {selectedBlock.default_ai_config.enabled ? "Yes" : "No"}
                </div>
              </div>

              {selectedBlock.tags.length > 0 && (
                <div>
                  <span className="font-medium text-sm">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedBlock.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            {selectedBlock && (
              <Button
                onClick={() => {
                  handleAddBlock(selectedBlock);
                  setPreviewOpen(false);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Workshop
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
