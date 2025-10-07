import { createClient } from "@/lib/supabase/server"

export async function checkAdminStatus() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { isAdmin: false, role: null }
  }

  const { data: adminRole } = await supabase.from("admin_roles").select("role").eq("user_id", user.id).single()

  return {
    isAdmin: !!adminRole,
    role: adminRole?.role || null,
  }
}
