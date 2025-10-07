import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, AlertTriangle, FileText, Activity, DollarSign } from "lucide-react"
import Link from "next/link"

async function getAdminStats() {
  const supabase = await createClient()

  const [usersCount, volunteersCount, alertsCount, contentCount] = await Promise.all([
    supabase.from("user_profiles").select("*", { count: "exact", head: true }),
    supabase.from("volunteers").select("*", { count: "exact", head: true }),
    supabase
      .from("crisis_alerts")
      .select("*", { count: "exact", head: true })
      .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
    supabase.from("content").select("*", { count: "exact", head: true }),
  ])

  return {
    totalUsers: usersCount.count || 0,
    totalVolunteers: volunteersCount.count || 0,
    recentAlerts: alertsCount.count || 0,
    totalContent: contentCount.count || 0,
  }
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: adminRole } = await supabase.from("admin_roles").select("role").eq("user_id", user.id).single()

  if (!adminRole) {
    redirect("/dashboard")
  }

  const stats = await getAdminStats()

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} isAdmin={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Mental Health Platform Administration</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered platform users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVolunteers}</div>
              <p className="text-xs text-muted-foreground">Approved volunteers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crisis Alerts (24h)</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentAlerts}</div>
              <p className="text-xs text-muted-foreground">High-risk alerts detected</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/users">
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage platform users</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/volunteers">
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader>
                <UserCheck className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Volunteer Management</CardTitle>
                <CardDescription>Approve and manage volunteers</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/alerts">
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 mb-2 text-destructive" />
                <CardTitle>Crisis Alerts</CardTitle>
                <CardDescription>Monitor and respond to alerts</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/institutions">
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader>
                <Activity className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Institutions</CardTitle>
                <CardDescription>Manage mental health facilities</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/content">
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader>
                <FileText className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Create and edit articles</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/payments">
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader>
                <DollarSign className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Payments</CardTitle>
                <CardDescription>View subscription data</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
