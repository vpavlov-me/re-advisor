"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Plus,
  X,
  Users,
  MessageSquare,
  Clock,
  CheckCircle2,
  Send,
  Bot,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { FAMILY_VALUES, VALUE_CATEGORIES, type Value } from "@/lib/workshops/values";

interface Participant {
  id: number;
  name: string;
  avatar_url: string | null;
  is_online: boolean;
  current_stage: number;
}

interface Message {
  id: string;
  participant_name: string;
  message: string;
  created_at: string;
  type: 'chat' | 'system' | 'ai';
}

const MAX_SELECTIONS = 5;

export default function ValuesSelectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());
  const [customValue, setCustomValue] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); // 20 minutes in seconds
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiQuestion, setAIQuestion] = useState("");

  useEffect(() => {
    // Mock participants
    setParticipants([
      { id: 1, name: "Иван Иванов", avatar_url: null, is_online: true, current_stage: 1 },
      { id: 2, name: "Анна Иванова", avatar_url: null, is_online: true, current_stage: 1 },
      { id: 3, name: "Петр Иванов", avatar_url: null, is_online: true, current_stage: 1 },
      { id: 4, name: "Мария Иванова", avatar_url: null, is_online: false, current_stage: 0 }
    ]);

    // Mock messages
    setMessages([
      {
        id: '1',
        participant_name: 'System',
        message: 'Welcome to Stage 1: Core Values Discovery! Select 3-5 values that define your family.',
        created_at: new Date().toISOString(),
        type: 'system'
      }
    ]);

    // Timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleValue = (valueName: string) => {
    const newSelected = new Set(selectedValues);
    if (newSelected.has(valueName)) {
      newSelected.delete(valueName);
    } else {
      if (newSelected.size >= MAX_SELECTIONS) {
        toast.error(`You can select maximum ${MAX_SELECTIONS} values`);
        return;
      }
      newSelected.add(valueName);
    }
    setSelectedValues(newSelected);
  };

  const addCustomValue = () => {
    if (!customValue.trim()) {
      toast.error("Please enter a value name");
      return;
    }

    if (selectedValues.size >= MAX_SELECTIONS) {
      toast.error(`You can select maximum ${MAX_SELECTIONS} values`);
      return;
    }

    setSelectedValues(new Set([...selectedValues, customValue.trim()]));
    setCustomValue("");
    toast.success("Custom value added");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: Date.now().toString(),
      participant_name: "You",
      message: newMessage,
      created_at: new Date().toISOString(),
      type: 'chat'
    };

    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const handleAskAI = () => {
    if (!aiQuestion.trim()) return;

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        participant_name: "AI Assistant",
        message: `Based on your family context, I recommend focusing on values that guide daily decisions rather than aspirational ones. Consider: What behaviors do you consistently demonstrate? What principles have guided past difficult decisions?`,
        created_at: new Date().toISOString(),
        type: 'ai'
      };
      setMessages([...messages, aiResponse]);
    }, 1000);

    setAIQuestion("");
    setShowAIAssistant(false);
  };

  const handleContinue = () => {
    if (selectedValues.size < 3) {
      toast.error("Please select at least 3 values");
      return;
    }

    toast.success(`${selectedValues.size} values selected!`);
    router.push(`/workshops/vmv/${id}/session/values-collective`);
  };

  // Calculate value popularity (mock data)
  const getValuePopularity = (valueName: string): number => {
    const popularityMap: Record<string, number> = {
      "Integrity & Honesty": 75,
      "Family Unity": 100,
      "Education": 50,
      "Innovation": 25
    };
    return popularityMap[valueName] || 0;
  };

  return (
    <div className="min-h-screen bg-page-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">Values, Mission & Vision Workshop</h1>
              <p className="text-sm text-muted-foreground">Stage 1: Core Values Discovery</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-2">
              <Users className="h-3 w-3" />
              12 participants
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Clock className="h-3 w-3" />
              {formatTime(timeRemaining)}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content - 3 Column Layout */}
      <div className="flex-1 grid grid-cols-12 gap-6 p-6 overflow-hidden">
        {/* Left Sidebar - Facilitator Panel (if human facilitator) */}
        <div className="col-span-3 space-y-4 overflow-auto">
          {/* Stage Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Stage Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-primary">Stage 1</div>
                <div className="text-xs text-muted-foreground">of 5: Values Discovery</div>
              </div>
              <Progress value={20} className="h-2" />
            </CardContent>
          </Card>

          {/* Participant Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Participant Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {participants.map(p => (
                    <div key={p.id} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${p.is_online ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="flex-1 truncate">{p.name}</span>
                      {p.current_stage >= 1 ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Facilitator Tips */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Facilitator Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert>
                <AlertDescription className="text-xs">
                  <strong>Encourage authentic values over aspirational ones.</strong> Focus on what truly guides decisions.
                </AlertDescription>
              </Alert>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Time elapsed: {formatTime(20 * 60 - timeRemaining)}</p>
                <p>• Participants ready: 3/4</p>
                <p>• Average values selected: 4.2</p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Workshop Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </div>
                  <span className="font-medium">Values (20 min)</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    2
                  </div>
                  <span>Matrix (30 min)</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    3
                  </div>
                  <span>Mission (20 min)</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    4
                  </div>
                  <span>Vision (30 min)</span>
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    5
                  </div>
                  <span>Integration (20 min)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center - Main Content */}
        <div className="col-span-6 flex flex-col overflow-hidden">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Stage 1: Core Values Discovery
              </CardTitle>
              <CardDescription>
                Select 3-5 core values that truly define your family (20 minutes)
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 overflow-auto p-6">
              {/* Instructions */}
              <Alert className="mb-6">
                <AlertDescription>
                  <strong>Select Your Family Values:</strong> Click on values that resonate with your family.
                  Aim for 3-5 core values. You can also add custom values if needed.
                </AlertDescription>
              </Alert>

              {/* Value Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {FAMILY_VALUES.map((value) => {
                  const isSelected = selectedValues.has(value.name);
                  const popularity = getValuePopularity(value.name);
                  const category = VALUE_CATEGORIES[value.category];

                  return (
                    <button
                      key={value.name}
                      onClick={() => toggleValue(value.name)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{value.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold mb-1 flex items-center gap-2">
                            <span className="truncate">{value.name}</span>
                            {popularity > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {popularity}%
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mb-2">
                            {value.description}
                          </div>
                          <Badge variant="outline" className={`text-xs ${category.color}`}>
                            {category.label}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Value */}
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add your own value..."
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addCustomValue()}
                    />
                    <Button onClick={addCustomValue} variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>

            {/* Footer */}
            <div className="border-t p-4 bg-muted/10">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedValues.size} of {MAX_SELECTIONS}
                </div>
                <Button
                  onClick={handleContinue}
                  disabled={selectedValues.size < 3}
                >
                  Continue to Next Stage
                </Button>
              </div>
            </div>
          </Card>

          {/* Selected Values Summary */}
          {selectedValues.size > 0 && (
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Your Selected Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from(selectedValues).map((value) => (
                    <Badge key={value} variant="secondary" className="px-3 py-1.5 text-sm">
                      {value}
                      <button
                        onClick={() => toggleValue(value)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Sidebar - Participants & Chat */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          {/* Active Participants */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {participants.filter(p => p.is_online).map(p => (
                  <Avatar key={p.id} className="h-8 w-8">
                    <AvatarImage src={p.avatar_url || undefined} />
                    <AvatarFallback className="text-xs">
                      {getInitials(p.name)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {participants.filter(p => p.is_online).length} online
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Workshop Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="text-sm">
                      <div className="flex items-start gap-2">
                        {msg.type === 'ai' && <Bot className="h-4 w-4 text-blue-600 mt-0.5" />}
                        <div className="flex-1">
                          <div className="font-medium text-xs mb-1">
                            {msg.participant_name}
                          </div>
                          <div className={`text-xs ${
                            msg.type === 'system' ? 'text-muted-foreground italic' : ''
                          }`}>
                            {msg.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Separator />
              <div className="p-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Send a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={handleSendMessage}>
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowAIAssistant(!showAIAssistant)}
            className="w-full"
          >
            <Bot className="h-4 w-4 mr-2" />
            {showAIAssistant ? 'Hide' : 'Ask'} AI Assistant
          </Button>

          {showAIAssistant && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">AI Assistant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  placeholder="Ask a question..."
                  value={aiQuestion}
                  onChange={(e) => setAIQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                  className="text-sm"
                />
                <Button size="sm" onClick={handleAskAI} className="w-full">
                  Ask AI
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
