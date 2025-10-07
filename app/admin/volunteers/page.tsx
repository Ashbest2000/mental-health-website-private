import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ApproveVolunteerButton } from "@/components/approve-volunteer-button"

export default async function VolunteersManagement() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: adminRole } = await supabase.from("admin_roles").select("role").eq("user_id", user.id).single()

  if (!adminRole || !["super_admin", "moderator"].includes(adminRole.role)) {
    redirect("/dashboard")
  }

  const { data: volunteers } = await supabase
    .from("volunteers")
    .select("*, user_profiles(full_name)")
    .order("created_at", { ascending: false })

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
        <h1 className="text-2xl font-bold mb-2">Volunteer Management</h1>
        <p className="text-muted-foreground mb-6">Approve and manage volunteers</p>

        <Card>
          <CardHeader>
            <CardTitle>All Volunteers ({volunteers?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Qualifications</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteers?.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell className="font-medium">
                      {(volunteer.user_profiles as any)?.full_name || "Anonymous"}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{volunteer.qualifications}</TableCell>
                    <TableCell>{volunteer.availability}</TableCell>
                    <TableCell>{new Date(volunteer.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={volunteer.approved ? "default" : "secondary"}>
                        {volunteer.approved ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {!volunteer.approved && <ApproveVolunteerButton volunteerId={volunteer.id} />}
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
