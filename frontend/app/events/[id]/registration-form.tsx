import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RegistrationForm({ eventId }: { eventId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to register for the event
    try {
      // In a real app, you would send the form data to your API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
      router.refresh() // Refresh the page to update attendee count
    } catch (error) {
      console.error("Error registering for event:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-lg bg-muted p-6 text-center space-y-4">
        <h3 className="text-xl font-semibold text-primary">Registration Successful!</h3>
        <p>Thank you for registering for this event. We've sent a confirmation email with all the details.</p>
        <Button variant="outline" onClick={() => setIsSuccess(false)} className="mt-4">
          Register another attendee
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="(123) 456-7890" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company/Organization</Label>
        <Input id="company" placeholder="Acme Inc." />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing" className="text-sm font-normal">
          I agree to receive updates about future events
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registering...
          </>
        ) : (
          "Register Now"
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By registering, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  )
}

