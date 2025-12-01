"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Trash2, Clock, Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
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

export function AvailabilitySettings() {
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

  const fetchAvailability = useCallback(async (advisorId: string) => {
    try {
      // Fetch availability settings
      const { data: settingsData } = await supabase
        .from('availability_settings')
        .select('*')
        .eq('advisor_id', advisorId)
        .single();

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
      const { data: scheduleData, error } = await supabase
        .from('weekly_schedule')
        .select('*')
        .eq('advisor_id', advisorId);

      if (error) throw error;

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
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        fetchAvailability(user.id);
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
      const { error: settingsError } = await supabase
        .from('availability_settings')
        .upsert({
          advisor_id: userId,
          timezone: config.timezone,
          buffer_before_minutes: config.bufferBeforeMinutes,
          buffer_after_minutes: config.bufferAfterMinutes,
          min_notice_hours: config.minNoticeHours,
          max_advance_days: config.maxAdvanceDays,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'advisor_id' });

      if (settingsError) throw settingsError;

      // 2. Delete all existing schedule slots for this user
      const { error: deleteError } = await supabase
        .from('weekly_schedule')
        .delete()
        .eq('advisor_id', userId);

      if (deleteError) throw deleteError;

      // 3. Prepare new slots
      const slotsToInsert = schedule
        .filter(day => day.isEnabled)
        .flatMap(day => day.slots.map(slot => ({
          advisor_id: userId,
          day_of_week: day.dayOfWeek,
          start_time: slot.startTime,
          end_time: slot.endTime,
          is_available: true,
        })));

      if (slotsToInsert.length > 0) {
        const { error: insertError } = await supabase
          .from('weekly_schedule')
          .insert(slotsToInsert);
          
        if (insertError) throw insertError;
      }

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
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Timezone & Buffer Settings */}
      <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
        <div className="col-span-2">
          <Label className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4" />
            Timezone
          </Label>
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
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4" />
            Buffer Before (min)
          </Label>
          <Select 
            value={config.bufferBeforeMinutes.toString()} 
            onValueChange={(v) => setConfig(prev => ({ ...prev, bufferBeforeMinutes: parseInt(v) }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 5, 10, 15, 30, 45, 60].map(m => (
                <SelectItem key={m} value={m.toString()}>{m} min</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4" />
            Buffer After (min)
          </Label>
          <Select 
            value={config.bufferAfterMinutes.toString()} 
            onValueChange={(v) => setConfig(prev => ({ ...prev, bufferAfterMinutes: parseInt(v) }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 5, 10, 15, 30, 45, 60].map(m => (
                <SelectItem key={m} value={m.toString()}>{m} min</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Minimum Notice (hours)</Label>
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
        </div>

        <div>
          <Label className="mb-2 block">Max Advance Booking (days)</Label>
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
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Weekly Schedule</Label>
        {schedule.map((day, dayIndex) => (
          <div key={day.dayOfWeek} className="flex items-start gap-4 p-4 border rounded-lg bg-card">
            <div className="pt-1">
              <Switch 
                checked={day.isEnabled} 
                onCheckedChange={(checked) => toggleDay(dayIndex, checked)} 
              />
            </div>
            <div className="w-24 pt-1 font-medium">{DAYS[day.dayOfWeek]}</div>
            
            <div className="flex-1 space-y-3">
              {!day.isEnabled ? (
                <div className="text-muted-foreground pt-1">Unavailable</div>
              ) : (
                <>
                  {day.slots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex items-center gap-2">
                      <Select value={slot.startTime} onValueChange={(v) => updateSlot(dayIndex, slotIndex, "startTime", v)}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {HOURS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <span className="text-muted-foreground">-</span>
                      <Select value={slot.endTime} onValueChange={(v) => updateSlot(dayIndex, slotIndex, "endTime", v)}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {HOURS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={() => removeSlot(dayIndex, slotIndex)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="text-primary h-8 px-2" onClick={() => addSlot(dayIndex)}>
                    <Plus className="h-3 w-3 mr-1" /> Add Period
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
