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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GroupCard from "@/Page_components/GroupCards";
import Header from "@/Page_components/Header";
import { Filter, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <Header />
      </header>
      <main className="container px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Interest Groups
            </h1>
            <p className="text-xl text-muted-foreground mt-1">
              Connect with people who share your interests
            </p>
          </div>
          <Link to="/creategroupchat">
            <Button size="lg" className="text-lg">
              Create Group
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-medium mb-4">Find Groups</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search groups..."
                    className="pl-8 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="group-category"
                    className="text-sm font-medium"
                  >
                    Category
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger id="group-category" className="text-base">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="arts">Arts & Crafts</SelectItem>
                      <SelectItem value="books">Books & Literature</SelectItem>
                      <SelectItem value="games">Games & Recreation</SelectItem>
                      <SelectItem value="health">Health & Wellness</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="outdoors">
                        Outdoors & Nature
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="activity-level"
                    className="text-sm font-medium"
                  >
                    Activity Level
                  </label>
                  <Select defaultValue="all">
                    <SelectTrigger id="activity-level" className="text-base">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activity Levels</SelectItem>
                      <SelectItem value="very-active">Very Active</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
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
                      <SelectItem value="online">Online Groups</SelectItem>
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
              <h3 className="text-lg font-medium mb-4">Your Groups</h3>
              <div className="space-y-3">
                {myGroups.map((group) => (
                  <Link
                    key={group.id}
                    to={`/groups/${group.id}`}
                    className="block rounded-md p-2 hover:bg-muted"
                  >
                    <div className="font-medium">{group.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Next meeting: {group.nextMeeting}
                    </div>
                  </Link>
                ))}
                <Button variant="ghost" className="w-full text-primary">
                  View All Your Groups
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Popular Groups (24)</h2>
              <Select defaultValue="popular">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="active">Most Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
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

// Sample data
const groups = [
  {
    id: 1,
    name: "Photography Enthusiasts",
    description: "Share photography tips and go on photo walks together.",
    members: 42,
    category: "Arts & Crafts",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Walking Club",
    description: "Weekly walks in different parks and neighborhoods.",
    members: 68,
    category: "Health & Wellness",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Crafts & Hobbies",
    description: "Share your crafting projects and learn new skills.",
    members: 35,
    category: "Arts & Crafts",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Book Lovers",
    description: "Monthly book discussions and author events.",
    members: 51,
    category: "Books & Literature",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Technology Help",
    description: "Learn about smartphones, computers, and the internet.",
    members: 29,
    category: "Technology",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Gardening Group",
    description: "Tips, tricks, and seasonal gardening advice.",
    members: 47,
    category: "Outdoors & Nature",
    image: "/placeholder.svg?height=200&width=300",
  },
];

const myGroups = [
  {
    id: 1,
    name: "Photography Enthusiasts",
    nextMeeting: "April 22, 2025",
  },
  {
    id: 2,
    name: "Walking Club",
    nextMeeting: "April 16, 2025",
  },
];
