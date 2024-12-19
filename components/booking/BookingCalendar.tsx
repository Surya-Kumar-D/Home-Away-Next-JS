"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";
import { useProperty } from "@/utils/store";

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from "@/utils/calendar";

function BookingCalendar() {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const bookings = useProperty((state) => state.bookings);
  console.log(bookings);
  useEffect(() => useProperty.setState({ range }), [range]);
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });
  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      disabled={blockedPeriods}
    />
  );
}

export default BookingCalendar;
