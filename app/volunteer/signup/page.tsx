"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { becomeVolunteer } from "@/app/actions/volunteer"

export default function VolunteerSignupPage() {
  const [specialization, setSpecialization] = useState("")
  const [availability, setAvailability] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) return

    setLoading(true)

    try {
      await becomeVolunteer({ specialization, availability })
      router.push("/volunteer/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error signing up as volunteer:", error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Application</CardTitle>
              <CardDescription>Tell us about yourself and your availability to help others</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="specialization">
                    Area of Interest or Experience <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <Input
                    id="specialization"
                    placeholder="e.g., Depression support, Anxiety management, ADHD, General support"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Share any specific areas where you feel comfortable providing support
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Your Availability</Label>
                  <Textarea
                    id="availability"
                    placeholder="e.g., Weekday evenings 6-10pm, Weekend mornings, Flexible schedule"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    required
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Let us know when you're typically available to respond to crisis alerts
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                        I understand that as a volunteer, I will maintain strict confidentiality, provide compassionate
                        support, and recognize when professional help is needed. I will guide users to appropriate
                        resources and emergency services when necessary.
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading || !agreedToTerms} className="flex-1">
                    {loading ? "Submitting..." : "Become a Volunteer"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
