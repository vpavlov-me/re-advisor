"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Calendar as CalendarIcon, Clock, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";

type PlanningMode = 'collect' | 'coordinate';
type TimeSlot = '10:00' | '14:00' | '18:00' | '20:00';

interface TimeSlotOption {
  time: TimeSlot;
  label: string;
  description: string;
}

const TIME_SLOTS: TimeSlotOption[] = [
  { time: '10:00', label: '10:00', description: 'Утро' },
  { time: '14:00', label: '14:00', description: 'День' },
  { time: '18:00', label: '18:00', description: 'Вечер' },
  { time: '20:00', label: '20:00', description: 'Поздний вечер' }
];

export default function ScheduleSelectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [planningMode, setPlanningMode] = useState<PlanningMode>('coordinate');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);

  // Mock availability data
  const availabilityData: Record<string, { available: number; total: number }> = {
    '2025-01-15': { available: 7, total: 8 },
    '2025-01-16': { available: 5, total: 8 },
    '2025-01-18': { available: 8, total: 8 },
    '2025-01-22': { available: 6, total: 8 },
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  const getAvailability = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return availabilityData[dateKey];
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleNext = async () => {
    if (planningMode === 'coordinate') {
      if (!selectedDate || !selectedTime) {
        toast.error("Please select a date and time");
        return;
      }
    }

    setIsSaving(true);

    try {
      // TODO: Save schedule to API
      await new Promise(resolve => setTimeout(resolve, 500));

      toast.success("Schedule saved successfully");
      router.push(`/workshops/vmv/${id}/session`);
    } catch (error) {
      console.error("Error saving schedule:", error);
      toast.error("Failed to save schedule");
    } finally {
      setIsSaving(false);
    }
  };

  const days = getDaysInMonth();
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = startOfMonth(currentMonth).getDay();
  // Convert to Monday-based (0 = Monday)
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  return (
    <div className="min-h-screen bg-page-background py-8 px-4">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/workshops/vmv/${id}/setup/guests`}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Schedule Workshop</h1>
              <p className="text-muted-foreground">
                Choose convenient dates and times for your workshop
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Step 4 of 4
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Planning Mode Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Режим планирования</CardTitle>
              <CardDescription>
                Выберите, как вы хотите назначить время проведения воркшопа
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setPlanningMode('collect')}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    planningMode === 'collect'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="font-semibold mb-2">Собрать доступность участников</div>
                  <div className="text-sm text-muted-foreground">
                    Участники укажут свою доступность, система предложит оптимальное время
                  </div>
                </button>

                <button
                  onClick={() => setPlanningMode('coordinate')}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    planningMode === 'coordinate'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="font-semibold mb-2">Согласование времени</div>
                  <div className="text-sm text-muted-foreground">
                    Выберите дату и время сами, участники подтвердят участие
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          {planningMode === 'coordinate' && (
            <>
              {/* Info Alert */}
              <Alert>
                <CalendarIcon className="h-4 w-4" />
                <AlertDescription>
                  <strong>Согласование времени:</strong> Выберите удобные даты и время проведения воркшопа.
                  Участники получат уведомление и смогут указать свою доступность.
                </AlertDescription>
              </Alert>

              {/* Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle>Выберите возможные временные слоты</CardTitle>
                  <CardDescription>
                    Календарь показывает доступность участников (предварительная оценка)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
                    >
                      ←
                    </Button>
                    <div className="font-semibold">
                      {format(currentMonth, 'MMMM yyyy', { locale: undefined })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
                    >
                      →
                    </Button>
                  </div>

                  {/* Week Days Header */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {weekDays.map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for offset */}
                    {Array.from({ length: startOffset }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}

                    {/* Day cells */}
                    {days.map((day) => {
                      const availability = getAvailability(day);
                      const isSelected = selectedDate && isSameDay(day, selectedDate);
                      const isPast = day < new Date() && !isToday(day);

                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => !isPast && handleDateSelect(day)}
                          disabled={isPast}
                          className={`
                            aspect-square p-2 rounded-lg border text-sm transition-all
                            ${isPast ? 'opacity-30 cursor-not-allowed' : 'hover:border-primary/50'}
                            ${isSelected ? 'border-primary bg-primary text-primary-foreground font-semibold' : 'border-border'}
                            ${isToday(day) && !isSelected ? 'border-orange-500 border-2' : ''}
                          `}
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <span>{format(day, 'd')}</span>
                            {availability && (
                              <span className="text-xs mt-1">
                                {availability.available}/{availability.total}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Time Slot Selection */}
              {selectedDate && (
                <Card>
                  <CardHeader>
                    <CardTitle>Предложите варианты времени</CardTitle>
                    <CardDescription>
                      Выберите несколько вариантов времени. Участники укажут, какие им подходят.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = selectedTime === slot.time;

                        return (
                          <button
                            key={slot.time}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50 hover:bg-muted/50'
                            }`}
                          >
                            <div className="text-2xl font-bold mb-1">{slot.label}</div>
                            <div className="text-sm text-muted-foreground">{slot.description}</div>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recommended Time (if available) */}
              {selectedDate && selectedTime && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-green-900 mb-1">Рекомендуемое время</div>
                        <div className="text-sm text-green-700 mb-3">
                          {format(selectedDate, 'EEEE, d MMMM yyyy')} в {selectedTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-700">
                            Доступно 7 из 8 участников (83%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {planningMode === 'collect' && (
            <Alert>
              <CalendarIcon className="h-4 w-4" />
              <AlertDescription>
                Участники получат ссылку для указания своей доступности. После того как все ответят,
                система предложит оптимальное время для проведения воркшопа.
              </AlertDescription>
            </Alert>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" asChild>
              <Link href={`/workshops/vmv/${id}/setup/guests`}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button
              onClick={handleNext}
              disabled={isSaving || (planningMode === 'coordinate' && (!selectedDate || !selectedTime))}
            >
              {isSaving ? "Saving..." : "Complete Setup"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
