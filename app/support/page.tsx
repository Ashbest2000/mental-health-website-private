import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Users, Zap, CheckCircle } from "lucide-react"
import Link from "next/link"

export default async function SupportPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={!!user} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Support MindCare Dhaka</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help us provide free mental health support to everyone in Dhaka who needs it
            </p>
          </div>

          {/* Mission */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p>
                MindCare Dhaka is committed to making mental health support accessible to everyone in Bangladesh,
                regardless of their financial situation. All our core services are completely free:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>AI-powered mental health assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>24/7 AI chatbot support with crisis detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Private journal for mental health tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Connection to trained volunteers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Directory of mental health institutions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Ways to Support */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Ways You Can Help</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Become a Volunteer</CardTitle>
                  <CardDescription>
                    Provide direct support to people in crisis. Your compassion can save lives.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/volunteer">
                    <Button className="w-full">Join as Volunteer</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Spread Awareness</CardTitle>
                  <CardDescription>
                    Share MindCare Dhaka with friends and family who might need mental health support.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Share Platform
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Provide Feedback</CardTitle>
                  <CardDescription>
                    Help us improve by sharing your experience and suggestions for the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Send Feedback
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Impact */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="text-center py-8">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Together We Can Make a Difference</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Mental health support should be accessible to everyone. By working together, we can create a community
                where no one has to face their mental health challenges alone.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
