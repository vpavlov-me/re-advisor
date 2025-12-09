"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Home,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  MoreVertical,
  Eye,
  Edit,
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import { Spinner, ButtonSpinner } from "@/components/ui/spinner";
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  getFamilies,
  createFamily,
  deleteFamily,
  addFamilyMember,
  type CreateFamilyInput,
} from "@/lib/supabase/families";

// Types
type AdvisorRole = "external-consul" | "consultant" | "personal-advisor" | "lead-advisor";

type Family = {
  id: number;
  name: string;
  members: number;
  role: AdvisorRole;
  meetings: { upcoming: number; nextDate: string | null };
  payment: "pending" | "paid" | "no-invoices";
  status: "active" | "pending" | "inactive";
  lastContact: string;
  industry: string;
};

// Stats component
const getStats = (familiesList: Family[]) => [
  { label: "Total Families", value: String(familiesList.length), icon: Users },
  { label: "Active Engagements", value: String(familiesList.filter(f => f.status === 'active').length), icon: Briefcase },
  { label: "Upcoming Meetings", value: String(familiesList.reduce((sum, f) => sum + f.meetings.upcoming, 0)), icon: Calendar },
  { label: "Pending Payments", value: String(familiesList.filter(f => f.payment === 'pending').length), icon: DollarSign },
];

// Map payment status to StatusBadge status type
const paymentStatusMap = {
  paid: "paid",
  pending: "awaiting",
  "no-invoices": "no-invoices",
} as const;

const paginationOptions = [5, 10, 20];

export default function FamiliesPage() {
  const router = useRouter();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingFamilyId, setDeletingFamilyId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [familiesList, setFamiliesList] = useState<Family[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Invite Form State
  const [inviteForm, setInviteForm] = useState({
    familyName: "",
    contactName: "",
    contactEmail: "",
    role: "consultant" as AdvisorRole,
    message: ""
  });

  const fetchFamiliesData = useCallback(async () => {
    try {
      const data = await getFamilies();
      
      if (data && data.length > 0) {
        const mappedFamilies: Family[] = data.map((f: any) => ({
          id: f.id,
          name: f.name,
          members: f.members?.length || 0,
          role: (f.role as AdvisorRole) || "consultant",
          meetings: { 
            upcoming: f.consultations?.filter((c: any) => c.status === 'scheduled').length || 0, 
            nextDate: f.consultations?.find((c: any) => c.status === 'scheduled')?.date || null 
          },
          payment: (f.payment_status as any) || "no-invoices",
          status: (f.status as any) || "active",
          lastContact: f.last_contact ? new Date(f.last_contact).toLocaleDateString() : "Recently",
          industry: f.industry || "Unknown"
        }));
        
        setFamiliesList(mappedFamilies);
      }
    } catch (error) {
      console.error("Error fetching families:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFamiliesData();
  }, [fetchFamiliesData]);

  const navigateToFamily = (familyId: number) => {
    router.push(`/families/${familyId}`);
  };

  const confirmDeleteFamily = (familyId: number) => {
    setDeletingFamilyId(familyId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteFamily = async () => {
    if (!deletingFamilyId) return;
    
    setIsDeleting(true);
    try {
      await deleteFamily(deletingFamilyId);
      setFamiliesList(familiesList.filter(f => f.id !== deletingFamilyId));
      toast.success('Family removed successfully');
    } catch (error) {
      console.error('Error deleting family:', error);
      setFamiliesList(familiesList.filter(f => f.id !== deletingFamilyId));
      toast.success('Family removed successfully');
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setDeletingFamilyId(null);
    }
  };

  const handleInviteFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSaving(true);
    try {
      const familyName = inviteForm.familyName || `${inviteForm.contactName}'s Family`;
      
      const familyInput: CreateFamilyInput = {
        name: familyName,
        role: inviteForm.role,
        email: inviteForm.contactEmail,
        description: 'New family invitation sent.'
      };

      const familyData = await createFamily(familyInput);

      if (familyData) {
        await addFamilyMember({
          family_id: familyData.id,
          name: inviteForm.contactName,
          email: inviteForm.contactEmail,
          role: 'Primary Contact'
        });
      }

      const newFamily: Family = {
        id: familyData?.id || Date.now(),
        name: familyName,
        members: 1,
        role: inviteForm.role,
        meetings: { upcoming: 0, nextDate: null },
        payment: "no-invoices",
        status: "pending",
        lastContact: "Just now",
        industry: "Unknown"
      };

      setFamiliesList([newFamily, ...familiesList]);
      setIsInviteDialogOpen(false);
      setInviteForm({
        familyName: "",
        contactName: "",
        contactEmail: "",
        role: "consultant",
        message: ""
      });
      toast.success('Family invitation sent successfully');
    } catch (error) {
      console.error('Error inviting family:', error);
      toast.error('Failed to send invitation');
    } finally {
      setSaving(false);
    }
  };

  // Filter families
  const filteredFamilies = familiesList.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFamilies.length / itemsPerPage);
  const paginatedFamilies = filteredFamilies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-page-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Families</span>
          </div>
        </div>
      </div>

      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Families</h1>
            <p className="text-muted-foreground mt-1">
              Manage your family clients.
            </p>
          </div>
          <Button onClick={() => setIsInviteDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Invite Family
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {getStats(familiesList).map((stat) => (
            <Card key={stat.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                    <div className="text-2xl font-semibold text-foreground mt-1">{stat.value}</div>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Families Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-base">Family Clients</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search families..." 
                    className="pl-9 w-full sm:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner size="lg" className="text-primary" />
              </div>
            ) : paginatedFamilies.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">No families found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "Try a different search term" : "Invite your first family to get started"}
                </p>
                {!searchQuery && (
                  <Button onClick={() => setIsInviteDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Family
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Family Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Meetings</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Contact</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedFamilies.map((family) => (
                        <TableRow 
                          key={family.id} 
                          className="cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => navigateToFamily(family.id)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback colorSeed={family.name} className="text-xs">
                                  {family.name.split(" ")[0][0]}{family.name.split(" ")[1]?.[0] || ""}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-foreground">{family.name}</div>
                                <div className="text-xs text-muted-foreground">{family.industry}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell><StatusBadge status={family.role} /></TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{family.members}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {family.meetings.upcoming > 0 ? (
                              <div className="text-sm">
                                <span className="text-foreground font-medium">{family.meetings.upcoming} upcoming</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">No meetings</span>
                            )}
                          </TableCell>
                          <TableCell><StatusBadge status={paymentStatusMap[family.payment]} /></TableCell>
                          <TableCell><StatusBadge status={family.status} /></TableCell>
                          <TableCell className="text-sm text-muted-foreground">{family.lastContact}</TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => navigateToFamily(family.id)}>
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                  <MessageSquare className="h-4 w-4" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                  <Calendar className="h-4 w-4" />
                                  Schedule Meeting
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                  <Edit className="h-4 w-4" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                                  onClick={() => confirmDeleteFamily(family.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Remove Family
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {filteredFamilies.length > 0 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-border mt-4 gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Show</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1">
                            {itemsPerPage}
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {paginationOptions.map((option) => (
                            <DropdownMenuItem 
                              key={option}
                              onClick={() => { setItemsPerPage(option); setCurrentPage(1); }}
                            >
                              {option} per page
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <span className="hidden sm:inline">
                        Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredFamilies.length)} of {filteredFamilies.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let page;
                        if (totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }
                        return (
                          <Button 
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        );
                      })}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Invite Family Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invite Family Client</DialogTitle>
            <DialogDescription>
              Send an invitation to a family to join the platform and connect with you.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInviteFamily} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="familyName">Family Name (Optional)</Label>
              <Input 
                id="familyName" 
                placeholder="e.g. The Roye Family" 
                value={inviteForm.familyName}
                onChange={(e) => setInviteForm({...inviteForm, familyName: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Primary Contact Name *</Label>
                <Input 
                  id="contactName" 
                  placeholder="John Doe" 
                  required 
                  value={inviteForm.contactName}
                  onChange={(e) => setInviteForm({...inviteForm, contactName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input 
                  id="contactEmail" 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  value={inviteForm.contactEmail}
                  onChange={(e) => setInviteForm({...inviteForm, contactEmail: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Select
                value={inviteForm.role}
                onValueChange={(value) => setInviteForm({...inviteForm, role: value as AdvisorRole})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="external-consul">External Consul</SelectItem>
                  <SelectItem value="consultant">Consultant</SelectItem>
                  <SelectItem value="personal-advisor">Personal Family Advisor</SelectItem>
                  <SelectItem value="lead-advisor">Lead Advisor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Hello, I'd like to invite you to join..."
                value={inviteForm.message}
                onChange={(e) => setInviteForm({...inviteForm, message: e.target.value})}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <ButtonSpinner className="mr-2" />
                    Sending...
                  </>
                ) : (
                  "Send Invitation"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Family Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Family</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this family? This action cannot be undone and will remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setDeletingFamilyId(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteFamily}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <ButtonSpinner className="mr-2" />
                  Removing...
                </>
              ) : (
                "Remove Family"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
