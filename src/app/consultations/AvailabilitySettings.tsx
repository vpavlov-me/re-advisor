"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Trash2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return [`${hour}:00`, `${hour}:30`];
}).flat();

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  dayOfWeek: number;
  isEnabled: boolean;
  slots: TimeSlot[];
}

export function AvailabilitySettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    DAYS.map((_, i) => ({ dayOfWeek: i, isEnabled: i > 0 && i < 6, slots: [{ startTime: "09:00", endTime: "17:00" }] }))
  );

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const res = await fetch("/api/availability");
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          // Transform flat slots to structured schedule
          const newSchedule = DAYS.map((_, i) => ({
            dayOfWeek: i,
            isEnabled: false,
            slots: [] as TimeSlot[]
          }));

          data.forEach((slot: any) => {
            const day = newSchedule[slot.dayOfWeek];
            day.isEnabled = true;
            day.slots.push({ startTime: slot.startTime, endTime: slot.endTime });
          });
          
          // Ensure days with no slots but enabled have at least one empty slot structure if needed, 
          // but here we just use the data.
          // If a day has no slots in DB, it's disabled.
          
          setSchedule(newSchedule);
        }
      }
    } catch (error) {
      console.error("Failed to load availability", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Flatten schedule to slots
      const slots = schedule
        .filter(day => day.isEnabled)
        .flatMap(day => day.slots.map(slot => ({
          dayOfWeek: day.dayOfWeek,
          startTime: slot.startTime,
          endTime: slot.endTime
        })));

      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slots }),
      });

      if (res.ok) {
        // Success feedback
        alert("Availability saved successfully!");
      } else {
        alert("Failed to save availability.");
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving availability.");
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
      <div className="space-y-4">
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
