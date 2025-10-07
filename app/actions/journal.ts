"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createJournalEntry({
  title,
  content,
  mood,
}: {
  title: string
  content: string
  mood: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data, error } = await supabase
    .from("journal_entries")
    .insert({
      user_id: user.id,
      title: title || null,
      content,
      mood: mood || null,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  revalidatePath("/journal")
  revalidatePath("/dashboard")

  return data
}

export async function updateJournalEntry(
  entryId: string,
  { title, content, mood }: { title: string; content: string; mood: string },
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data, error } = await supabase
    .from("journal_entries")
    .update({
      title: title || null,
      content,
      mood: mood || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", entryId)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) {
    throw error
  }

  revalidatePath("/journal")
  revalidatePath(`/journal/${entryId}`)

  return data
}

export async function deleteJournalEntry(entryId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { error } = await supabase.from("journal_entries").delete().eq("id", entryId).eq("user_id", user.id)

  if (error) {
    throw error
  }

  revalidatePath("/journal")
  revalidatePath("/dashboard")

  return { success: true }
}
