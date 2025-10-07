"use server"

import { createClient } from "@/lib/supabase/server"

export async function getChatHistory() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(50)

  if (error) {
    throw error
  }

  return data
}

export async function clearChatHistory() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { error } = await supabase.from("chat_messages").delete().eq("user_id", user.id)

  if (error) {
    throw error
  }

  return { success: true }
}
