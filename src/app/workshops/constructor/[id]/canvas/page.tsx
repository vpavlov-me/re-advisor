"use client";

import { useState, useEffect, use, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Save,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Trash2,
  Library,
  Search,
  X,
  List,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Edit,
  ArrowRight,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { WorkshopTemplate, WorkshopScreen, WorkshopTemplateBlock } from "@/types/workshop-constructor";
import { VMV_MASTER_TEMPLATE } from "@/data/vmv-master-template";
import { VMV_V1_TEMPLATE } from "@/data/vmv-v1-template";
import { VMV_WORKSHOP_BLOCKS } from "@/data/vmv-workshop-blocks";

interface ScreenNode extends WorkshopScreen {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Connection {
  id: string;
  fromScreenId: string;
  toScreenId: string;
  action: string;
  condition?: string;
  label?: string;
}

export default function CanvasBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<WorkshopTemplate | null>(null);
  const [screenNodes, setScreenNodes] = useState<ScreenNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<WorkshopTemplateBlock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<ScreenNode | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [connectionDialogOpen, setConnectionDialogOpen] = useState(false);
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null);

  useEffect(() => {
    loadTemplate();
    loadAvailableBlocks();
  }, [id]);

  const loadTemplate = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));

      if (id === "vmv-master-template") {
        setTemplate(VMV_MASTER_TEMPLATE);
        initializeNodes(VMV_MASTER_TEMPLATE.screens);
      } else if (id === "vmv-v1") {
        setTemplate(VMV_V1_TEMPLATE);
        initializeNodes(VMV_V1_TEMPLATE.screens);
      } else {
        setTemplate({
          id,
          created_by: "user1",
          name: "New Workshop Template",
          description: "Build your custom workshop",
          duration_minutes: 0,
          target_audience: "All",
          category: "Custom",
          is_public: false,
          is_master: false,
          cloned_from: null,
          version: 1,
          status: "draft",
          settings: { enableAI: true, enableChat: true },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: null,
        });
        setScreenNodes([]);
      }
    } catch (error) {
      toast.error("Failed to load template");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const initializeNodes = (screens: WorkshopScreen[]) => {
    const nodes: ScreenNode[] = screens.map((screen, index) => ({
      ...screen,
      x: 100 + (index % 3) * 400,
      y: 100 + Math.floor(index / 3) * 250,
      width: 320,
      height: 180,
    }));
    setScreenNodes(nodes);

    // Initialize connections based on navigation
    const conns: Connection[] = [];
    screens.forEach(screen => {
      if (screen.navigation.next) {
        const toScreen = screens.find(s => s.screen_key === screen.navigation.next);
        if (toScreen) {
          conns.push({
            id: `${screen.id}-${toScreen.id}`,
            fromScreenId: screen.id,
            toScreenId: toScreen.id,
            action: "next",
            label: "Next",
          });
        }
      }
    });
    setConnections(conns);
  };

  const loadAvailableBlocks = () => {
    setAvailableBlocks(VMV_WORKSHOP_BLOCKS);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Workshop saved");
    } catch (error) {
      toast.error("Failed to save workshop");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!template) return;
    if (screenNodes.length === 0) {
      toast.error("Add at least one screen before publishing");
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Workshop published!");
      router.push("/workshops/constructor");
    } catch (error) {
      toast.error("Failed to publish workshop");
    }
  };

  const handlePreview = () => {
    router.push(`/workshops/constructor/${id}/preview`);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.3));
  };

  const handleResetView = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && e.target === canvasRef.current) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    } else if (draggedNode) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - panOffset.x) / zoom - dragOffset.x;
        const y = (e.clientY - rect.top - panOffset.y) / zoom - dragOffset.y;

        setScreenNodes(nodes =>
          nodes.map(node =>
            node.id === draggedNode.id ? { ...node, x, y } : node
          )
        );
      }
    }
  };

  const handleCanvasMouseUp = () => {
    setIsPanning(false);
    setDraggedNode(null);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, node: ScreenNode) => {
    e.stopPropagation();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const offsetX = (e.clientX - rect.left - panOffset.x) / zoom - node.x;
      const offsetY = (e.clientY - rect.top - panOffset.y) / zoom - node.y;
      setDragOffset({ x: offsetX, y: offsetY });
      setDraggedNode(node);
    }
  };

  const handleAddScreen = (block: WorkshopTemplateBlock) => {
    const newScreen: ScreenNode = {
      id: `screen-${Date.now()}`,
      template_id: id,
      screen_key: `${block.block_key}-${Date.now()}`,
      name: block.name,
      description: block.description || "",
      order_index: screenNodes.length,
      duration_minutes: block.estimated_duration || null,
      screen_type: block.screen_type,
      content_type: block.content_type,
      content: block.default_content,
      navigation: block.default_navigation,
      ai_config: block.default_ai_config,
      has_timer: false,
      timer_config: {},
      is_optional: false,
      show_conditions: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      x: 100 - panOffset.x / zoom,
      y: 100 - panOffset.y / zoom,
      width: 320,
      height: 180,
    };

    setScreenNodes([...screenNodes, newScreen]);
    toast.success(`Added "${block.name}"`);
  };

  const handleDeleteNode = (nodeId: string) => {
    if (!confirm("Delete this screen?")) return;

    setScreenNodes(nodes => nodes.filter(n => n.id !== nodeId));
    setConnections(conns => conns.filter(c => c.fromScreenId !== nodeId && c.toScreenId !== nodeId));
    toast.success("Screen deleted");
  };

  const handleEditScreen = (node: ScreenNode) => {
    router.push(`/workshops/constructor/${id}/screen/${node.screen_key}`);
  };

  const handleStartConnection = (e: React.MouseEvent, fromNodeId: string) => {
    e.stopPropagation();
    setConnectionStart(fromNodeId);
  };

  const handleEndConnection = (toNodeId: string) => {
    if (connectionStart && connectionStart !== toNodeId) {
      const existingConnection = connections.find(
        c => c.fromScreenId === connectionStart && c.toScreenId === toNodeId
      );

      if (existingConnection) {
        toast.error("Connection already exists");
      } else {
        setEditingConnection({
          id: `${connectionStart}-${toNodeId}`,
          fromScreenId: connectionStart,
          toScreenId: toNodeId,
          action: "next",
          label: "Next",
        });
        setConnectionDialogOpen(true);
      }
    }
    setConnectionStart(null);
  };

  const handleSaveConnection = () => {
    if (editingConnection) {
      if (selectedConnection) {
        // Update existing connection
        setConnections(conns =>
          conns.map(c => c.id === selectedConnection.id ? editingConnection : c)
        );
        toast.success("Connection updated");
      } else {
        // Add new connection
        setConnections([...connections, editingConnection]);
        toast.success("Connection created");
      }
    }
    setConnectionDialogOpen(false);
    setEditingConnection(null);
    setSelectedConnection(null);
  };

  const handleEditConnection = (connection: Connection) => {
    setSelectedConnection(connection);
    setEditingConnection({ ...connection });
    setConnectionDialogOpen(true);
  };

  const handleDeleteConnection = (connectionId: string) => {
    setConnections(conns => conns.filter(c => c.id !== connectionId));
    setConnectionDialogOpen(false);
    setSelectedConnection(null);
    toast.success("Connection deleted");
  };

  const getConnectionPath = (fromNode: ScreenNode, toNode: ScreenNode): string => {
    const startX = fromNode.x + fromNode.width;
    const startY = fromNode.y + fromNode.height / 2;
    const endX = toNode.x;
    const endY = toNode.y + toNode.height / 2;

    const controlPointOffset = Math.abs(endX - startX) / 2;

    return `M ${startX} ${startY} C ${startX + controlPointOffset} ${startY}, ${endX - controlPointOffset} ${endY}, ${endX} ${endY}`;
  };

  const getTotalDuration = () => {
    return screenNodes.reduce((sum, n) => sum + (n.duration_minutes || 0), 0);
  };

  const filteredBlocks = availableBlocks.filter(block =>
    block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading canvas builder...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Template not found</p>
            <Button onClick={() => router.push("/workshops/constructor")} className="mt-4">
              Back to Constructor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/workshops/constructor")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{template.name}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {getTotalDuration()} min
                  </span>
                  <span>•</span>
                  <span>{screenNodes.length} screens</span>
                  <Badge variant="outline">{template.status}</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => router.push(`/workshops/constructor/${id}/builder`)}
              >
                <List className="h-4 w-4 mr-2" />
                List View
              </Button>
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handlePublish}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Block Library - Left Sidebar */}
        <div className="w-80 border-r bg-white shadow-sm flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Library className="h-5 w-5 text-orange-500" />
              Block Library
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search blocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {filteredBlocks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No blocks found</p>
                </div>
              ) : (
                filteredBlocks.map((block) => (
                  <div
                    key={block.id}
                    onClick={() => handleAddScreen(block)}
                    className="group p-4 rounded-lg border-2 border-orange-200 bg-orange-50 cursor-pointer transition-all hover:shadow-md hover:border-orange-300"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">
                          {block.name}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {block.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {block.content_type}
                      </Badge>
                      {block.estimated_duration && (
                        <>
                          <span>•</span>
                          <span>{block.estimated_duration}m</span>
                        </>
                      )}
                      {block.default_ai_config?.enabled && (
                        <>
                          <span>•</span>
                          <Sparkles className="h-3 w-3 text-purple-500" />
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-muted-foreground">
              💡 Click blocks to add them to the canvas
            </p>
          </div>
        </div>

        {/* Canvas - Main Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Controls */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 0.3}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 2}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetView}
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                Reset View
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              💡 Drag nodes to reposition • Click connection buttons to link screens
            </div>
          </div>

          {/* Canvas Area */}
          <div
            ref={canvasRef}
            className="flex-1 overflow-hidden cursor-move relative"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            style={{
              backgroundImage: `
                linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
              `,
              backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
              backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
            }}
          >
            <div
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                transformOrigin: '0 0',
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            >
              {/* SVG for connections */}
              <svg
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  overflow: 'visible',
                }}
              >
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="#f97316" />
                  </marker>
                </defs>
                {connections.map((conn) => {
                  const fromNode = screenNodes.find(n => n.id === conn.fromScreenId);
                  const toNode = screenNodes.find(n => n.id === conn.toScreenId);
                  if (!fromNode || !toNode) return null;

                  const path = getConnectionPath(fromNode, toNode);
                  const midX = (fromNode.x + fromNode.width + toNode.x) / 2;
                  const midY = (fromNode.y + toNode.y + toNode.height) / 2;

                  return (
                    <g key={conn.id}>
                      <path
                        d={path}
                        stroke="#f97316"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        style={{ pointerEvents: 'stroke' }}
                        className="cursor-pointer hover:stroke-orange-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditConnection(conn);
                        }}
                      />
                      {conn.label && (
                        <text
                          x={midX}
                          y={midY}
                          fill="#f97316"
                          fontSize="12"
                          fontWeight="600"
                          textAnchor="middle"
                          style={{ pointerEvents: 'none' }}
                        >
                          {conn.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Screen Nodes */}
              {screenNodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute cursor-move"
                  style={{
                    left: node.x,
                    top: node.y,
                    width: node.width,
                    height: node.height,
                  }}
                  onMouseDown={(e) => handleNodeMouseDown(e, node)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow border-2 border-orange-200 bg-white">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{node.name}</h3>
                          {node.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {node.description}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditScreen(node);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-600 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNode(node.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge className="text-xs">{node.screen_type}</Badge>
                        {node.content_type && (
                          <Badge variant="outline" className="text-xs">{node.content_type}</Badge>
                        )}
                        {node.duration_minutes && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {node.duration_minutes}m
                          </span>
                        )}
                        {node.ai_config?.enabled && (
                          <span className="flex items-center gap-1 text-xs text-purple-600">
                            <Sparkles className="h-3 w-3" />
                          </span>
                        )}
                      </div>

                      {/* Connection Points */}
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          {connections.filter(c => c.toScreenId === node.id).length} incoming
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={(e) => {
                            if (connectionStart === node.id) {
                              setConnectionStart(null);
                            } else if (connectionStart) {
                              handleEndConnection(node.id);
                            } else {
                              handleStartConnection(e, node.id);
                            }
                          }}
                        >
                          {connectionStart === node.id ? (
                            <X className="h-3 w-3 mr-1" />
                          ) : connectionStart ? (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowRight className="h-3 w-3 mr-1" />
                          )}
                          {connectionStart === node.id
                            ? "Cancel"
                            : connectionStart
                            ? "Link here"
                            : "Connect"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}

              {/* Empty State */}
              {screenNodes.length === 0 && (
                <div
                  className="absolute"
                  style={{
                    left: 100,
                    top: 100,
                    width: 400,
                  }}
                >
                  <Card className="border-2 border-dashed border-gray-300 bg-white/80">
                    <CardContent className="p-12 text-center">
                      <Library className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="font-semibold text-lg mb-2">Start Building Your Workshop</h3>
                      <p className="text-sm text-muted-foreground">
                        Click blocks from the library on the left to add them to the canvas
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Connection Dialog */}
      <Dialog open={connectionDialogOpen} onOpenChange={setConnectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedConnection ? "Edit Connection" : "Create Connection"}
            </DialogTitle>
            <DialogDescription>
              Configure the action and conditions for this connection
            </DialogDescription>
          </DialogHeader>

          {editingConnection && (
            <div className="space-y-4">
              <div>
                <Label>From Screen</Label>
                <div className="text-sm text-muted-foreground mt-1">
                  {screenNodes.find(n => n.id === editingConnection.fromScreenId)?.name}
                </div>
              </div>

              <div>
                <Label>To Screen</Label>
                <div className="text-sm text-muted-foreground mt-1">
                  {screenNodes.find(n => n.id === editingConnection.toScreenId)?.name}
                </div>
              </div>

              <div>
                <Label htmlFor="action">Action Type</Label>
                <Select
                  value={editingConnection.action}
                  onValueChange={(value) =>
                    setEditingConnection({ ...editingConnection, action: value })
                  }
                >
                  <SelectTrigger id="action">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next (Default)</SelectItem>
                    <SelectItem value="submit">On Submit</SelectItem>
                    <SelectItem value="success">On Success</SelectItem>
                    <SelectItem value="error">On Error</SelectItem>
                    <SelectItem value="skip">Skip/Optional</SelectItem>
                    <SelectItem value="conditional">Conditional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="label">Connection Label</Label>
                <Input
                  id="label"
                  value={editingConnection.label || ""}
                  onChange={(e) =>
                    setEditingConnection({ ...editingConnection, label: e.target.value })
                  }
                  placeholder="e.g., Next, Submit, Continue"
                />
              </div>

              {editingConnection.action === "conditional" && (
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Input
                    id="condition"
                    value={editingConnection.condition || ""}
                    onChange={(e) =>
                      setEditingConnection({ ...editingConnection, condition: e.target.value })
                    }
                    placeholder="e.g., score > 75"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Define when this path should be taken
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedConnection && (
              <Button
                variant="destructive"
                onClick={() => handleDeleteConnection(selectedConnection.id)}
              >
                Delete Connection
              </Button>
            )}
            <Button variant="outline" onClick={() => setConnectionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveConnection}>
              {selectedConnection ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
