"use client";

import type React from "react";
import { useState } from "react";
import { z } from "zod";
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
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { postRequest } from "@/api/utils";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  age: z.coerce.number().int().min(13, "You must be at least 13 years old"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const availableInterests = [
  "Art",
  "Books",
  "Cooking",
  "Design",
  "Fashion",
  "Fitness",
  "Gaming",
  "Gardening",
  "History",
  "Movies",
  "Music",
  "Photography",
  "Programming",
  "Science",
  "Sports",
  "Technology",
  "Travel",
  "Writing",
];

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    password: "",
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [interestPopoverOpen, setInterestPopoverOpen] = useState(false);

  const handleInterestSelect = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }

    // Clear interest error if it exists
    if (errors.interests) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.interests;
        return newErrors;
      });
    }
  };

  const removeInterest = (interest: string) => {
    setSelectedInterests(selectedInterests.filter((i) => i !== interest));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const validatedData = signupSchema.parse(formData);
  
      // Retrieve Bearer token from localStorage (or wherever it is stored)
      const token = localStorage.getItem('authToken');
  
      // Send data to the backend via postRequest with Bearer token
      const response = await postRequest("create_user", validatedData, token || "");
  
      if (response) {
        if (response.token) {
          localStorage.setItem("authToken", response.token);
        }
  
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error("Signup failed:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md my-20">
        <CardHeader>
          <CardTitle className="text-2xl mt-10">Sign Up</CardTitle>
          <CardDescription>Create a new account to get started</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {successMessage && (
              <p className="text-sm text-green-600">{successMessage}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                required
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="25"
                required
              />
              {errors.age && (
                <p className="text-sm text-destructive">{errors.age}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Interests</Label>
              <Popover
                open={interestPopoverOpen}
                onOpenChange={setInterestPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={interestPopoverOpen}
                    className="w-full justify-between"
                  >
                    {selectedInterests.length > 0
                      ? `${selectedInterests.length} interest${
                          selectedInterests.length > 1 ? "s" : ""
                        } selected`
                      : "Select interests..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search interests..." />
                    <CommandList>
                      <CommandEmpty>No interests found.</CommandEmpty>
                      <CommandGroup>
                        {availableInterests.map((interest) => (
                          <CommandItem
                            key={interest}
                            value={interest}
                            onSelect={() => handleInterestSelect(interest)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedInterests.includes(interest)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {interest}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedInterests.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedInterests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {interest}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeInterest(interest)}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              {errors.interests && (
                <p className="text-sm text-destructive">{errors.interests}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 mb-10 mt-10">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary underline underline-offset-4 hover:text-primary/90"
              >
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
