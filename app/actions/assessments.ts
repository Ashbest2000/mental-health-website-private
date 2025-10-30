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
  } else if (testType === "autism") {
    if (severity === "high") {
      recommendations =
        "Your responses suggest traits commonly associated with autism spectrum. We recommend consulting with a specialist who can conduct a comprehensive evaluation. Many autistic individuals benefit from understanding their neurodivergence and accessing appropriate support. Consider reaching out to autism advocacy organizations or specialists in Dhaka for further assessment and support strategies."
    } else if (severity === "moderate") {
      recommendations =
        "You're showing some traits associated with autism spectrum. A professional evaluation can help determine if you're autistic and what support might be helpful. Many people find that understanding their neurodivergence improves their quality of life. Our resources have information about autism and neurodiversity."
    } else if (severity === "mild") {
      recommendations =
        "You're showing some autistic traits. If you're curious about autism or experiencing challenges, consider speaking with a mental health professional. Self-understanding and acceptance are important. Our resources section has helpful information about neurodiversity."
    } else {
      recommendations =
        "Your results suggest minimal autistic traits. If you have concerns about autism or neurodevelopment, a professional can provide clarity. Remember that neurodiversity is a natural part of human variation."
    }
  } else if (testType === "schizophrenia") {
    if (severity === "severe") {
      recommendations =
        "Your responses suggest significant psychotic symptoms. This requires immediate professional evaluation and support. Please contact a mental health professional, psychiatrist, or visit an emergency service if you're in crisis. Psychotic symptoms are treatable, and early intervention is important. Reach out to NIMH or Bangabandhu Sheikh Mujib Medical University for urgent support."
    } else if (severity === "moderate") {
      recommendations =
        "Your responses suggest some psychotic symptoms that warrant professional evaluation. Please schedule an appointment with a psychiatrist or mental health professional as soon as possible. Early intervention can be very helpful. In the meantime, maintain regular sleep, avoid stress, and reach out to trusted people for support."
    } else if (severity === "mild") {
      recommendations =
        "You're experiencing some symptoms that could benefit from professional evaluation. Consider speaking with a mental health professional to discuss your experiences. Stress management and healthy lifestyle habits can be supportive. Our resources have information about managing mental health."
    } else {
      recommendations =
        "Your results suggest minimal psychotic symptoms. If you're experiencing any concerning thoughts or perceptions, don't hesitate to reach out to a mental health professional. Our resources and support services are available to help."
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
