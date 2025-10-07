import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, MessageCircle, BookOpen, MapPin, AlertCircle, TrendingUp, Shield } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  const { data: adminRole } = await supabase.from("admin_roles").select("role").eq("user_id", user.id).single()

  // Fetch recent diagnostic results
  const { data: recentTests } = await supabase
    .from("diagnostic_results")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3)

  // Fetch recent journal entries count
  const { count: journalCount } = await supabase
    .from("journal_entries")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} isAdmin={!!adminRole} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {profile?.full_name || "Friend"}</h1>
          <p className="text-muted-foreground">How are you feeling today?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/assessments">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Take Assessment</CardTitle>
                <CardDescription>Screen for ADHD, depression, or anxiety</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Chat with AI</CardTitle>
                <CardDescription>24/7 support and coping strategies</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/journal">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Write in Journal</CardTitle>
                <CardDescription>Express your thoughts privately</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/institutions">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Find Help</CardTitle>
                <CardDescription>Locate mental health services</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {adminRole && (
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Admin Access
              </CardTitle>
              <CardDescription>You have {adminRole.role.replace("_", " ")} privileges</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button className="w-full sm:w-auto">
                  <Shield className="h-4 w-4 mr-2" />
                  Go to Admin Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Assessments */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Assessments
              </CardTitle>
              <CardDescription>Your latest mental health screenings</CardDescription>
            </CardHeader>
            <CardContent>
              {recentTests && recentTests.length > 0 ? (
                <div className="space-y-4">
                  {recentTests.map((test) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div>
                        <p className="font-medium capitalize">{test.test_type} Assessment</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(test.created_at).toLocaleDateString()} • Severity: {test.severity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{test.score}</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">You haven't taken any assessments yet</p>
                  <Link href="/assessments">
                    <Button>Take Your First Assessment</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Journal Stats & Quick Links */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Journal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-primary">{journalCount || 0}</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Entries</p>
                </div>
                <Link href="/journal">
                  <Button className="w-full mt-4">Write New Entry</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <AlertCircle className="h-5 w-5" />
                  Need Help Now?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">If you're in crisis, reach out immediately:</p>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Kaan Pete Roi:</span>
                    <br />
                    +880-2-5853305 (24/7)
                  </p>
                  <p>
                    <span className="font-semibold">Moner Bondhu:</span>
                    <br />
                    +880-1779-554391
                  </p>
                </div>
                <Link href="/chat">
                  <Button variant="outline" className="w-full mt-2 bg-transparent">
                    Chat with AI Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
