"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function becomeVolunteer({
  specialization,
  availability,
}: {
  specialization: string
  availability: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { error } = await supabase
    .from("user_profiles")
    .update({
      is_volunteer: true,
      volunteer_specialization: specialization || null,
      volunteer_availability: availability,
    })
    .eq("id", user.id)

  if (error) {
    throw error
  }

  revalidatePath("/volunteer")
  revalidatePath("/volunteer/dashboard")

  return { success: true }
}

export async function claimAlert(alertId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  // Verify user is a volunteer
  const { data: profile } = await supabase.from("user_profiles").select("is_volunteer").eq("id", user.id).single()

  if (!profile?.is_volunteer) {
    throw new Error("Not authorized")
  }

  const { error } = await supabase
    .from("crisis_alerts")
    .update({
      status: "assigned",
      assigned_volunteer_id: user.id,
    })
    .eq("id", alertId)
    .eq("status", "pending")

  if (error) {
    throw error
  }

  revalidatePath("/volunteer/dashboard")
  revalidatePath(`/volunteer/alerts/${alertId}`)

  return { success: true }
}

export async function resolveAlert(alertId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { error } = await supabase
    .from("crisis_alerts")
    .update({
      status: "resolved",
      resolved_at: new Date().toISOString(),
    })
    .eq("id", alertId)
    .eq("assigned_volunteer_id", user.id)

  if (error) {
    throw error
  }

  revalidatePath("/volunteer/dashboard")
  revalidatePath(`/volunteer/alerts/${alertId}`)

  return { success: true }
}
