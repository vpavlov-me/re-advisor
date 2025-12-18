"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, CheckCircle2, ChevronLeft, UserPlus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import Link from "next/link";

interface FamilyMember {
  id: number;
  user_id: string | null;
  name: string;
  role: string;
  avatar_url: string | null;
  is_registered: boolean;
}

export default function ParticipantsSelectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // TODO: Fetch family members from API
    // Mock data for now
    setTimeout(() => {
      setFamilyMembers([
        {
          id: 1,
          user_id: "uuid-1",
          name: "Иван Иванов",
          role: "Глава семьи",
          avatar_url: null,
          is_registered: true
        },
        {
          id: 2,
          user_id: "uuid-2",
          name: "Анна Иванова",
          role: "Супруга",
          avatar_url: null,
          is_registered: true
        },
        {
          id: 3,
          user_id: "uuid-3",
          name: "Петр Иванов",
          role: "Сын",
          avatar_url: null,
          is_registered: true
        },
        {
          id: 4,
          user_id: null,
          name: "Мария Иванова",
          role: "Дочь",
          avatar_url: null,
          is_registered: true
        },
        {
          id: 5,
          user_id: null,
          name: "Елена Иванова",
          role: "Мать",
          avatar_url: null,
          is_registered: true
        },
        {
          id: 6,
          user_id: "uuid-6",
          name: "Дмитрий Иванов",
          role: "Брат",
          avatar_url: null,
          is_registered: true
        },
        {
          id: 7,
          user_id: null,
          name: "Ольга Петрова",
          role: "Сестра",
          avatar_url: null,
          is_registered: true
        },
        {
          id: 8,
          user_id: "uuid-8",
          name: "Александр Иванов",
          role: "Дядя",
          avatar_url: null,
          is_registered: true
        }
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredMembers = familyMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleParticipant = (memberId: number) => {
    const newSelected = new Set(selectedParticipants);
    if (newSelected.has(memberId)) {
      newSelected.delete(memberId);
    } else {
      newSelected.add(memberId);
    }
    setSelectedParticipants(newSelected);
  };

  const handleNext = async () => {
    if (selectedParticipants.size === 0) {
      toast.error("Please select at least one participant");
      return;
    }

    setIsSaving(true);

    try {
      // TODO: Save participants to API
      await new Promise(resolve => setTimeout(resolve, 500));

      toast.success(`${selectedParticipants.size} participants added`);
      router.push(`/workshops/vmv/${id}/setup/guests`);
    } catch (error) {
      console.error("Error saving participants:", error);
      toast.error("Failed to save participants");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-page-background py-8 px-4">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/workshops/vmv/${id}/setup/format`}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Select Participants</h1>
              <p className="text-muted-foreground">
                Choose family members who should participate in the workshop
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Step 2 of 4
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Info Alert */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Подсказка:</strong> Выберите членов семьи, которые должны участвовать в воркшопе.
              Им будет отправлено уведомление о начале сессии.
            </AlertDescription>
          </Alert>

          {/* Selected Count */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registered Participants</CardTitle>
                  <CardDescription>
                    Add registered family members from the platform
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{selectedParticipants.size}</div>
                    <div className="text-xs text-muted-foreground">Selected</div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Начните вводить имя или роль..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Members List */}
          <Card>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  Loading family members...
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No family members found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMembers.map((member) => {
                    const isSelected = selectedParticipants.has(member.id);

                    return (
                      <button
                        key={member.id}
                        onClick={() => toggleParticipant(member.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        {/* Avatar */}
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar_url || undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="flex-1 text-left">
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                          {member.is_registered && (
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" />
                              Зарегистрирован
                            </Badge>
                          )}
                          {isSelected && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleParticipant(member.id);
                              }}
                            >
                              Убрать
                            </Button>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Selected Participants Summary */}
          {selectedParticipants.size > 0 && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Выбранные участники ({selectedParticipants.size})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Список участников, которые будут добавлены в воркшоп:
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Array.from(selectedParticipants).map((id) => {
                    const member = familyMembers.find((m) => m.id === id);
                    if (!member) return null;

                    return (
                      <Badge key={id} variant="secondary" className="px-3 py-1.5">
                        {member.name}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" asChild>
              <Link href={`/workshops/vmv/${id}/setup/format`}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button onClick={handleNext} disabled={isSaving || selectedParticipants.size === 0}>
              {isSaving ? "Saving..." : "Next: Invite Guests"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
