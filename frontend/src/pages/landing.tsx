import { Phone, Users, Calendar, MessageSquare } from "lucide-react";

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
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Video Calls</h3>
                <p className="text-center text-lg text-muted-foreground">
                  Easy one-click video calls to see and talk with your loved
                  ones anytime.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Simple Messaging</h3>
                <p className="text-center text-lg text-muted-foreground">
                  Send messages, photos, and updates with our easy-to-use
                  messaging system.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Event Reminders</h3>
                <p className="text-center text-lg text-muted-foreground">
                  Never miss important family events with our reminder system.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How ConnectWell Works
                </h2>
                <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl/relaxed">
                  Three simple steps to get started and stay connected.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="text-2xl font-bold">Sign Up</h3>
                <p className="text-center text-lg text-muted-foreground">
                  Create your account with just your name and email. No
                  complicated forms.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="text-2xl font-bold">Add Contacts</h3>
                <p className="text-center text-lg text-muted-foreground">
                  Add family members and friends to your contact list with their
                  email.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-2xl font-bold">Start Connecting</h3>
                <p className="text-center text-lg text-muted-foreground">
                  Begin making video calls, sending messages, and sharing
                  moments.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full bg-muted py-12 md:py-24 lg:py-32"
        >
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What Our Users Say
                </h2>
                <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl/relaxed">
                  Hear from seniors who have transformed their social lives with
                  ConnectWell.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div>
                  <p className="text-lg text-muted-foreground">
                    "ConnectWell has changed my life. I can see my grandchildren
                    every day now, even though they live across the country. The
                    big buttons and simple design make it so easy to use."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-1">
                    <div className="h-12 w-12 rounded-full bg-muted" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Margaret, 78</p>
                    <p className="text-sm text-muted-foreground">
                      User for 1 year
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div>
                  <p className="text-lg text-muted-foreground">
                    "I was feeling so isolated after my wife passed. ConnectWell
                    helped me reconnect with old friends and even make new ones
                    through the community groups. It's so simple to use."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-1">
                    <div className="h-12 w-12 rounded-full bg-muted" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Robert, 82</p>
                    <p className="text-sm text-muted-foreground">
                      User for 8 months
                    </p>
                  </div>
                </div>
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
