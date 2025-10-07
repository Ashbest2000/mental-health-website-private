"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function saveAssessmentResult({
  testType,
  score,
  severity,
  responses,
}: {
  testType: string
  score: number
  severity: string
  responses: Record<number, string>
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  // Generate AI recommendations based on test type and severity
  let recommendations = ""
  if (testType === "depression") {
    if (severity === "severe" || severity === "moderately severe") {
      recommendations =
        "Your results suggest significant depression symptoms. We strongly recommend speaking with a mental health professional. Consider reaching out to NIMH or Bangabandhu Sheikh Mujib Medical University for professional support. In the meantime, try to maintain a routine, stay connected with supportive people, and avoid isolation."
    } else if (severity === "moderate") {
      recommendations =
        "Your results indicate moderate depression symptoms. Consider talking to a counselor or therapist. Regular exercise, maintaining sleep schedules, and connecting with friends can help. Our AI chatbot is available 24/7 for support."
    } else if (severity === "mild") {
      recommendations =
        "You're experiencing mild depression symptoms. Self-care practices like regular exercise, good sleep hygiene, and social connection can be helpful. Consider journaling your thoughts and feelings. If symptoms persist or worsen, reach out to a professional."
    } else {
      recommendations =
        "Your results suggest minimal depression symptoms. Continue maintaining healthy habits like regular exercise, good sleep, and social connections. Use our journal feature to track your mood over time."
    }
  } else if (testType === "anxiety") {
    if (severity === "severe") {
      recommendations =
        "Your results indicate severe anxiety symptoms. Professional help is strongly recommended. Contact a mental health professional at institutions like NIMH or Moner Bondhu Foundation. Practice deep breathing exercises and try to identify anxiety triggers. Our crisis support is available if you need immediate help."
    } else if (severity === "moderate") {
      recommendations =
        "You're experiencing moderate anxiety. Consider speaking with a therapist who can teach you coping strategies. Mindfulness meditation, regular exercise, and limiting caffeine can help manage symptoms. Our AI chatbot can guide you through relaxation techniques."
    } else if (severity === "mild") {
      recommendations =
        "You have mild anxiety symptoms. Try relaxation techniques like deep breathing, progressive muscle relaxation, or meditation. Regular physical activity and adequate sleep are important. Consider using our journal to identify patterns in your anxiety."
    } else {
      recommendations =
        "Your results show minimal anxiety symptoms. Continue practicing stress management techniques and maintain healthy lifestyle habits. Our resources section has helpful information on managing stress."
    }
  } else if (testType === "adhd") {
    if (severity === "severe" || severity === "moderate") {
      recommendations =
        "Your responses suggest significant ADHD symptoms. We recommend consulting with a psychiatrist or psychologist who specializes in ADHD for a comprehensive evaluation. They can discuss treatment options including behavioral strategies and medication if appropriate. In the meantime, try using organizational tools, breaking tasks into smaller steps, and minimizing distractions."
    } else if (severity === "mild") {
      recommendations =
        "You're showing some ADHD symptoms. Consider speaking with a mental health professional for a proper evaluation. Organizational strategies, time management tools, and regular routines can be helpful. Our resources section has tips for managing attention and focus."
    } else {
      recommendations =
        "Your results suggest minimal ADHD symptoms. If you're experiencing difficulties with attention or organization, consider exploring productivity techniques and organizational tools. Our resources can provide helpful strategies."
    }
  }

  const { data, error } = await supabase
    .from("diagnostic_results")
    .insert({
      user_id: user.id,
      test_type: testType,
      score,
      severity,
      responses,
      recommendations,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  revalidatePath("/dashboard")
  revalidatePath("/assessments")

  return data
}
