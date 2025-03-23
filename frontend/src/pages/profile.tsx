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

export default function ProfilePage() {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [myGroups, setMyGroups] = useState<any>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingMyGroups, setLoadingMyGroups] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        console.log("User data", data);
        setUser(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:5000/events/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setUpcomingEvents(data);
        setLoadingEvents(false);
      } catch (error: any) {
        setError(error.message);
        setLoadingEvents(false);
      }
    };

    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("authToken");
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

        const data: any = await response.json();
        if (Array.isArray(data)) {
          setMyGroups(data);
        } else if (data.groups && Array.isArray(data.groups)) {
          setMyGroups(data.groups);
        } else {
          setMyGroups([]);
        }
        setLoadingMyGroups(false);
      } catch (error: any) {
        setError(error.message);
        setLoadingMyGroups(false);
      }
    };

    fetchProfile();
    fetchEvents();
    fetchGroups();
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
          {/* Profile Card */}
          <Card>
            <CardHeader className="text-center mt-10">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-muted">
                <User className="h-24 w-24 p-6 text-muted-foreground" />
              </div>
              <CardTitle>
                {loading ? "Loading..." : user.username || "No Name Provided"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Email
                  </div>
                  <div>{user.email || "No Email Provided"}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Address
                  </div>
                  <div>{user.address || "West Haven, Connecticut"}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">
                    Interests
                  </div>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {user.interests && user.interests.length > 0 ? (
                      user.interests.map((interest: string, index: number) => (
                        <span
                          key={index}
                          className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                        >
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted-foreground">
                        No Interests Provided
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events and Groups */}
          <div className="space-y-8">
            <Tabs defaultValue="upcoming">
              <TabsList className="w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="groups">My Groups</TabsTrigger>
              </TabsList>

              {/* Upcoming Events */}
              <TabsContent value="upcoming" className="space-y-4 pt-4">
                <h3 className="text-xl font-semibold">Your Upcoming Events</h3>
                {loadingEvents ? (
                  <p>Loading events...</p>
                ) : upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event: any) => (
                    <Card key={event.id}>
                      <CardContent className="p-4">
                        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                          <div>
                            <h4 className="text-lg font-medium">
                              {event.title}
                            </h4>
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
                  ))
                ) : (
                  <p>No upcoming events found.</p>
                )}
              </TabsContent>

              {/* My Groups */}
              <TabsContent value="groups" className="space-y-4 pt-4">
                <h3 className="text-xl font-semibold">Your Groups</h3>
                {loadingMyGroups ? (
                  <p>Loading groups...</p>
                ) : myGroups.length > 0 ? (
                  myGroups.map((group: any) => (
                    <Card key={group.id} className="w-64">
                      <CardContent className="p-4">
                        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                          <div>
                            <h4 className="text-lg font-medium">
                              {group.name}
                            </h4>
                            <p className="text-muted-foreground mt-1">
                              {group.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No groups found.</p>
                )}
              </TabsContent>
            </Tabs>

            {/* Accessibility & Help (unchanged) */}
            {/* ... Keep the Accessibility and Help cards as they are */}
          </div>
        </div>
      </main>

      {/* Footer (unchanged) */}
    </div>
  );
}
