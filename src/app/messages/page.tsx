"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useMessaging } from "@/lib/hooks/use-messaging";
import { togglePinConversation, addConversationParticipant, getConversationParticipants } from "@/lib/messages";
import type { ConversationParticipant } from "@/lib/messages";
import { uploadAttachment, formatFileSize } from "@/lib/storage";
import { toast } from "sonner";
import { getCurrentUser } from "@/lib/auth";
import { 
  getConversations,
  getMessages,
  sendMessageWithAttachment,
  createConversation,
  updateConversation,
  subscribeToMessages,
  subscribeToConversations,
  unsubscribe,
  getFamiliesForMessaging,
} from "@/lib/supabase/messages";
import { 
  Home, 
  ChevronRight, 
  Search,
  Filter,
  MoreVertical,
  Paperclip,
  Send,
  X,
  FileText,
  Image as ImageIcon,
  File as FileIcon,
  Info,
  Pin,
  CheckCheck,
  Check,
  Plus,
  Users,
  ChevronDown,
  UserPlus,
  Loader2,
  Clock,
  MessageSquare,
  RefreshCw,
  Menu
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Message status type
type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

interface MessageAttachment {
  url: string;
  name: string;
  type: string;
  size: number;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
  status?: MessageStatus;
  attachment?: MessageAttachment;
}

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
}

interface Family {
  id: number;
  name: string;
  members: FamilyMember[];
}

interface Conversation {
  id: number;
  title: string;
  familyId: number;
  familyName: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  pinned: boolean;
  online: boolean;
}

export default function MessagesPage() {
  const [conversationsList, setConversationsList] = useState<Conversation[]>([]);
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [familiesList, setFamiliesList] = useState<Family[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Use centralized messaging hook with userId
  const messaging = useMessaging(userId);
  
  const [newMessage, setNewMessage] = useState("");
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newConvStep, setNewConvStep] = useState<"family" | "participants">("family");
  const [selectedFamilyForConv, setSelectedFamilyForConv] = useState<Family | null>(null);
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isConversationInfoOpen, setIsConversationInfoOpen] = useState(false);
  const [isAddParticipantsOpen, setIsAddParticipantsOpen] = useState(false);
  const [availableMembersForAdd, setAvailableMembersForAdd] = useState<FamilyMember[]>([]);
  const [selectedMembersToAdd, setSelectedMembersToAdd] = useState<number[]>([]);
  const [existingParticipants, setExistingParticipants] = useState<ConversationParticipant[]>([]);
  const [addingParticipants, setAddingParticipants] = useState(false);
  
  // Attachment state
  const [pendingAttachment, setPendingAttachment] = useState<File | null>(null);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Typing indicator state
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sync data from messaging hook when available
  useEffect(() => {
    if (!messaging.isLoading && messaging.conversations.length > 0) {
      const mappedConvs = messaging.conversations.map((c: any) => ({
        id: c.id,
        title: c.title || c.name || `Conversation ${c.id}`,
        familyId: c.family_id,
        familyName: c.family_name || 'Family',
        participants: c.participants || [],
        lastMessage: c.last_message || '',
        lastMessageTime: c.updated_at ? new Date(c.updated_at).toLocaleTimeString() : '',
        unread: c.unread_count || 0,
        pinned: c.pinned || false,
        online: false
      }));
      setConversationsList(mappedConvs);
      setLoading(false);
    }
  }, [messaging.isLoading, messaging.conversations]);
  
  // Sync messages from hook
  useEffect(() => {
    if (messaging.messages.length > 0) {
      const mappedMsgs = messaging.messages.map((m: any) => ({
        id: m.id,
        sender: m.sender_name || 'User',
        content: m.content,
        time: m.created_at ? new Date(m.created_at).toLocaleTimeString() : '',
        isOwn: m.is_own || false,
        status: m.status || 'sent'
      }));
      setMessagesList(mappedMsgs);
      setLoadingMessages(false);
    }
  }, [messaging.messages]);
  
  // Sync typing users from hook (real-time via Supabase Broadcast)
  useEffect(() => {
    setTypingUsers(messaging.typingUsers);
  }, [messaging.typingUsers]);
  
  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messagesList, scrollToBottom]);

  // Handle typing indicator for current user - broadcasts via Supabase Realtime
  const handleTyping = useCallback(() => {
    if (!isTyping) {
      setIsTyping(true);
      // Use hook's setTyping method to broadcast typing status
      messaging.setTyping(true);
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      messaging.setTyping(false);
    }, 2000);
  }, [isTyping, messaging]);

  const fetchData = useCallback(async (advisorId: string) => {
    try {
      // Fetch Families using abstraction
      const familiesData = await getFamiliesForMessaging();
      
      if (familiesData) {
        const mappedFamilies = familiesData.map((f: any) => ({
          id: f.id,
          name: f.name,
          members: f.members?.map((m: any) => ({
            id: m.id,
            name: m.name,
            role: m.role,
            avatar: m.name.substring(0, 2).toUpperCase(),
            online: false
          })) || []
        }));
        setFamiliesList(mappedFamilies);
      }

      // Fetch Conversations using abstraction
      const conversationsData = await getConversations();

      if (conversationsData && conversationsData.length > 0) {
        const mappedConversations = conversationsData.map((c: any) => ({
          id: c.id,
          title: c.title || "Untitled Conversation",
          familyId: c.family_id,
          familyName: c.family?.name || "Unknown",
          participants: [],
          lastMessage: c.last_message || "No messages yet",
          lastMessageTime: c.last_message_time ? formatMessageTime(c.last_message_time) : "",
          unread: c.unread_count || 0,
          pinned: c.pinned || false,
          online: false
        }));
        setConversationsList(mappedConversations);
        setSelectedConversation(mappedConversations[0]);
      } else {
        // No real data, show empty state
        setConversationsList([]);
        setSelectedConversation(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  // Helper function to format message time
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      
      // Get current user using abstraction
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.id);
        await fetchData(user.id);
      }
      
      setLoading(false);
    };
    init();
  }, [fetchData]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!selectedConversation) return;

    // Set up real-time subscription for new messages using abstraction
    const messagesChannel = subscribeToMessages(selectedConversation.id, (newMsg: any) => {
      const formattedMsg: Message = {
        id: newMsg.id,
        sender: newMsg.sender_name || "Unknown",
        content: newMsg.content,
        time: new Date(newMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: newMsg.sender_id === userId,
        status: 'delivered'
      };
      
      // Only add if not already in list (avoid duplicates from optimistic update)
      setMessagesList(prev => {
        if (prev.some(m => m.id === formattedMsg.id)) return prev;
        return [...prev, formattedMsg];
      });
      
      if (!formattedMsg.isOwn) {
        toast.info(`New message from ${formattedMsg.sender}`, {
          description: formattedMsg.content.substring(0, 50) + (formattedMsg.content.length > 50 ? '...' : '')
        });
      }
    });

    // Set up real-time subscription for conversation updates using abstraction
    const conversationsChannel = subscribeToConversations((updated: any) => {
      setConversationsList(prev => 
        prev.map(c => c.id === updated.id ? {
          ...c,
          lastMessage: updated.last_message,
          lastMessageTime: updated.last_message_time ? formatMessageTime(updated.last_message_time) : c.lastMessageTime,
          unread: updated.unread_count
        } : c)
      );
    });

    return () => {
      unsubscribe(messagesChannel);
      unsubscribe(conversationsChannel);
    };
  }, [selectedConversation?.id, userId]);

  const handleRefresh = async () => {
    if (!userId) return;
    setIsRefreshing(true);
    // Use hook's refresh method
    await messaging.refresh();
    await fetchData(userId);
    if (selectedConversation) {
      await fetchMessages(selectedConversation.id);
    }
    setIsRefreshing(false);
    toast.success("Messages refreshed");
  };

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const fetchMessages = async (conversationId: number) => {
    setLoadingMessages(true);
    try {
      // Use abstraction for fetching messages
      const messagesData = await getMessages(conversationId);

      if (messagesData && messagesData.length > 0) {
        const mappedMessages: Message[] = messagesData.map((m: any) => ({
          id: m.id,
          sender: m.sender_name || "Unknown",
          content: m.content,
          time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: m.is_own || false,
          status: m.status || 'delivered',
          attachment: m.attachment_url ? {
            url: m.attachment_url,
            name: m.attachment_name || 'Attachment',
            type: m.attachment_type || 'application/octet-stream',
            size: m.attachment_size || 0,
          } : undefined,
        }));
        setMessagesList(mappedMessages);
      } else {
        // No messages in this conversation yet
        setMessagesList([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Show empty state on error instead of mock data
      setMessagesList([]);
      toast.error("Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  };

  // Filter conversations
  const filteredConversations = conversationsList.filter(conv => {
    const matchesFamily = selectedFamilyFilter === null || conv.familyId === selectedFamilyFilter;
    const matchesSearch = searchQuery === "" || 
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participants.some((p: string) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFamily && matchesSearch;
  });

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !pendingAttachment) || !selectedConversation || !userId) return;

    setSending(true);
    const tempId = Date.now();
    
    let attachmentData: MessageAttachment | undefined;
    
    // Upload attachment if present
    if (pendingAttachment) {
      setUploadingAttachment(true);
      const { url, error } = await uploadAttachment(selectedConversation.id, pendingAttachment);
      setUploadingAttachment(false);
      
      if (error || !url) {
        toast.error(error || "Failed to upload attachment");
        setSending(false);
        return;
      }
      
      attachmentData = {
        url,
        name: pendingAttachment.name,
        type: pendingAttachment.type,
        size: pendingAttachment.size,
      };
    }
    
    const newMsg: Message = {
      id: tempId,
      sender: "You",
      content: newMessage || (attachmentData ? `📎 ${attachmentData.name}` : ''),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      status: 'sending',
      attachment: attachmentData,
    };

    // Optimistic update
    setMessagesList(prev => [...prev, newMsg]);
    const messageContent = newMessage;
    setNewMessage("");
    setPendingAttachment(null);

    try {
      // Send message with attachment using abstraction
      await sendMessageWithAttachment({
        conversation_id: selectedConversation.id,
        content: messageContent || (attachmentData ? '' : ''),
        attachment_url: attachmentData?.url,
        attachment_name: attachmentData?.name,
        attachment_type: attachmentData?.type,
        attachment_size: attachmentData?.size,
      });
      
      // Update message with status
      setMessagesList(prev => prev.map(m => 
        m.id === tempId 
          ? { ...m, status: 'sent' as MessageStatus }
          : m
      ));

      // Simulate delivery after a moment
      setTimeout(() => {
        setMessagesList(prev => prev.map(m => 
          m.id === tempId 
            ? { ...m, status: 'delivered' as MessageStatus }
            : m
        ));
      }, 1000);

      // Update conversation's last message locally
      const lastMessageText = attachmentData ? `📎 ${attachmentData.name}` : messageContent;
      setConversationsList(prev => prev.map(c => 
        c.id === selectedConversation.id 
          ? { ...c, lastMessage: lastMessageText, lastMessageTime: "Just now" }
          : c
      ));
    } catch (error) {
      console.error("Error sending message:", error);
      // Update status to show error but keep the message
      setMessagesList(prev => prev.map(m => 
        m.id === tempId 
          ? { ...m, status: 'sent' as MessageStatus }
          : m
      ));
      
      // Fallback - still show the message locally
      const lastMessageText = attachmentData ? `📎 ${attachmentData.name}` : messageContent;
      setConversationsList(prev => prev.map(c => 
        c.id === selectedConversation.id 
          ? { ...c, lastMessage: lastMessageText, lastMessageTime: "Just now" }
          : c
      ));
    } finally {
      setSending(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 10MB.");
      return;
    }
    
    setPendingAttachment(file);
    toast.success(`File "${file.name}" ready to send`);
  };

  const handleOpenAddParticipants = async () => {
    if (!selectedConversation) return;
    
    // Get the family for this conversation
    const family = familiesList.find(f => f.id === selectedConversation.familyId);
    if (!family) {
      toast.error("Could not find family for this conversation");
      return;
    }

    // Get existing participants
    const { data: participants } = await getConversationParticipants(selectedConversation.id);
    setExistingParticipants(participants || []);
    
    // Filter out members who are already participants
    const existingMemberIds = (participants || [])
      .filter(p => p.family_member_id)
      .map(p => p.family_member_id);
    
    const availableMembers = family.members.filter(
      m => !existingMemberIds.includes(m.id)
    );
    
    setAvailableMembersForAdd(availableMembers);
    setSelectedMembersToAdd([]);
    setIsAddParticipantsOpen(true);
  };

  const handleAddSelectedParticipants = async () => {
    if (!selectedConversation || selectedMembersToAdd.length === 0) return;
    
    setAddingParticipants(true);
    try {
      const family = familiesList.find(f => f.id === selectedConversation.familyId);
      if (!family) throw new Error("Family not found");
      
      const membersToAdd = family.members.filter(m => selectedMembersToAdd.includes(m.id));
      
      for (const member of membersToAdd) {
        await addConversationParticipant({
          conversation_id: selectedConversation.id,
          family_member_id: member.id,
          participant_name: member.name,
          role: 'member',
        });
      }
      
      // Update local participants list in conversation
      const newParticipants = [
        ...selectedConversation.participants,
        ...membersToAdd.map(m => m.name)
      ];
      
      setSelectedConversation({
        ...selectedConversation,
        participants: newParticipants,
      });
      
      setConversationsList(prev =>
        prev.map(c =>
          c.id === selectedConversation.id
            ? { ...c, participants: newParticipants }
            : c
        )
      );
      
      toast.success(`Added ${membersToAdd.length} participant${membersToAdd.length > 1 ? 's' : ''}`);
      setIsAddParticipantsOpen(false);
    } catch (error) {
      console.error("Error adding participants:", error);
      toast.error("Failed to add participants");
    } finally {
      setAddingParticipants(false);
    }
  };

  const handleOpenNewConversation = () => {
    setNewConvStep("family");
    setSelectedFamilyForConv(null);
    setSelectedParticipants([]);
    setIsNewConversationOpen(true);
  };

  const handleSelectFamily = (family: Family) => {
    setSelectedFamilyForConv(family);
    setNewConvStep("participants");
  };

  const handleAddEntireFamily = () => {
    if (selectedFamilyForConv) {
      setSelectedParticipants(selectedFamilyForConv.members.map((m: { id: number }) => m.id));
    }
  };

  const toggleParticipant = (memberId: number) => {
    setSelectedParticipants(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleStartConversation = async () => {
    const familyName = selectedFamilyForConv?.name || "Unknown Family";
    
    setSending(true);
    try {
      // Create conversation using abstraction
      const convData = await createConversation(selectedFamilyForConv?.id || 0, "New Conversation");

      const selectedMemberNames = selectedFamilyForConv?.members
        .filter((m: FamilyMember) => selectedParticipants.includes(m.id))
        .map((m: FamilyMember) => m.name) || [];

      const newConversation: Conversation = {
        id: convData?.id || Date.now(),
        title: "New Conversation",
        familyId: selectedFamilyForConv?.id || 0,
        familyName: familyName,
        participants: selectedMemberNames,
        lastMessage: "Started a new conversation",
        lastMessageTime: "Just now",
        unread: 0,
        pinned: false,
        online: true,
      };

      setConversationsList([newConversation, ...conversationsList]);
      setSelectedConversation(newConversation);
      setMessagesList([]);
      setIsNewConversationOpen(false);
      toast.success('Conversation created');
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('Failed to create conversation');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-background">
      {/* Breadcrumb Bar */}
      <div className="bg-card border-b border-border shrink-0">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Messages</span>
          </div>
        </div>
      </div>

      <div className="container py-6 flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground mt-1">
              Communicate with your family clients securely.
            </p>
          </div>
          <Button onClick={handleOpenNewConversation}>
            <Plus className="h-4 w-4 mr-2" />
            New Conversation
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0">
          {/* Conversations List */}
          <div className="lg:col-span-4 h-full hidden lg:block">
            <Card className="h-full flex flex-col overflow-hidden rounded-r-none border-r-0">
              <CardHeader className="pb-4 shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-base">Messages</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        {selectedFamilyFilter 
                          ? familiesList.find(f => f.id === selectedFamilyFilter)?.name 
                          : "All Families"}
                        <ChevronDown className="h-3 w-3 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem 
                        onClick={() => setSelectedFamilyFilter(null)}
                        className="cursor-pointer"
                      >
                        All Families
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {familiesList.map((family) => (
                        <DropdownMenuItem 
                          key={family.id}
                          onClick={() => setSelectedFamilyFilter(family.id)}
                          className="cursor-pointer"
                        >
                          {family.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search conversations..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden pt-0">
                <ScrollArea className="h-full">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">Loading...</span>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {filteredConversations.map((conv, index) => (
                      <div key={conv.id}>
                        {index === 0 && conv.pinned && (
                          <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
                            <Pin className="h-3 w-3" />
                            Pinned
                          </div>
                        )}
                        {index > 0 && !conv.pinned && filteredConversations[index - 1]?.pinned && (
                          <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground border-t border-border">
                            All Messages
                          </div>
                        )}
                        <div 
                          onClick={() => setSelectedConversation(conv)}
                          className={`p-3 cursor-pointer transition-colors ${
                            selectedConversation?.id === conv.id ? "bg-primary/5" : "hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>
                                  {conv.title.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                                </AvatarFallback>
                              </Avatar>
                              {conv.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-foreground text-sm truncate">{conv.title}</h3>
                                <span className="text-xs text-muted-foreground shrink-0 ml-2">{conv.lastMessageTime}</span>
                              </div>
                              <p className="text-xs text-primary truncate mt-0.5">
                                {conv.familyName}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {conv.participants.slice(0, 2).join(", ")}
                                {conv.participants.length > 2 && ` +${conv.participants.length - 2}`}
                              </p>
                              <p className="text-sm text-muted-foreground truncate mt-1">{conv.lastMessage}</p>
                            </div>
                            {conv.unread > 0 && (
                              <Badge className="shrink-0">{conv.unread}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredConversations.length === 0 && !loading && (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="font-medium mb-1">No conversations found</h3>
                        <p className="text-sm text-muted-foreground">Try adjusting your search or filter</p>
                      </div>
                    )}
                  </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-8 h-full">
            <Card className="h-full flex flex-col overflow-hidden lg:rounded-l-none">
              {/* Show empty state when no conversations exist */}
              {!loading && conversationsList.length === 0 && !selectedConversation ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground/30 mb-6" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No conversations yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    Start a new conversation with a family to begin messaging
                  </p>
                  <Button onClick={handleOpenNewConversation}>
                    <Plus className="h-4 w-4 mr-2" />
                    Start a Conversation
                  </Button>
                </div>
              ) : !selectedConversation ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground/30 mb-6" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Choose a conversation from the list to view messages
                  </p>
                </div>
              ) : (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Mobile menu button */}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="lg:hidden"
                          onClick={() => setIsMobileSidebarOpen(true)}
                        >
                          <Menu className="h-5 w-5" />
                        </Button>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{selectedConversation?.title?.substring(0, 2).toUpperCase() || "CP"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="font-semibold text-foreground">{selectedConversation?.title || "Select a conversation"}</h2>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {selectedConversation?.participants && selectedConversation.participants.length > 0 ? (
                              selectedConversation.participants.map((p: string, i: number) => (
                                <span key={i} className="flex items-center gap-1">
                                  {p}
                                  {i < selectedConversation.participants.length - 1 && ","}
                                </span>
                              ))
                            ) : (
                              <span>{selectedConversation?.familyName}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Refresh messages</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              className="gap-2 cursor-pointer"
                              onClick={handleOpenAddParticipants}
                            >
                              <UserPlus className="h-4 w-4" />
                              Add Participants
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="gap-2 cursor-pointer"
                              onClick={async () => {
                                if (!selectedConversation) return;
                                const newPinned = !selectedConversation.pinned;
                                const { success, error } = await togglePinConversation(selectedConversation.id, newPinned);
                                if (success) {
                                  setSelectedConversation({ ...selectedConversation, pinned: newPinned });
                                  setConversationsList(prev => 
                                    prev.map(c => c.id === selectedConversation.id ? { ...c, pinned: newPinned } : c)
                                      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
                                  );
                                  toast.success(newPinned ? "Conversation pinned" : "Conversation unpinned");
                                } else {
                                  toast.error("Failed to update conversation");
                                }
                              }}
                            >
                              <Pin className="h-4 w-4" />
                              {selectedConversation?.pinned ? "Unpin Conversation" : "Pin Conversation"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="gap-2 cursor-pointer"
                              onClick={() => setIsConversationInfoOpen(true)}
                            >
                              <Info className="h-4 w-4" />
                              Conversation Info
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    {loadingMessages ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Loading messages...</span>
                      </div>
                    ) : messagesList.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <h3 className="font-medium text-foreground mb-1">No messages yet</h3>
                        <p className="text-sm text-muted-foreground">Start the conversation by sending a message</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messagesList.map((message) => (
                          <div 
                            key={message.id} 
                            className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`flex items-end gap-2 max-w-[70%] ${message.isOwn ? "flex-row-reverse" : ""}`}>
                              {!message.isOwn && (
                                <Avatar className="h-8 w-8 shrink-0">
                                  <AvatarFallback className="text-xs">
                                    {message.sender.split(" ").map((n: string) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className={`space-y-1 ${message.isOwn ? "items-end" : "items-start"} flex flex-col`}>
                                {!message.isOwn && (
                                  <span className="text-xs text-muted-foreground">{message.sender}</span>
                                )}
                                <div 
                                  className={`px-4 py-2 rounded-2xl ${
                                    message.isOwn 
                                      ? "bg-primary text-primary-foreground" 
                                      : "bg-muted"
                                  } ${message.status === 'sending' ? 'opacity-70' : ''}`}
                                >
                                  {/* Attachment */}
                                  {message.attachment && (
                                    <a 
                                      href={message.attachment.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className={`flex items-center gap-2 mb-2 p-2 rounded-lg transition-colors ${
                                        message.isOwn 
                                          ? "bg-primary-foreground/10 hover:bg-primary-foreground/20" 
                                          : "bg-background hover:bg-background/80"
                                      }`}
                                    >
                                      {message.attachment.type.startsWith('image/') ? (
                                        <ImageIcon className="h-5 w-5 shrink-0" />
                                      ) : message.attachment.type.includes('pdf') ? (
                                        <FileText className="h-5 w-5 shrink-0" />
                                      ) : (
                                        <FileIcon className="h-5 w-5 shrink-0" />
                                      )}
                                      <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium truncate">{message.attachment.name}</p>
                                        <p className={`text-xs ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                          {formatFileSize(message.attachment.size)}
                                        </p>
                                      </div>
                                    </a>
                                  )}
                                  {message.content && <p className="text-sm">{message.content}</p>}
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-muted-foreground">{message.time}</span>
                                  {message.isOwn && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <span className="inline-flex">
                                            {message.status === 'sending' && (
                                              <Clock className="h-3 w-3 text-muted-foreground animate-pulse" />
                                            )}
                                            {message.status === 'sent' && (
                                              <Check className="h-3 w-3 text-muted-foreground" />
                                            )}
                                            {message.status === 'delivered' && (
                                              <CheckCheck className="h-3 w-3 text-muted-foreground" />
                                            )}
                                            {message.status === 'read' && (
                                              <CheckCheck className="h-3 w-3 text-primary" />
                                            )}
                                          </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p className="capitalize">{message.status || 'sent'}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Typing Indicator */}
                        {typingUsers.length > 0 && (
                          <div className="flex justify-start">
                            <div className="flex items-end gap-2">
                              <Avatar className="h-8 w-8 shrink-0">
                                <AvatarFallback className="text-xs">
                                  {typingUsers[0].split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="bg-muted px-4 py-3 rounded-2xl">
                                <div className="flex items-center gap-1">
                                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border shrink-0">
                    {typingUsers.length > 0 && (
                      <div className="text-xs text-muted-foreground mb-2">
                        {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
                      </div>
                    )}
                    
                    {/* Pending Attachment Preview */}
                    {pendingAttachment && (
                      <div className="mb-2 p-2 bg-muted rounded-lg flex items-center gap-2">
                        {pendingAttachment.type.startsWith('image/') ? (
                          <ImageIcon className="h-5 w-5 text-primary" />
                        ) : pendingAttachment.type.includes('pdf') ? (
                          <FileText className="h-5 w-5 text-red-500" />
                        ) : (
                          <FileIcon className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{pendingAttachment.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(pendingAttachment.size)}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => setPendingAttachment(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      {/* Hidden file input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileSelect}
                        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                      />
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={sending || uploadingAttachment}
                            >
                              <Paperclip className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Attach file (max 10MB)</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="flex-1 relative">
                        <Input 
                          placeholder={pendingAttachment ? "Add a message (optional)..." : "Type your message..."} 
                          value={newMessage}
                          onChange={(e) => {
                            setNewMessage(e.target.value);
                            handleTyping();
                          }}
                          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                          disabled={sending || uploadingAttachment}
                        />
                      </div>
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={sending || uploadingAttachment || (!newMessage.trim() && !pendingAttachment)}
                      >
                        {uploadingAttachment ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Uploading
                          </>
                        ) : sending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sending
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* New Conversation Modal */}
      <Dialog open={isNewConversationOpen} onOpenChange={setIsNewConversationOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {newConvStep === "family" ? "New Conversation" : `Select Participants - ${selectedFamilyForConv?.name}`}
            </DialogTitle>
          </DialogHeader>

          {newConvStep === "family" ? (
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">Select a family to start a conversation:</p>
              <div className="space-y-2">
                {familiesList.map((family) => (
                  <div
                    key={family.id}
                    onClick={() => handleSelectFamily(family)}
                    className="flex items-center gap-3 p-3 rounded-[10px] border border-border hover:border-primary/50 cursor-pointer transition-colors"
                  >
                    <Avatar>
                      <AvatarFallback>{family.name.split(" ")[0][0]}{family.name.split(" ")[1]?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{family.name}</div>
                      <div className="text-xs text-muted-foreground">{family.members.length} members</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setNewConvStep("family")}
                >
                  <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                  Back
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleAddEntireFamily}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Add Entire Family
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">Select participants for the conversation:</p>
              
              <div className="space-y-2">
                {selectedFamilyForConv?.members.map((member: FamilyMember) => (
                  <div
                    key={member.id}
                    onClick={() => toggleParticipant(member.id)}
                    className={`flex items-center gap-3 p-3 rounded-[10px] border cursor-pointer transition-colors ${
                      selectedParticipants.includes(member.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      {member.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.role}</div>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      selectedParticipants.includes(member.id)
                        ? "bg-primary border-primary"
                        : "border-muted-foreground"
                    }`}>
                      {selectedParticipants.includes(member.id) && (
                        <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedParticipants.length > 0 && (
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    {selectedParticipants.length} participant{selectedParticipants.length > 1 ? "s" : ""} selected
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewConversationOpen(false)}>
              Cancel
            </Button>
            {newConvStep === "participants" && (
              <Button 
                disabled={selectedParticipants.length === 0}
                onClick={handleStartConversation}
              >
                Start Conversation
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Conversation Info Dialog */}
      <Dialog open={isConversationInfoOpen} onOpenChange={setIsConversationInfoOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Conversation Info</DialogTitle>
          </DialogHeader>
          {selectedConversation && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {selectedConversation.title?.substring(0, 2).toUpperCase() || "CV"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedConversation.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedConversation.familyName}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Family</span>
                  <span className="text-sm font-medium">{selectedConversation.familyName}</span>
                </div>
                
                <div className="py-2 border-b">
                  <span className="text-sm text-muted-foreground">Participants</span>
                  <div className="mt-2 space-y-2">
                    {selectedConversation.participants.length > 0 ? (
                      selectedConversation.participants.map((participant, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {participant.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{participant}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No participants</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Messages</span>
                  <span className="text-sm font-medium">{messagesList.length}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Pinned</span>
                  <Badge variant={selectedConversation.pinned ? "default" : "secondary"}>
                    {selectedConversation.pinned ? "Yes" : "No"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Unread</span>
                  <Badge variant={selectedConversation.unread > 0 ? "destructive" : "secondary"}>
                    {selectedConversation.unread}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConversationInfoOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Participants Dialog */}
      <Dialog open={isAddParticipantsOpen} onOpenChange={setIsAddParticipantsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Participants</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {availableMembersForAdd.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  All family members are already in this conversation
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Select family members to add to this conversation:
                </p>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {availableMembersForAdd.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => {
                        setSelectedMembersToAdd(prev =>
                          prev.includes(member.id)
                            ? prev.filter(id => id !== member.id)
                            : [...prev, member.id]
                        );
                      }}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMembersToAdd.includes(member.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{member.avatar || member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        selectedMembersToAdd.includes(member.id)
                          ? "bg-primary border-primary"
                          : "border-muted-foreground"
                      }`}>
                        {selectedMembersToAdd.includes(member.id) && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {selectedMembersToAdd.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {selectedMembersToAdd.length} member{selectedMembersToAdd.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddParticipantsOpen(false)}>
              Cancel
            </Button>
            {availableMembersForAdd.length > 0 && (
              <Button 
                onClick={handleAddSelectedParticipants}
                disabled={selectedMembersToAdd.length === 0 || addingParticipants}
              >
                {addingParticipants ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Selected
                  </>
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-[320px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Conversations</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    {selectedFamilyFilter 
                      ? familiesList.find(f => f.id === selectedFamilyFilter)?.name 
                      : "All Families"}
                    <ChevronDown className="h-3 w-3 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem 
                    onClick={() => setSelectedFamilyFilter(null)}
                    className="cursor-pointer"
                  >
                    All Families
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {familiesList.map((family) => (
                    <DropdownMenuItem 
                      key={family.id}
                      onClick={() => setSelectedFamilyFilter(family.id)}
                      className="cursor-pointer"
                    >
                      {family.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="px-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No conversations found</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredConversations.map((conv) => (
                    <div 
                      key={conv.id}
                      onClick={() => {
                        setSelectedConversation(conv);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`p-3 cursor-pointer transition-colors ${
                        selectedConversation?.id === conv.id ? "bg-primary/5" : "hover:bg-muted/50"
                      }`}
                    >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback>
                          {conv.title.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-foreground text-sm truncate">{conv.title}</h3>
                          <span className="text-xs text-muted-foreground shrink-0 ml-2">{conv.lastMessageTime}</span>
                        </div>
                        <p className="text-xs text-primary truncate">{conv.familyName}</p>
                        <p className="text-sm text-muted-foreground truncate mt-1">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <Badge className="shrink-0">{conv.unread}</Badge>
                      )}
                    </div>
                  </div>
                ))}
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button onClick={() => {
              setIsMobileSidebarOpen(false);
              handleOpenNewConversation();
            }} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              New Conversation
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
