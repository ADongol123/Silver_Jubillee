import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Placeholder from "../../public/placeholder.svg";

export default function GroupsPage() {
  // State to hold groups data
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  // Fetch groups from API on component mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Or wherever you store the token
        const userId = localStorage.getItem("userId");

        // Fetch general groups
        const groupsResponse = await fetch("http://localhost:5000/groups", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!groupsResponse.ok) {
          throw new Error("Failed to fetch groups");
        }

        const groupsData = await groupsResponse?.json();

        // Fetch recommended groups if tab is "recommended"
        let recommendedGroups = [];
        if (activeTab === "recommended") {
          const recommendedResponse = await fetch(
            `http://localhost:5000/recommend/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!recommendedResponse.ok) {
            throw new Error("Failed to fetch recommended groups");
          }

          const recommendedData = await recommendedResponse?.json();
          recommendedGroups = recommendedData?.recommended_groups;
        }
        console.log(groupsData, "groupsData");
        console.log(recommendedGroups, "4545");
        // Filter and match groups
        setGroups(activeTab === "all" ? groupsData?.groups : recommendedGroups);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGroups();
  }, [activeTab]);

  console.log(groups, "groups");
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
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Popular Groups
                </h2>
              </div>
              <div className="flex items-center gap-3 border border-gray-300 rounded-2xl p-1 bg-gray-100 cursor-pointer">
                <p
                  className={`text-gray-700 hover:text-black transition px-4 py-2 rounded-2xl bg-gray-200  ${
                    activeTab === "all" ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </p>
                <p
                  className={`text-gray-700 hover:text-black transition px-4 py-2 rounded-2xl bg-gray-200  ${
                    activeTab === "recommended" ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setActiveTab("recommended")}
                >
                  Recommended
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : (
                groups.map((group: any) =>
                  activeTab === "all" ? (
                    <GroupCard key={group.id} group={group} />
                  ) : (
                    <Card className="h-full">
                      <CardHeader className="p-0">
                        <img
                          src={Placeholder}
                          alt={group.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="text-xl mb-2">
                          {group.group_id}
                        </CardTitle>
                        <CardDescription className="text-base mb-4">
                          {group.name}
                        </CardDescription>
                        {/* <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {group.members.length} members
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {group.category}
                          </span>
                        </div> */}
                      </CardContent>
                    </Card>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted mt-12">
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
              © 2025 AgeTogther. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
