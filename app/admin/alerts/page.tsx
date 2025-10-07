import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"

export default async function AlertsManagement() {
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

  const { data: alerts } = await supabase
    .from("crisis_alerts")
    .select("*, user_profiles(full_name)")
    .order("created_at", { ascending: false })
    .limit(100)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} isAdmin={true} />

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold mb-2">Crisis Alert Center</h1>
        <p className="text-muted-foreground mb-6">Monitor and respond to high-risk alerts</p>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              All Crisis Alerts ({alerts?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Detected</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts?.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-mono text-xs">{alert.user_id.slice(0, 8)}...</TableCell>
                    <TableCell>
                      <Badge variant={getRiskColor(alert.risk_level)}>{alert.risk_level.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{Math.round(alert.confidence_score * 100)}%</TableCell>
                    <TableCell>{new Date(alert.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={alert.resolved ? "outline" : "default"}>
                        {alert.resolved ? "Resolved" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/alerts/${alert.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
