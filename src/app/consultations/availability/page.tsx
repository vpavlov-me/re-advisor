"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Trash2, Clock, Globe, Home, ChevronRight, ArrowLeft, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { getCurrentUser } from "@/lib/auth";
import {
  getAvailabilitySettings,
  upsertAvailabilitySettings,
  getWeeklySchedule,
  saveWeeklySchedule
} from "@/lib/supabase";
import { toast } from "sonner";

const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return [`${hour}:00`, `${hour}:30`];
}).flat();

// Common timezones
const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Phoenix", label: "Arizona (MST)" },
  { value: "America/Anchorage", label: "Alaska (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii (HST)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Europe/Moscow", label: "Moscow (MSK)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Australia/Sydney", label: "Sydney (AEDT)" },
];

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  dayOfWeek: number;
  isEnabled: boolean;
  slots: TimeSlot[];
}

interface AvailabilityConfig {
  timezone: string;
  bufferBeforeMinutes: number;
  bufferAfterMinutes: number;
  minNoticeHours: number;
  maxAdvanceDays: number;
}

export default function AvailabilityPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [config, setConfig] = useState<AvailabilityConfig>({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    bufferBeforeMinutes: 15,
    bufferAfterMinutes: 15,
    minNoticeHours: 24,
    maxAdvanceDays: 60,
  });
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    DAYS.map((_, i) => ({ dayOfWeek: i, isEnabled: i > 0 && i < 6, slots: [{ startTime: "09:00", endTime: "17:00" }] }))
  );

  const fetchAvailability = useCallback(async () => {
    try {
      // Fetch availability settings
      const settingsData = await getAvailabilitySettings();

      if (settingsData) {
        setConfig({
          timezone: settingsData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          bufferBeforeMinutes: settingsData.buffer_before_minutes || 15,
          bufferAfterMinutes: settingsData.buffer_after_minutes || 15,
          minNoticeHours: settingsData.min_notice_hours || 24,
          maxAdvanceDays: settingsData.max_advance_days || 60,
        });
      }

      // Fetch weekly schedule
      const scheduleData = await getWeeklySchedule();

      if (scheduleData && scheduleData.length > 0) {
        // Transform flat slots to structured schedule
        const newSchedule = DAYS.map((_, i) => ({
          dayOfWeek: i,
          isEnabled: false,
          slots: [] as TimeSlot[]
        }));

        scheduleData.forEach((slot: any) => {
          const day = newSchedule[slot.day_of_week];
          if (slot.is_available) {
            day.isEnabled = true;
            day.slots.push({ startTime: slot.start_time, endTime: slot.end_time });
          }
        });

        // Ensure days with no slots get at least a default when enabled
        newSchedule.forEach(day => {
          if (day.isEnabled && day.slots.length === 0) {
            day.slots.push({ startTime: "09:00", endTime: "17:00" });
          }
        });
        
        setSchedule(newSchedule);
      }
    } catch (error) {
      console.error("Failed to load availability", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.id);
        fetchAvailability();
      } else {
        setLoading(false);
      }
    };
    getUser();
  }, [fetchAvailability]);

  const handleSave = async () => {
    if (!userId) {
      toast.error("You must be logged in to save availability settings");
      return;
    }

    setSaving(true);
    try {
      // 1. Upsert availability settings
      await upsertAvailabilitySettings({
        timezone: config.timezone,
        buffer_before_minutes: config.bufferBeforeMinutes,
        buffer_after_minutes: config.bufferAfterMinutes,
        min_notice_hours: config.minNoticeHours,
        max_advance_days: config.maxAdvanceDays,
      });

      // 2. Save weekly schedule (replaces all existing slots)
      const slotsToInsert = schedule
        .filter(day => day.isEnabled)
        .flatMap(day => day.slots.map(slot => ({
          day_of_week: day.dayOfWeek,
          start_time: slot.startTime,
          end_time: slot.endTime,
          is_available: true,
        })));

      await saveWeeklySchedule(slotsToInsert);

      toast.success("Availability saved successfully!");
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Failed to save availability settings");
    } finally {
      setSaving(false);
    }
  };

  const toggleDay = (dayIndex: number, enabled: boolean) => {
    setSchedule(prev => prev.map((day, i) => 
      i === dayIndex ? { ...day, isEnabled: enabled, slots: enabled && day.slots.length === 0 ? [{ startTime: "09:00", endTime: "17:00" }] : day.slots } : day
    ));
  };

  const updateSlot = (dayIndex: number, slotIndex: number, field: keyof TimeSlot, value: string) => {
    setSchedule(prev => prev.map((day, i) => {
      if (i !== dayIndex) return day;
      const newSlots = [...day.slots];
      newSlots[slotIndex] = { ...newSlots[slotIndex], [field]: value };
      return { ...day, slots: newSlots };
    }));
  };

  const addSlot = (dayIndex: number) => {
    setSchedule(prev => prev.map((day, i) => 
      i === dayIndex ? { ...day, slots: [...day.slots, { startTime: "09:00", endTime: "17:00" }] } : day
    ));
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    setSchedule(prev => prev.map((day, i) => 
      i === dayIndex ? { ...day, slots: day.slots.filter((_, si) => si !== slotIndex) } : day
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Bar */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Home</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <Link href="/consultations" className="text-muted-foreground hover:text-foreground">
                Consultations
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-foreground font-medium">Availability Settings</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/consultations">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Consultations
                </Link>
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Availability Settings</h1>
          <p className="text-muted-foreground mt-1">
            Set your weekly recurring availability for consultations. Clients will only be able to book during these times.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>
                  Define your available hours for each day of the week
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedule.map((day, dayIndex) => (
                  <div key={day.dayOfWeek} className="flex items-start gap-4 p-4 border rounded-lg bg-card hover:bg-muted/30 transition-colors">
                    <div className="pt-1">
                      <Switch 
                        checked={day.isEnabled} 
                        onCheckedChange={(checked) => toggleDay(dayIndex, checked)} 
                      />
                    </div>
                    <div className="w-28 pt-1 font-medium">{DAYS[day.dayOfWeek]}</div>
                    
                    <div className="flex-1 space-y-3">
                      {!day.isEnabled ? (
                        <div className="text-muted-foreground pt-1">Unavailable</div>
                      ) : (
                        <>
                          {day.slots.map((slot, slotIndex) => (
                            <div key={slotIndex} className="flex items-center gap-2">
                              <Select value={slot.startTime} onValueChange={(v) => updateSlot(dayIndex, slotIndex, "startTime", v)}>
                                <SelectTrigger className="w-[110px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {HOURS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                                </SelectContent>
                              </Select>
                              <span className="text-muted-foreground">to</span>
                              <Select value={slot.endTime} onValueChange={(v) => updateSlot(dayIndex, slotIndex, "endTime", v)}>
                                <SelectTrigger className="w-[110px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {HOURS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                                </SelectContent>
                              </Select>
                              {day.slots.length > 1 && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-9 w-9"
                                  onClick={() => removeSlot(dayIndex, slotIndex)}
                                >
                                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary h-8 px-2" 
                            onClick={() => addSlot(dayIndex)}
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add Time Slot
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings - 1 column */}
          <div className="space-y-6">
            {/* Timezone */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Timezone
                </CardTitle>
                <CardDescription>
                  All times are shown in this timezone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select 
                  value={config.timezone} 
                  onValueChange={(v) => setConfig(prev => ({ ...prev, timezone: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map(tz => (
                      <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Buffer Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Buffer Times
                </CardTitle>
                <CardDescription>
                  Add buffer time around your meetings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2 block">Before Meeting</Label>
                  <Select 
                    value={config.bufferBeforeMinutes.toString()} 
                    onValueChange={(v) => setConfig(prev => ({ ...prev, bufferBeforeMinutes: parseInt(v) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 5, 10, 15, 30, 45, 60].map(m => (
                        <SelectItem key={m} value={m.toString()}>{m} minutes</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">After Meeting</Label>
                  <Select 
                    value={config.bufferAfterMinutes.toString()} 
                    onValueChange={(v) => setConfig(prev => ({ ...prev, bufferAfterMinutes: parseInt(v) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 5, 10, 15, 30, 45, 60].map(m => (
                        <SelectItem key={m} value={m.toString()}>{m} minutes</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Booking Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Rules</CardTitle>
                <CardDescription>
                  Control when clients can book
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2 block">Minimum Notice</Label>
                  <Select 
                    value={config.minNoticeHours.toString()} 
                    onValueChange={(v) => setConfig(prev => ({ ...prev, minNoticeHours: parseInt(v) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 4, 8, 12, 24, 48, 72].map(h => (
                        <SelectItem key={h} value={h.toString()}>{h} hours</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    How far in advance clients must book
                  </p>
                </div>

                <div>
                  <Label className="mb-2 block">Maximum Advance</Label>
                  <Select 
                    value={config.maxAdvanceDays.toString()} 
                    onValueChange={(v) => setConfig(prev => ({ ...prev, maxAdvanceDays: parseInt(v) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[7, 14, 30, 60, 90, 180, 365].map(d => (
                        <SelectItem key={d} value={d.toString()}>{d} days</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    How far into the future clients can book
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Button - Mobile */}
        <div className="lg:hidden flex justify-end pt-4 border-t">
          <Button onClick={handleSave} disabled={saving} size="lg" className="w-full sm:w-auto">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
