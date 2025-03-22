import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Image,
  Loader2,
  Plus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateGroupPage() {
  //   const router = useRouter()
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupCategory, setGroupCategory] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  const handleCreateGroup = () => {
    setIsCreating(true);
    // Simulate group creation
    setTimeout(() => {
      setIsCreating(false);
      //   router.push("/groups")
    }, 1500);
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const addInviteEmail = () => {
    if (inviteEmail && !invitedEmails.includes(inviteEmail)) {
      setInvitedEmails([...invitedEmails, inviteEmail]);
      setInviteEmail("");
    }
  };

  const removeInvitedEmail = (email: string) => {
    setInvitedEmails(invitedEmails.filter((e) => e !== email));
  };

  const isStep1Valid =
    groupName.trim() !== "" &&
    groupDescription.trim() !== "" &&
    groupCategory !== "";
  const isStep2Valid = selectedInterests.length > 0;

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
            <Link
              to="/events"
              className="text-lg font-medium text-muted-foreground hover:text-primary"
            >
              Events
            </Link>
            <Link to="/groups" className="text-lg font-medium text-primary">
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
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Create a New Group
            </h1>
            <p className="text-xl text-muted-foreground mt-1">
              Connect with others who share your interests
            </p>
          </div>

          <div className="mb-8">
            <div className="relative">
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                    step >= 1
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground"
                  }`}
                >
                  {step > 1 ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span className="text-lg">1</span>
                  )}
                </div>
                <div
                  className={`h-1 flex-1 ${
                    step >= 2 ? "bg-primary" : "bg-muted"
                  }`}
                ></div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                    step >= 2
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground"
                  }`}
                >
                  {step > 2 ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span className="text-lg">2</span>
                  )}
                </div>
                <div
                  className={`h-1 flex-1 ${
                    step >= 3 ? "bg-primary" : "bg-muted"
                  }`}
                ></div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                    step >= 3
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground"
                  }`}
                >
                  <span className="text-lg">3</span>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-base">
                <span className="font-medium">Group Details</span>
                <span className="font-medium">Select Interests</span>
                <span className="font-medium">Invite Members</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <Card className="border-2 transition-all duration-300 animate-in fade-in-50 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Group Details</CardTitle>
                <CardDescription className="text-base">
                  Tell us about your new group
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="group-name"
                      className="text-base font-medium"
                    >
                      Group Name
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            Choose a clear, descriptive name that reflects the
                            purpose of your group.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="group-name"
                    placeholder="Enter a name for your group"
                    className="text-lg h-14"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="group-description"
                      className="text-base font-medium"
                    >
                      Description
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            Describe what your group is about, what activities
                            you'll do, and who might be interested in joining.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Textarea
                    id="group-description"
                    placeholder="What is your group about? What activities will you do?"
                    className="text-lg min-h-[150px]"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="group-category"
                      className="text-base font-medium"
                    >
                      Category
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            Select a category that best represents your group's
                            main focus.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={groupCategory}
                    onValueChange={setGroupCategory}
                  >
                    <SelectTrigger id="group-category" className="text-lg h-14">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arts">Arts & Crafts</SelectItem>
                      <SelectItem value="books">Books & Literature</SelectItem>
                      <SelectItem value="games">Games & Recreation</SelectItem>
                      <SelectItem value="health">Health & Wellness</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="outdoors">
                        Outdoors & Nature
                      </SelectItem>
                      <SelectItem value="social">Social Activities</SelectItem>
                      <SelectItem value="learning">
                        Learning & Education
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-medium">Group Photo</Label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="h-32 w-32 rounded-lg border-2 border-dashed border-muted-foreground flex items-center justify-center bg-muted">
                      <Camera className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="text-base h-12 w-full sm:w-auto"
                      >
                        <Image className="mr-2 h-5 w-5" />
                        Upload Photo
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Upload a photo that represents your group. This will be
                        displayed on your group page.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-4">
                <Button
                  size="lg"
                  className="text-lg h-12 px-6"
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid}
                >
                  Continue
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-2 transition-all duration-300 animate-in fade-in-50 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Select Interests</CardTitle>
                <CardDescription className="text-base">
                  Choose topics your group will discuss or activities you'll
                  enjoy together
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label
                    htmlFor="search-interests"
                    className="text-base font-medium mb-2 block"
                  >
                    Search Interests
                  </Label>
                  <Input
                    id="search-interests"
                    placeholder="Type to search interests..."
                    className="text-lg h-14"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {interests.map((interest) => (
                    <div
                      key={interest.id}
                      className={`rounded-lg border-2 p-4 cursor-pointer transition-all hover:border-primary ${
                        selectedInterests.includes(interest.name)
                          ? "border-primary bg-primary/10"
                          : "border-border"
                      }`}
                      onClick={() => toggleInterest(interest.name)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">
                          {interest.name}
                        </span>
                        {selectedInterests.includes(interest.name) && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {interest.description}
                      </p>
                    </div>
                  ))}
                </div>
                {selectedInterests.length > 0 && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h3 className="text-base font-medium mb-2">
                      Selected Interests ({selectedInterests.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInterests.map((interest) => (
                        <div
                          key={interest}
                          className="bg-background rounded-full px-3 py-1 text-sm flex items-center gap-1"
                        >
                          {interest}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleInterest(interest);
                            }}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg h-12"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
                <Button
                  size="lg"
                  className="text-lg h-12 px-6"
                  onClick={() => setStep(3)}
                  disabled={!isStep2Valid}
                >
                  Continue
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-2 transition-all duration-300 animate-in fade-in-50 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Invite Members</CardTitle>
                <CardDescription className="text-base">
                  Invite friends to join your new group (optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="invite-email"
                    className="text-base font-medium"
                  >
                    Invite by Email
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="invite-email"
                      type="email"
                      placeholder="Enter email address"
                      className="text-lg h-14"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addInviteEmail();
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      className="text-base h-14 px-4"
                      onClick={addInviteEmail}
                      disabled={!inviteEmail || !inviteEmail.includes("@")}
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Add
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter email addresses of people you'd like to invite to your
                    group.
                  </p>
                </div>

                {invitedEmails.length > 0 && (
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="text-base font-medium mb-2">
                      Invited Members ({invitedEmails.length})
                    </h3>
                    <div className="space-y-2">
                      {invitedEmails.map((email) => (
                        <div
                          key={email}
                          className="flex items-center justify-between bg-background rounded-lg p-3"
                        >
                          <span>{email}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeInvitedEmail(email)}
                            className="h-8 w-8 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-base font-medium">Suggested Members</h3>
                  <div className="space-y-3">
                    {suggestedMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                            <img
                              src={
                                member.avatar ||
                                "/placeholder.svg?height=48&width=48"
                              }
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-base">
                              {member.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {member.interests}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="text-base">
                          Invite
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <h3 className="text-base font-medium flex items-center gap-2 text-primary">
                    <HelpCircle className="h-5 w-5" />
                    Helpful Tip
                  </h3>
                  <p className="mt-2 text-sm">
                    You can always invite more members after your group is
                    created. Your group will also be discoverable by others with
                    similar interests.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg h-12"
                  onClick={() => setStep(2)}
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
                <Button
                  size="lg"
                  className="text-lg h-12 px-6"
                  onClick={handleCreateGroup}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Group...
                    </>
                  ) : (
                    <Link to="/creategroupchat">
                        Create Group
                        <Users className="ml-2 h-5 w-5" />
                    </Link>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Need help creating a group?{" "}
              <Link to="/help" className="text-primary hover:underline">
                View our guide
              </Link>{" "}
              or{" "}
              <Link to="/contact" className="text-primary hover:underline">
                contact support
              </Link>
              .
            </p>
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
const interests = [
  {
    id: 1,
    name: "Photography",
    description: "Taking and sharing photos",
  },
  {
    id: 2,
    name: "Gardening",
    description: "Growing plants and flowers",
  },
  {
    id: 3,
    name: "Reading",
    description: "Books and literature discussions",
  },
  {
    id: 4,
    name: "Walking",
    description: "Group walks and hikes",
  },
  {
    id: 5,
    name: "Cooking",
    description: "Recipes and cooking techniques",
  },
  {
    id: 6,
    name: "Crafts",
    description: "Handmade arts and crafts",
  },
  {
    id: 7,
    name: "Technology",
    description: "Learning about computers and devices",
  },
  {
    id: 8,
    name: "Music",
    description: "Enjoying and discussing music",
  },
  {
    id: 9,
    name: "Travel",
    description: "Sharing travel experiences",
  },
  {
    id: 10,
    name: "History",
    description: "Local and world history",
  },
  {
    id: 11,
    name: "Movies",
    description: "Film watching and discussion",
  },
  {
    id: 12,
    name: "Board Games",
    description: "Playing and learning games",
  },
];

const suggestedMembers = [
  {
    id: 1,
    name: "Eleanor Thompson",
    interests: "Photography, Gardening",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    name: "Robert Wilson",
    interests: "Reading, Walking",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    name: "Patricia Davis",
    interests: "Cooking, Crafts",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 4,
    name: "William Brown",
    interests: "Technology, Music",
    avatar: "/placeholder.svg?height=48&width=48",
  },
];
