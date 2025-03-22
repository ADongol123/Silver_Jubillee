import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function EventDetailPage() {
  const location = useLocation();
  const event = location.state?.ev;

  const parseTime = (dateStr: string, timeStr: string) => {
    // Date format: "April 15, 2025"
    const [month, day, year] = dateStr.split(" ");
    const [startTime, endTime] = timeStr.split(" - ");

    // Helper function to convert the time string into a Date object in UTC
    const parseToUTCDate = (dateStr: string, timeStr: string) => {
      const dateTimeStr = `${dateStr} ${timeStr} UTC`;
      return new Date(dateTimeStr); // Treat as UTC
    };

    // Constructing Date objects for start and end times in UTC
    const startDateTime = parseToUTCDate(`${month} ${day}, ${year}`, startTime);
    const endDateTime = parseToUTCDate(`${month} ${day}, ${year}`, endTime);

    // Convert to the required format YYYYMMDDTHHMMSSZ (Google Calendar format)
    const start = startDateTime
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0]; // Format to YYYYMMDDTHHMMSSZ
    const end = endDateTime.toISOString().replace(/[-:]/g, "").split(".")[0]; // Format to YYYYMMDDTHHMMSSZ

    return { start, end };
  };

  const dateStr = "April 15, 2025"; // Date string
  const timeStr = "10:00 AM - 12:00 PM"; // Time string

  const { start, end } = parseTime(dateStr, timeStr);
  console.log("Start:", start); // Expected output: 20250415T100000Z
  console.log("End:", end); // Expected output: 20250415T120000Z

  const addToGoogleCalendar = () => {
    const { start, end } = parseTime(event.date, event.time);
    console.log("Start:", start); // Outputs the start datetime in the correct format
    console.log("End:", end);

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location)}&dates=${start}/${end}`;

    window.open(url, "_blank"); // Open the Google Calendar link in a new tab
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-5 w-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">About this event</h2>
            <p className="text-muted-foreground">{event.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          className="w-full max-w-md text-base m-40"
          onClick={addToGoogleCalendar}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
