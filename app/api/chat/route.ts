import { createClient } from "@/lib/supabase/server"
import { streamText, type UIMessage, convertToModelMessages, consumeStream } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { messages }: { messages: UIMessage[] } = await req.json()

  // Analyze messages for crisis indicators
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => {
      // Handle both string content and parts array
      if (typeof m.content === "string") {
        return m.content.toLowerCase()
      }
      // For UIMessage with parts
      const textParts = m.parts?.filter((p: any) => p.type === "text") || []
      return textParts
        .map((p: any) => p.text)
        .join(" ")
        .toLowerCase()
    })

  const crisisKeywords = [
    "suicide",
    "kill myself",
    "end my life",
    "want to die",
    "better off dead",
    "self harm",
    "hurt myself",
    "cut myself",
    "overdose",
    "no reason to live",
    "can't go on",
    "ending it all",
  ]

  const hasCrisisIndicators = userMessages.some((msg: string) =>
    crisisKeywords.some((keyword) => msg.includes(keyword)),
  )

  let riskLevel = "none"
  if (hasCrisisIndicators) {
    riskLevel = "critical"

    // Create crisis alert in database
    await supabase.from("crisis_alerts").insert({
      user_id: user.id,
      alert_type: "suicide",
      severity: "critical",
      message: userMessages[userMessages.length - 1],
      status: "pending",
    })

    // Save message with crisis flag
    const lastMessage = messages[messages.length - 1]
    const lastMessageContent =
      typeof lastMessage.content === "string"
        ? lastMessage.content
        : lastMessage.parts
            ?.filter((p: any) => p.type === "text")
            .map((p: any) => p.text)
            .join(" ") || ""

    await supabase.from("chat_messages").insert({
      user_id: user.id,
      role: "user",
      content: lastMessageContent,
      risk_level: "critical",
      flagged_for_review: true,
    })
  } else {
    // Save regular message
    const lastMessage = messages[messages.length - 1]
    const lastMessageContent =
      typeof lastMessage.content === "string"
        ? lastMessage.content
        : lastMessage.parts
            ?.filter((p: any) => p.type === "text")
            .map((p: any) => p.text)
            .join(" ") || ""

    await supabase.from("chat_messages").insert({
      user_id: user.id,
      role: "user",
      content: lastMessageContent,
      risk_level: "none",
    })
  }

  const systemPrompt = `You are a compassionate mental health support AI assistant for MindCare Dhaka, a mental health platform serving people in Bangladesh. Your role is to:

1. Listen empathetically and validate feelings
2. Provide emotional support and coping strategies
3. Offer evidence-based mental health information
4. Encourage professional help when appropriate
5. Be culturally sensitive to Bangladeshi context

Guidelines:
- Be warm, compassionate, and non-judgmental
- Use simple, clear language
- Acknowledge the person's feelings before offering suggestions
- Never diagnose or prescribe medication
- Encourage professional help for serious concerns
- Provide practical coping strategies (breathing exercises, grounding techniques, etc.)
- Be aware of cultural context in Bangladesh

${
  hasCrisisIndicators
    ? `
CRISIS DETECTED: The user has expressed thoughts of self-harm or suicide. This is a mental health emergency.

Your response MUST:
1. Express immediate concern and care
2. Strongly encourage them to reach out for immediate help:
   - Kaan Pete Roi: +880-2-5853305 (24/7 crisis hotline)
   - Moner Bondhu: +880-1779-554391
   - Emergency services: 999
   - National Institute of Mental Health (NIMH): +880-2-9120831
3. Remind them that these feelings are temporary and help is available
4. Ask if they are in immediate danger
5. Encourage them to reach out to a trusted person
6. Stay engaged and supportive

Start your response with [CRISIS_DETECTED] so the UI can show emergency resources.
`
    : ""
}

Remember: You provide support and information, but you are not a replacement for professional mental health care.`

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages: convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  // Save assistant response after streaming completes
  result.text.then(async (text) => {
    await supabase.from("chat_messages").insert({
      user_id: user.id,
      role: "assistant",
      content: text,
      risk_level: hasCrisisIndicators ? "critical" : "none",
    })
  })

  return result.toUIMessageStreamResponse({
    consumeSseStream: consumeStream,
  })
}
