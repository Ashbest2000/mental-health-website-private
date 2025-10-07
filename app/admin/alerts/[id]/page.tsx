import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MarkAlertResolvedButton } from "@/components/mark-alert-resolved-button"

export default async function AlertDetail({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: adminRole } = await supabase.from("admin_roles").select("role").eq("user_id", user.id).single()

  if (!adminRole) {
    redirect("/dashboard")
  }

  const { data: alert } = await supabase.from("crisis_alerts").select("*").eq("id", params.id).single()

  if (!alert) {
    redirect("/admin/alerts")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} isAdmin={true} />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href="/admin/alerts"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Alerts
        </Link>
        <h1 className="text-2xl font-bold mb-6">Crisis Alert Details</h1>

        <Card>
          <CardHeader>
            <CardTitle>Alert Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-mono text-sm">{alert.user_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <Badge variant="destructive">{alert.risk_level.toUpperCase()}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
                <p className="font-semibold">{Math.round(alert.confidence_score * 100)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={alert.resolved ? "outline" : "default"}>{alert.resolved ? "Resolved" : "Active"}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Detected At</p>
                <p>{new Date(alert.created_at).toLocaleString()}</p>
              </div>
              {alert.resolved_at && (
                <div>
                  <p className="text-sm text-muted-foreground">Resolved At</p>
                  <p>{new Date(alert.resolved_at).toLocaleString()}</p>
                </div>
              )}
            </div>

            {alert.message && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Trigger Message</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">{alert.message}</p>
                </div>
              </div>
            )}

            <div className="pt-4">
              <h3 className="font-semibold mb-2">Emergency Resources</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>National Mental Health Helpline:</strong> 09678 771 771
                </p>
                <p>
                  <strong>Kaan Pete Roi (Suicide Prevention):</strong> 01779 554 391
                </p>
                <p>
                  <strong>Emergency Services:</strong> 999
                </p>
              </div>
            </div>

            {!alert.resolved && (
              <div className="pt-4">
                <MarkAlertResolvedButton alertId={alert.id} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
