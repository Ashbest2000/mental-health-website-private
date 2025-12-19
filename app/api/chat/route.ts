import { createClient } from "@/lib/supabase/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export const maxDuration = 30

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY || "")

export async function POST(req: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  if (!process.env.AI_API_KEY) {
    console.error("AI_API_KEY is not set in environment variables")
    return new Response("Server configuration error: AI API key is missing", { status: 500 })
  }

  try {
    const { messages } = await req.json()

    const userMessages = messages
      .filter((m: any) => m.role === "user")
      .map((m: any) => {
        if (typeof m.content === "string") {
          return m.content.toLowerCase()
        }
        return String(m.content || "").toLowerCase()
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

      await supabase.from("crisis_alerts").insert({
        user_id: user.id,
        alert_type: "suicide",
        severity: "critical",
        message: userMessages[userMessages.length - 1],
        status: "pending",
      })

      const lastMessage = messages[messages.length - 1] as any
      const lastMessageContent = typeof lastMessage.content === "string" ? lastMessage.content : String(lastMessage.content || "")

      await supabase.from("chat_messages").insert({
        user_id: user.id,
        role: "user",
        content: lastMessageContent,
        risk_level: "critical",
        flagged_for_review: true,
      })
    } else {
      const lastMessage = messages[messages.length - 1] as any
      const lastMessageContent = typeof lastMessage.content === "string" ? lastMessage.content : String(lastMessage.content || "")

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

    const conversationHistory = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: typeof m.content === "string" ? m.content : String(m.content || "") }],
    }))

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    })

    const lastMessage = conversationHistory[conversationHistory.length - 1]
    const history = conversationHistory.slice(0, -1)

    const result = await model.generateContentStream({
      contents: [...history, lastMessage],
    })

    const encoder = new TextEncoder()
    let fullResponse = ""

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) {
              fullResponse += text
              const escapedText = text.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r")
              const data = `0:{"type":"text-delta","textDelta":"${escapedText}"}\n`
              controller.enqueue(encoder.encode(data))
            }
          }

          await supabase.from("chat_messages").insert({
            user_id: user.id,
            role: "assistant",
            content: fullResponse,
            risk_level: hasCrisisIndicators ? "critical" : "none",
          })

          controller.close()
        } catch (error: any) {
          console.error("Streaming error:", error)
          controller.error(error)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error: any) {
    console.error("Chat API error:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
