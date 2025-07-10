"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function DateTimeInput({ deadline, setDeadline }) {
  const [date, setDate] = useState(deadline ? new Date(deadline) : null);
  const [time, setTime] = useState(
    deadline ? format(new Date(deadline), "HH:mm") : "10:00"
  );

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    if (selectedDate && time) {
      const [hours, minutes] = time.split(":");
      const finalDate = new Date(selectedDate);
      finalDate.setHours(Number(hours));
      finalDate.setMinutes(Number(minutes));
      setDeadline(finalDate.toISOString());
    }
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    if (date) {
      const [hours, minutes] = e.target.value.split(":");
      const finalDate = new Date(date);
      finalDate.setHours(Number(hours));
      finalDate.setMinutes(Number(minutes));
      setDeadline(finalDate.toISOString());
    }
  };

  return (
    <div className="flex gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[160px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Time</label>
        <input
          type="time"
          value={time}
          onChange={handleTimeChange}
          className="w-[120px] px-3 py-2 border border-gray-300 rounded-md bg-background text-foreground"
        />
      </div>
    </div>
  );
}
