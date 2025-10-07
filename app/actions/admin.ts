"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function approveVolunteer(volunteerId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const { data: adminRole } = await supabase.from("admin_roles").select("role").eq("user_id", user.id).single()

  if (!adminRole || !["super_admin", "moderator"].includes(adminRole.role)) {
    throw new Error("Unauthorized")
  }

  const { error } = await supabase.from("volunteers").update({ approved: true }).eq("id", volunteerId)

  if (error) throw error

  // Log action
  await supabase.from("audit_logs").insert({
    admin_id: user.id,
    action: "approve_volunteer",
    target_type: "volunteer",
    target_id: volunteerId,
  })

  revalidatePath("/admin/volunteers")
}

export async function markAlertResolved(alertId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  // Check if user is admin
  const { data: adminRole } = await supabase.from("admin_roles").select("role").eq("user_id", user.id).single()

  if (!adminRole) {
    throw new Error("Unauthorized")
  }

  const { error } = await supabase
    .from("crisis_alerts")
    .update({ resolved: true, resolved_at: new Date().toISOString() })
    .eq("id", alertId)

  if (error) throw error

  // Log action
  await supabase.from("audit_logs").insert({
    admin_id: user.id,
    action: "resolve_alert",
    target_type: "crisis_alert",
    target_id: alertId,
  })

  revalidatePath("/admin/alerts")
}
