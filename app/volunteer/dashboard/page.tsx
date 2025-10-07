import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle, Clock, CheckCircle, Users } from "lucide-react"

export default async function VolunteerDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  if (!profile?.is_volunteer) {
    redirect("/volunteer")
  }

  // Fetch pending alerts
  const { data: pendingAlerts } = await supabase
    .from("crisis_alerts")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false })

  // Fetch assigned alerts
  const { data: assignedAlerts } = await supabase
    .from("crisis_alerts")
    .select("*")
    .eq("assigned_volunteer_id", user.id)
    .neq("status", "resolved")
    .order("created_at", { ascending: false })

  // Fetch resolved alerts
  const { data: resolvedAlerts } = await supabase
    .from("crisis_alerts")
    .select("*")
    .eq("assigned_volunteer_id", user.id)
    .eq("status", "resolved")
    .order("resolved_at", { ascending: false })
    .limit(5)

  const getSeverityColor = (severity: string) => {
    return severity === "critical" ? "destructive" : "default"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Volunteer Dashboard</h1>
            <p className="text-muted-foreground">Thank you for helping others in their time of need</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  <span className="text-3xl font-bold">{pendingAlerts?.length || 0}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Your Active Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold">{assignedAlerts?.length || 0}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Resolved Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-bold">{resolvedAlerts?.length || 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Alerts */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Pending Crisis Alerts
              </CardTitle>
              <CardDescription>New alerts that need volunteer support</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingAlerts && pendingAlerts.length > 0 ? (
                <div className="space-y-3">
                  {pendingAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                          <Badge variant="outline" className="capitalize">
                            {alert.alert_type.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(alert.created_at).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <Link href={`/volunteer/alerts/${alert.id}`}>
                        <Button size="sm">View & Respond</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No pending alerts at the moment</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Your Active Cases */}
          {assignedAlerts && assignedAlerts.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Active Cases
                </CardTitle>
                <CardDescription>Cases you're currently supporting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assignedAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                          <Badge variant="outline" className="capitalize">
                            {alert.alert_type.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Started {new Date(alert.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Link href={`/volunteer/alerts/${alert.id}`}>
                        <Button size="sm" variant="outline">
                          Continue
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
