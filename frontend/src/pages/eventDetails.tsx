import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const addToGoogleCalendar = () => {
    if (!event) return;

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event?.event.title
    )}&details=${encodeURIComponent(
      event?.event.description
    )}&location=${encodeURIComponent(event?.event.location)}&dates=${event?.event.startTime}/${event?.event.endTime}`;

    window.open(url, "_blank");
  };

  if (!event) {
    return <div className="text-center">Loading event details...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{event?.event?.title}</h1>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-5 w-5" />
                <span>{event?.event?.date}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>{event?.event?.time ? event?.event?.time : "Time not specified"}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{event?.event?.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">About this event</h2>
            <p className="text-muted-foreground">{event?.event?.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Button className="w-full max-w-md text-base m-40" onClick={addToGoogleCalendar}>
          Register
        </Button>
      </div>
    </div>
  );
}