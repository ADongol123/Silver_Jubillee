import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Filter, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EventsPage() {
  // State to hold groups data
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(events,"events")
  // Fetch groups from API on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Or wherever you store the token
        console.log(token,"token")
        const response = await fetch("http://localhost:5000/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }

        const data = await response.json();
        setEvents(data); // Assuming your response structure contains 'groups'
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-primary">Gather</h1>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              to="/"
              className="text-lg font-medium text-muted-foreground hover:text-primary"
            >
              Home
            </Link>
            <Link to="/events" className="text-lg font-medium text-primary">
              Events
            </Link>
            <Link
              to="/groups"
              className="text-lg font-medium text-muted-foreground hover:text-primary"
            >
              Groups
            </Link>
            <Link
              to="/profile"
              className="text-lg font-medium text-muted-foreground hover:text-primary"
            >
              My Profile
            </Link>
          </nav>
        </div>
      </header>
      <main className="container px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Events</h1>
            <p className="text-xl text-muted-foreground mt-1">
              Find and join events in your community
            </p>
          </div>
          <Button size="lg" className="text-lg">
            Create Event
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-medium mb-4">Search Events</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search events..."
                    className="pl-8 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="event-type" className="text-sm font-medium">
                    Event Type
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger id="event-type" className="text-base">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="health">Health & Wellness</SelectItem>
                      <SelectItem value="arts">Arts & Crafts</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="date-range" className="text-sm font-medium">
                    Date Range
                  </label>
                  <Select defaultValue="upcoming">
                    <SelectTrigger id="date-range" className="text-base">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Select defaultValue="nearby">
                    <SelectTrigger id="location" className="text-base">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nearby">Nearby (5 miles)</SelectItem>
                      <SelectItem value="10miles">Within 10 miles</SelectItem>
                      <SelectItem value="25miles">Within 25 miles</SelectItem>
                      <SelectItem value="50miles">Within 50 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full text-base">
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-medium mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                Not sure how to register for events or need assistance?
              </p>
              <Button variant="outline" className="w-full text-base">
                Contact Support
              </Button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Events (12)</h2>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="soonest">Soonest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-6">
              {events.map((event: any) =>
                event?.length > 0 ? (
                  <EventCard key={event?.id} event={event} />
                ) : (
                  <p>No Event Available</p>
                )
              )}
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10">
                  1
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  2
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  3
                </Button>
                <span className="mx-2">...</span>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  8
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted mt-12">
        <div className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <h2 className="text-xl font-bold">Gather</h2>
              <p className="mt-2 text-muted-foreground">
                Connecting seniors with shared interests and local events.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accessibility"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Contact Us</h3>
              <p className="text-muted-foreground">
                Need assistance? Our support team is here to help.
              </p>
              <p className="mt-2 text-muted-foreground">
                Phone: (555) 123-4567
              </p>
              <p className="text-muted-foreground">Email: support@gather.com</p>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 Gather. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function EventCard({ event }: any) {
  return (
    <Card className="overflow-hidden">
      <div className="md:grid md:grid-cols-[250px_1fr]">
        <div className="h-48 md:h-full">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6">
          <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
          <CardDescription className="text-base mb-4">
            {event.description}
          </CardDescription>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              {event.attendees} people attending
            </div>
            <Button className="w-full sm:w-auto text-base">Register</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
