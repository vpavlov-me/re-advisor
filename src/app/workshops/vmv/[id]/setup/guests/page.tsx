"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Mail, Phone, X, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface Guest {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
}

export default function GuestsInvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestName, setGuestName] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const addGuestByEmail = () => {
    if (!guestEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Check if already added
    if (guests.some((g) => g.email === guestEmail)) {
      toast.error("This email has already been added");
      return;
    }

    const newGuest: Guest = {
      id: Date.now().toString(),
      email: guestEmail,
      name: guestName || undefined
    };

    setGuests([...guests, newGuest]);
    setGuestEmail("");
    setGuestName("");
    toast.success("Guest added via email");
  };

  const addGuestByPhone = () => {
    if (!guestPhone.trim()) {
      toast.error("Please enter a phone number");
      return;
    }

    // Check if already added
    if (guests.some((g) => g.phone === guestPhone)) {
      toast.error("This phone number has already been added");
      return;
    }

    const newGuest: Guest = {
      id: Date.now().toString(),
      phone: guestPhone,
      name: guestName || undefined
    };

    setGuests([...guests, newGuest]);
    setGuestPhone("");
    setGuestName("");
    toast.success("Guest added via phone");
  };

  const removeGuest = (guestId: string) => {
    setGuests(guests.filter((g) => g.id !== guestId));
    toast.success("Guest removed");
  };

  const handleNext = async () => {
    setIsSaving(true);

    try {
      // TODO: Save guests to API
      await new Promise(resolve => setTimeout(resolve, 500));

      if (guests.length > 0) {
        toast.success(`${guests.length} guest(s) will be invited`);
      }

      router.push(`/workshops/vmv/${id}/setup/schedule`);
    } catch (error) {
      console.error("Error saving guests:", error);
      toast.error("Failed to save guests");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    router.push(`/workshops/vmv/${id}/setup/schedule`);
  };

  return (
    <div className="min-h-screen bg-page-background py-8 px-4">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/workshops/vmv/${id}/setup/participants`}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Invite Guests</h1>
              <p className="text-muted-foreground">
                Invite external participants who are not registered on the platform
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Step 3 of 4
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Warning */}
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Внимание:</strong> Гости получат индивидуальную ссылку-приглашение и смогут
              участвовать в воркшопе без регистрации на платформе.
            </AlertDescription>
          </Alert>

          {/* Add Guest by Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Invite by Email
              </CardTitle>
              <CardDescription>
                Guest will receive an invitation link to the specified email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guest-name-email">Name (Optional)</Label>
                  <Input
                    id="guest-name-email"
                    placeholder="e.g., John Doe"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest-email">Email Address *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="guest-email"
                      type="email"
                      placeholder="guest@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addGuestByEmail()}
                    />
                    <Button onClick={addGuestByEmail}>
                      + Добавить
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Гость получит приглашение на указанный email
              </p>
            </CardContent>
          </Card>

          {/* Add Guest by Phone */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Invite by Phone
              </CardTitle>
              <CardDescription>
                Guest will receive an SMS invitation with a link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guest-name-phone">Name (Optional)</Label>
                  <Input
                    id="guest-name-phone"
                    placeholder="e.g., Jane Smith"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest-phone">Phone Number *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="guest-phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addGuestByPhone()}
                    />
                    <Button onClick={addGuestByPhone}>
                      + Добавить
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Гость получит SMS с приглашением
              </p>
            </CardContent>
          </Card>

          {/* Invited Guests List */}
          {guests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Приглашенные гости ({guests.length})</CardTitle>
                <CardDescription>
                  Список участников, которые будут добавлены в воркшоп
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {guests.map((guest) => (
                    <div
                      key={guest.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          {guest.email ? (
                            <Mail className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Phone className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {guest.name || "Guest"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {guest.email || guest.phone}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGuest(guest.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preview Invitation */}
          <Card>
            <CardHeader>
              <CardTitle>Invitation Preview</CardTitle>
              <CardDescription>
                See how the invitation will look to guests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => setIsPreviewOpen(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview Invitation
              </Button>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" asChild>
              <Link href={`/workshops/vmv/${id}/setup/participants`}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
              <Button onClick={handleNext} disabled={isSaving}>
                {isSaving ? "Saving..." : "Next: Schedule"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invitation Preview</DialogTitle>
            <DialogDescription>
              This is how the invitation will look to guests
            </DialogDescription>
          </DialogHeader>

          <div className="border rounded-lg p-6 bg-gradient-to-br from-orange-50 to-white">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Приглашение на воркшоп "Values, Mission & Vision Workshop"
              </h2>
              <p className="text-muted-foreground">
                Здравствуйте!
              </p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4 text-sm">
              <p>
                Приглашаем вас принять участие в интерактивном воркшопе по формированию ключевых ценностей,
                миссии и видения нашей семьи.
              </p>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="font-semibold">В процессе воркшопа мы:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Определим 5 ключевых ценностей семьи</li>
                  <li>Сформулируем миссию — наше предназначение</li>
                  <li>Создадим видение будущего на 20-50 лет вперед</li>
                </ul>
              </div>

              <p>
                Результаты станут основой семейной конституции.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="font-semibold mb-2">Дата и время: будет объявлено</p>
                <p className="text-xs text-muted-foreground">
                  Формат: Online/hybrid<br />
                  Для участия перейдите по ссылке: [Уникальная ссылка]
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="text-center text-xs text-muted-foreground">
              Secure family governance platform powered by<br />
              modern technology
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
