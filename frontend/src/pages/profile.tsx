import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, MapPin, Settings, User } from "lucide-react";
import Header from "@/Page_components/Header";
import { getRequest } from "@/api/utils";

export default function ProfilePage() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingMyGroups, setLoadingMyGroups] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Or wherever you store the token
        console.log(token, "token");
        const response = await fetch(`http://localhost:5000/events/${userId}`, {
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
        console.log(data);
        setUpcomingEvents(data); // Assuming your response structure contains 'groups'
        setLoadingEvents(false);
      } catch (error: any) {
        setError(error.message);
        setLoadingEvents(false);
      }
    };

    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Or wherever you store the token
        console.log(token, "token");
        const response = await fetch(
          `http://localhost:5000/my_groups/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }

        const data = await response.json();
        console.log("Fetching groups");
        console.log(data);
        setMyGroups(data);
        setLoadingMyGroups(false);
      } catch (error: any) {
        setError(error.message);
        setLoadingMyGroups(false);
      }
    };

    fetchEvents();
    fetchGroups();
  }, []);
  return (
    <div
      className="min-h-screen bg-background"
      style={{
        fontSize: "1rem",
      }}
    >
      <header className="border-b">
        <Header />
      </header>
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-xl text-muted-foreground mt-1">
              Manage your profile and preferences
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-muted">
                <User className="h-24 w-24 p-6 text-muted-foreground" />
              </div>
              <CardTitle>Margaret Johnson</CardTitle>
              <CardDescription>Member since January 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Email
                  </div>
                  <div>margaret.j@example.com</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Location
                  </div>
                  <div>Portland, OR</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Interests
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      Gardening
                    </span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      Reading
                    </span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      Walking
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-8">
            <Tabs defaultValue="upcoming">
              <TabsList className="w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="groups">My Groups</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="space-y-4 pt-4">
                <h3 className="text-xl font-semibold">Your Upcoming Events</h3>
                {upcomingEvents.map((event: any) => (
                  <Card key={event.id}>
                    <CardContent className="p-4">
                      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                        <div>
                          <h4 className="text-lg font-medium">{event.title}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mt-2">
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
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            Cancel RSVP
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="groups" className="space-y-4 pt-4">
                <h3 className="text-xl font-semibold">Your Groups</h3>
                {myGroups.map((group: any) => (
                  <Card key={group.id}>
                    <CardContent className="p-4">
                      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                        <div>
                          <h4 className="text-lg font-medium">{group.name}</h4>
                          <p className="text-muted-foreground mt-1">
                            {group.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-muted-foreground">
                              {group.members} members
                            </span>
                            <span className="text-sm text-muted-foreground">
                              •
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Next meeting: {group.nextMeeting}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            View Group
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
                <CardDescription>
                  Customize your experience to make Gather easier to use
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-contrast">High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better readability
                    </p>
                  </div>
                  <Switch id="high-contrast" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="text-to-speech">Text-to-Speech</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable reading content aloud
                    </p>
                  </div>
                  <Switch id="text-to-speech" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about events and groups
                    </p>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reminders">Event Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminders 24 hours before events
                    </p>
                  </div>
                  <Switch id="reminders" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Our support team is here to assist you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  If you need help using Gather or have any questions, our
                  friendly support team is ready to assist you.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Button variant="outline" className="w-full">
                    View Help Guide
                  </Button>
                  <Button className="w-full">Contact Support</Button>
                </div>
              </CardContent>
            </Card>
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

// Sample data
const upcomingEvents = [
  {
    id: 1,
    title: "Community Garden Workshop",
    date: "April 15, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Community Center Garden",
  },
  {
    id: 2,
    title: "Book Club Meeting",
    date: "April 18, 2025",
    time: "2:00 PM - 3:30 PM",
    location: "Public Library, Meeting Room 2",
  },
];

const myGroups = [
  {
    id: 1,
    name: "Photography Enthusiasts",
    description: "Share photography tips and go on photo walks together.",
    members: 42,
    nextMeeting: "April 22, 2025",
  },
  {
    id: 2,
    name: "Walking Club",
    description: "Weekly walks in different parks and neighborhoods.",
    members: 68,
    nextMeeting: "April 16, 2025",
  },
];
