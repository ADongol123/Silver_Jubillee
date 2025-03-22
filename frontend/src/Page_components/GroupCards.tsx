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
import { Link } from "react-router-dom";
function GroupCard({ group }: any) {
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
            <span className="text-sm">{group.members} members</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {group.category}
          </span>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Link to="/groupchat">
          <Button variant="outline" className="w-full text-base">
            Join Group
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default GroupCard;
