// import Link from "next/link"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/Page_components/Header";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Banner from "../../public/banner.jpg";
import Community from "../../public/workshop.jpg";
import Meeting from "../../public/bookshop.jpg";
import Photography from "../../public/photography.jpg";
import walking from "../../public/walking.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <Header />
      </header>
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome to AgeTogether
              </h2>
              <p className="text-xl text-muted-foreground">
                Connect with people who share your interests and discover local
                events in your community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  <Link to="/events">Find Events</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Link to="/groups">Join Groups</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src={Banner}
                alt="Seniors enjoying a community gathering"
                className="aspect-video object-cover w-full"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events Near You</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="text-lg">
              View All Events
            </Button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Interest Groups</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" className="text-lg">
              Explore All Groups
            </Button>
          </div>
        </section>

        <section className="rounded-lg bg-muted p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Need Help Getting Started?
              </h2>
              <p className="text-lg mb-4">
                We're here to help you connect with your community. Our support
                team can guide you through using AgeTogether.
              </p>
              <Button size="lg" className="text-lg">
                Contact Support
              </Button>
            </div>
            <div className="grid gap-4 text-lg">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">
                    Join a group based on your interests
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">
                    Find and register for local events
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">
                    Discover activities in your neighborhood
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted">
        <div className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <h2 className="text-xl font-bold">AgeTogther</h2>
              <p className="mt-2 text-muted-foreground">
                Connecting seniors with shared interests and local events.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Quick Links</h3>
              {/* <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accessibility"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul> */}
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
              © 2025 AgeTogether. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sample data
const events = [
  {
    id: 1,
    title: "Community Garden Workshop",
    description: "Learn gardening tips and meet fellow gardening enthusiasts.",
    date: "April 15, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Community Center Garden",
    image: Community,
  },
  {
    id: 2,
    title: "Book Club Meeting",
    description:
      "Join us to discuss 'The Thursday Murder Club' by Richard Osman.",
    date: "April 18, 2025",
    time: "2:00 PM - 3:30 PM",
    location: "Public Library, Meeting Room 2",
    image: Meeting,
  },
];

const groups = [
  {
    id: 1,
    name: "Photography Enthusiasts",
    description: "Share photography tips and go on photo walks together.",
    members: 42,
    image: Photography,
  },
  {
    id: 2,
    name: "Walking Club",
    description: "Weekly walks in different parks and neighborhoods.",
    members: 68,
    image: walking,
  },
];

function EventCard({ event }: any) {
  const navigate = useNavigate();

  const handleViewDetails = (ev: any) => {
    navigate("/eventDetail", { state: { ev } });
  };

  return (
    <Card className="h-full">
      <CardHeader className="p-0 m-0">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-58 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
        <CardDescription className="text-base mb-4">
          {event.description}
        </CardDescription>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button
          className="w-full text-base"
          onClick={() => handleViewDetails(event)}
        >
          <Link to="/eventDetail">Register</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function GroupCard({ group }: any) {
  return (
    <Card className="h-full">
      <CardHeader className="p-0">
        <img
          src={group.image || "/placeholder.svg"}
          alt={group.name}
          className="w-full h-58 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2">{group.name}</CardTitle>
        <CardDescription className="text-base mb-4">
          {group.description}
        </CardDescription>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{group.members} members</span>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button variant="outline" className="w-full text-base">
          <Link
            to="/groups"
            className="text-lg font-medium text-muted-foreground hover:text-primary"
          >
            Join Group
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
