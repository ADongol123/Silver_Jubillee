import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import Placeholder from "../../public/placeholder.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GroupCard({ group }: any) {
  const [joining, setJoining] = useState(false);
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  // Check if the user is already a member of the group
  const isMember = group.members.some((member: string) => member === userId);

  const handleJoinGroup = async () => {
    if (!userId || !authToken) {
      console.error("User not authenticated");
      return;
    }

    if (isMember) {
      // If already a member, just redirect
      navigate(`/groupchat/${group._id}`);
      return;
    }

    setJoining(true);

    try {
      const response = await fetch("http://localhost:5000/join_group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          group_id: group._id,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to join the group");
      }

      const data = await response.json();
      console.log("Joined group successfully:", data);

      // Redirect to the group chat page after joining
      navigate(`/groupchat/${group._id}`);
    } catch (error) {
      console.error("Error joining group:", error);
    } finally {
      setJoining(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="p-0">
        <img
          src={group?.image ? group.image : Placeholder}
          alt={group.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2">{group.name}</CardTitle>
        <CardDescription className="text-base mb-4">
          {group.description}
        </CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{group.members.length} members</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {group.category}
          </span>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button
          variant={isMember ? "default" : "outline"}
          className="w-full text-base"
          onClick={handleJoinGroup}
          disabled={joining}
        >
          {isMember ? "Joined" : joining ? "Joining..." : "Join Group"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default GroupCard;
