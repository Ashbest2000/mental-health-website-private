import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Phone, MapPin } from "lucide-react"
import { ClaimAlertButton } from "@/components/claim-alert-button"
import { ResolveAlertButton } from "@/components/resolve-alert-button"

export default async function AlertDetailPage({ params }: { params: { id: string } }) {
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

  const { data: alert, error } = await supabase.from("crisis_alerts").select("*").eq("id", params.id).single()

  if (error || !alert) {
    redirect("/volunteer/dashboard")
  }

  const isAssignedToMe = alert.assigned_volunteer_id === user.id
  const canClaim = alert.status === "pending"
  const canResolve = isAssignedToMe && alert.status === "assigned"

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Alert Details */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-accent" />
                    Crisis Alert Details
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={alert.severity === "critical" ? "destructive" : "default"}>{alert.severity}</Badge>
                    <Badge variant="outline" className="capitalize">
                      {alert.alert_type.replace("_", " ")}
                    </Badge>
                    <Badge variant="secondary" className="capitalize">
                      {alert.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription>
                Reported on{" "}
                {new Date(alert.created_at).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alert.message && (
                <div>
                  <p className="text-sm font-medium mb-2">User Message:</p>
                  <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">{alert.message}</p>
                </div>
              )}

              {canClaim && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This alert is waiting for a volunteer to respond. Click below to take this case.
                  </AlertDescription>
                </Alert>
              )}

              {isAssignedToMe && alert.status === "assigned" && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>You are currently handling this case.</AlertDescription>
                </Alert>
              )}

              {alert.status === "resolved" && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This case has been resolved on{" "}
                    {alert.resolved_at &&
                      new Date(alert.resolved_at).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Emergency Resources */}
          <Card className="bg-accent/10 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <Phone className="h-5 w-5" />
                Emergency Resources
              </CardTitle>
              <CardDescription>Share these resources with the person in crisis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold mb-1">24/7 Crisis Hotlines:</p>
                <div className="text-sm space-y-1">
                  <p>Kaan Pete Roi: +880-2-5853305</p>
                  <p>Moner Bondhu: +880-1779-554391</p>
                  <p>Emergency Services: 999</p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-1 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Immediate Professional Help:
                </p>
                <div className="text-sm space-y-1">
                  <p>National Institute of Mental Health (NIMH): +880-2-9120831</p>
                  <p>Bangabandhu Sheikh Mujib Medical University: +880-2-9668690</p>
                  <p>Dhaka Medical College Hospital: +880-2-9668690</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Listen with empathy and without judgment</p>
              <p>• Validate their feelings and let them know they're not alone</p>
              <p>• Encourage them to reach out to professional help immediately</p>
              <p>• Share the emergency hotline numbers above</p>
              <p>• If they're in immediate danger, encourage them to call 999</p>
              <p>• Stay calm and supportive throughout the conversation</p>
              <p>• Do not attempt to diagnose or provide medical advice</p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            {canClaim && <ClaimAlertButton alertId={alert.id} />}
            {canResolve && <ResolveAlertButton alertId={alert.id} />}
          </div>
        </div>
      </div>
    </div>
  )
}
