"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TimePickerProps {
  time?: string // format: "HH:mm"
  onTimeChange?: (time: string | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  step?: number // minutes step, default 30
}

export function TimePicker({
  time,
  onTimeChange,
  placeholder = "Select time",
  disabled = false,
  className,
  step = 30,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  
  // Generate time slots
  const timeSlots = React.useMemo(() => {
    const slots: string[] = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += step) {
        const h = hour.toString().padStart(2, '0')
        const m = minute.toString().padStart(2, '0')
        slots.push(`${h}:${m}`)
      }
    }
    return slots
  }, [step])

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours % 12 || 12
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !time && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? formatTime(time) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <ScrollArea className="h-[300px]">
          <div className="p-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={time === slot ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start font-normal mb-1",
                  time === slot && "bg-primary text-primary-foreground"
                )}
                onClick={() => {
                  onTimeChange?.(slot)
                  setOpen(false)
                }}
              >
                {formatTime(slot)}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
