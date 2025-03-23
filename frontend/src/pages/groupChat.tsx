"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FileText,
  Image,
  Info,
  Mic,
  Phone,
  Send,
  Smile,
  Users,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function GroupChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate someone typing
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      if (messages.length > 0 && !isTyping) {
        const randomIndex = Math.floor(Math.random() * 5);
        if (randomIndex === 0) {
          setIsTyping(true);
          setTimeout(() => {
            const newMsg: Message = {
              id: Date.now().toString(),
              sender: {
                id: "user2",
                name: "Eleanor Thompson",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "Has anyone tried the new community garden? I heard they have some interesting workshops coming up.",
              timestamp: new Date().toISOString(),
            };
            setMessages([...messages, newMsg]);
            setIsTyping(false);
          }, 3000);
        }
      }
    }, 10000);

    return () => clearTimeout(typingTimeout);
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: {
          id: "user1",
          name: "Margaret Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-primary">AgeTogther</h1>
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

      <div className="container px-4 py-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
        <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Photography Enthusiasts</h2>
                <div className="text-sm text-muted-foreground">
                  42 members • 5 online
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_250px] gap-4 flex-1 overflow-hidden mt-4">
            <div className="flex flex-col h-full">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4 pb-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                      April 15, 2025
                    </div>
                  </div>

                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isCurrentUser={message.sender.id === "user1"}
                    />
                  ))}

                  {isTyping && (
                    <div className="flex items-start gap-3 max-w-[80%]">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Eleanor Thompson"
                        />
                        <AvatarFallback>ET</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-2 text-lg">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="mt-4 border-t pt-4">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type your message..."
                      className="pr-24 text-base py-6 min-h-[60px]"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                            >
                              <Smile className="h-5 w-5 text-muted-foreground" />
                              <span className="sr-only">Add emoji</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add emoji</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                            >
                              <Image className="h-5 w-5 text-muted-foreground" />
                              <span className="sr-only">Add image</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add image</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                            >
                              <Mic className="h-5 w-5 text-muted-foreground" />
                              <span className="sr-only">Voice message</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Voice message</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <Button
                    className="h-[60px] w-[60px] rounded-full"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden md:block border-l pl-4">
              <Tabs defaultValue="members">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                </TabsList>
                <TabsContent value="members" className="pt-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Online • 5
                    </div>
                    {onlineMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
                      >
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-background"></span>
                        </div>
                        <div className="text-sm font-medium">{member.name}</div>
                      </div>
                    ))}

                    <div className="text-sm font-medium text-muted-foreground mt-4 mb-2">
                      Offline • 37
                    </div>
                    {offlineMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium">{member.name}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="media" className="pt-4">
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Recent Photos
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-md overflow-hidden bg-muted"
                        >
                          <img
                            src={`/placeholder.svg?height=80&width=80&text=Photo ${
                              i + 1
                            }`}
                            alt={`Shared photo ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Shared Files
                    </div>
                    <div className="space-y-2">
                      {[
                        {
                          name: "Photography_Tips.pdf",
                          size: "2.4 MB",
                          date: "Apr 12",
                        },
                        {
                          name: "Meeting_Notes.docx",
                          size: "1.1 MB",
                          date: "Apr 10",
                        },
                        {
                          name: "Event_Schedule.xlsx",
                          size: "0.8 MB",
                          date: "Apr 5",
                        },
                      ].map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
                        >
                          <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {file.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {file.size} • {file.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  sender: ChatUser;
  text: string;
  timestamp: string;
}

function MessageBubble({
  message,
  isCurrentUser,
}: {
  message: Message;
  isCurrentUser: boolean;
}) {
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex items-start gap-3 ${
        isCurrentUser ? "flex-row-reverse" : ""
      } max-w-[80%] ${isCurrentUser ? "ml-auto" : "mr-auto"}`}
    >
      {!isCurrentUser && (
        <Avatar className="h-10 w-10">
          <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`
        rounded-2xl px-4 py-2 text-lg
        ${
          isCurrentUser
            ? "bg-primary text-primary-foreground rounded-tr-none animate-in slide-in-from-right-5"
            : "bg-muted rounded-tl-none animate-in slide-in-from-left-5"
        }
      `}
      >
        {!isCurrentUser && (
          <div className="font-medium text-sm mb-1">{message.sender.name}</div>
        )}
        <div>{message.text}</div>
        <div
          className={`text-xs mt-1 text-right ${
            isCurrentUser
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          }`}
        >
          {time}
        </div>
      </div>
    </div>
  );
}

// Sample data
const initialMessages: Message[] = [
  {
    id: "1",
    sender: {
      id: "user2",
      name: "Eleanor Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Hello everyone! I'm excited to be part of this photography group.",
    timestamp: "2025-04-15T09:30:00Z",
  },
  {
    id: "2",
    sender: {
      id: "user3",
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Welcome Eleanor! We're planning a photo walk this weekend at the botanical gardens. Would you be interested in joining?",
    timestamp: "2025-04-15T09:32:00Z",
  },
  {
    id: "3",
    sender: {
      id: "user1",
      name: "Margaret Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "That sounds wonderful! I'd love to join the photo walk. What time will it start?",
    timestamp: "2025-04-15T09:35:00Z",
  },
  {
    id: "4",
    sender: {
      id: "user4",
      name: "Patricia Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "We're meeting at 10 AM at the main entrance. Don't forget to bring your camera and comfortable shoes!",
    timestamp: "2025-04-15T09:38:00Z",
  },
  {
    id: "5",
    sender: {
      id: "user2",
      name: "Eleanor Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Perfect! I'll be there. Has anyone tried taking macro photos of flowers? I'm still learning how to get the focus right.",
    timestamp: "2025-04-15T09:40:00Z",
  },
  {
    id: "6",
    sender: {
      id: "user1",
      name: "Margaret Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "I've been practicing macro photography! The key is to use a tripod and adjust your aperture for better depth of field. I can show you some techniques this weekend.",
    timestamp: "2025-04-15T09:42:00Z",
  },
];

const onlineMembers = [
  {
    id: "1",
    name: "Margaret Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Eleanor Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Robert Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Patricia Davis",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "William Brown",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const offlineMembers = [
  {
    id: "6",
    name: "James Miller",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Mary Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "John Anderson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    name: "Linda Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "10",
    name: "David Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
