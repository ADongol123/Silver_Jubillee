import { Phone, Users, Calendar, MessageSquare, Group } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Banner from "../../public/banner.jpg";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Users className="h-6 w-6 text-primary" />
            <span>AgeTogether</span>
          </Link>
          <Button asChild size="lg" className="text-base">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-20 lg:py-28">
          <div className="grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-6">
              <h3 className="text-6xl font-bold sm:text-3xl md:text-5xl">
                From Isolation to Connection, Your Journey Starts Here.
              </h3>
              <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Take the first step toward friendships, support, and shared
                moments that matter.
              </p>
              <Button asChild size="lg" className="text-lg">
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
            <img
              src={Banner}
              alt={"Name"}
              className="w-full h-128 object-cover"
            />
          </div>
        </section>

        <section
          id="features"
          className="w-full bg-muted py-12 md:py-24 lg:py-32"
        >
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Features Designed for You
                </h2>
                <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl/relaxed">
                  Simple tools to help you stay connected with the people who
                  matter most.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Group className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Group Recommendation</h3>
                <p className="text-center text-md text-muted-foreground">
                  Discover groups that match your interests and connect with
                  like-minded people
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Chats</h3>
                <p className="text-center text-md text-muted-foreground">
                  Connect and chat with like-minded individuals who share your
                  passions
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Event Reminders</h3>
                <p className="text-center text-md text-muted-foreground">
                  Never miss an event with timely reminders straight to your
                  calendar
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl/relaxed">
                  Join thousands of seniors who have rediscovered the joy of
                  staying connected.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-4">
                <Button asChild size="lg" className="w-full text-lg">
                  <Link to="/signUp">Sign Up Now</Link>
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted">
        <div className="container flex flex-col gap-6 py-8 px-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Users className="h-6 w-6 text-primary" />
              <span>AgeTogether</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AgeTogether. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
