import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Users, Clock, Shield, CheckCircle } from "lucide-react"

export default async function VolunteerPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  if (profile?.is_volunteer) {
    redirect("/volunteer/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Become a Volunteer</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help others in their mental health journey by providing compassionate support during difficult times
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Make a Real Difference</CardTitle>
                <CardDescription>
                  Provide immediate support to people experiencing mental health crises and help them connect with
                  professional resources
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Flexible Commitment</CardTitle>
                <CardDescription>
                  Choose when you're available to help. Respond to alerts on your own schedule while making a meaningful
                  impact
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Safe & Supported</CardTitle>
                <CardDescription>
                  Access guidelines, resources, and support. You're never alone in helping others through their
                  challenges
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Training Provided</CardTitle>
                <CardDescription>
                  Get access to mental health first aid resources and best practices for supporting people in crisis
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Requirements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Volunteer Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Compassion & Empathy</p>
                  <p className="text-sm text-muted-foreground">
                    Ability to listen without judgment and provide emotional support
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Availability</p>
                  <p className="text-sm text-muted-foreground">
                    Commit to checking the volunteer dashboard regularly when you're available
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Confidentiality</p>
                  <p className="text-sm text-muted-foreground">
                    Maintain strict confidentiality of all conversations and user information
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Know Your Limits</p>
                  <p className="text-sm text-muted-foreground">
                    Recognize when professional help is needed and guide users to appropriate resources
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="text-center py-8">
              <h3 className="text-xl font-semibold mb-3">Ready to Make a Difference?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Join our community of volunteers and help provide support to those who need it most
              </p>
              <Link href="/volunteer/signup">
                <Button size="lg">Sign Up as Volunteer</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
