import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"

export default async function InstitutionsManagement() {
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

  const { data: institutions } = await supabase.from("institutions").select("*").order("name", { ascending: true })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Institutions Management</h1>
              <p className="text-muted-foreground">Manage mental health facilities in Dhaka</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Institution
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>All Institutions ({institutions?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Emergency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {institutions?.map((institution) => (
                  <TableRow key={institution.id}>
                    <TableCell className="font-medium">{institution.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{institution.type}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{institution.address}</TableCell>
                    <TableCell>{institution.phone}</TableCell>
                    <TableCell>
                      <Badge variant={institution.emergency_available ? "default" : "secondary"}>
                        {institution.emergency_available ? "Available" : "Not Available"}
                      </Badge>
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
