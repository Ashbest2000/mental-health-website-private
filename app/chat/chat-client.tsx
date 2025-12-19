"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Send, Bot, User, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ChatClient() {
  const [crisisDetected, setCrisisDetected] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const messageToSend = input.trim()
    if (!messageToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageToSend,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error:", response.status, errorText)
        throw new Error(`Failed to send message: ${response.status} ${errorText}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (reader) {
        let buffer = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          buffer = lines.pop() || ""

          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const data = line.slice(2).trim()
                if (data) {
                  const parsed = JSON.parse(data)
                  if (parsed.type === "text-delta" && parsed.textDelta) {
                    assistantMessage.content += parsed.textDelta
                    setMessages((prev) => {
                      const updated = [...prev]
                      const lastMsg = updated[updated.length - 1]
                      if (lastMsg && lastMsg.role === "assistant" && lastMsg.id === assistantMessage.id) {
                        lastMsg.content = assistantMessage.content
                      }
                      return updated
                    })
                  }
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      const finalContent = assistantMessage.content
      if (finalContent.includes("[CRISIS_DETECTED]")) {
        setCrisisDetected(true)
      }
    } catch (error: any) {
      console.error("Chat error:", error)
      const errorMessage = error?.message || "Sorry, I encountered an error. Please try again."
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: errorMessage.includes("401") || errorMessage.includes("Unauthorized")
            ? "Please log in to use the chat feature."
            : errorMessage,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Support Chat</h1>
        <p className="text-muted-foreground">
          Talk to our compassionate AI assistant anytime. Your conversation is private and secure.
        </p>
      </div>

      {crisisDetected && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold mb-2">We're concerned about you</p>
            <p className="text-sm mb-3">
              If you're in crisis or thinking about harming yourself, please reach out for immediate help:
            </p>
            <div className="text-sm space-y-1">
              <p>
                <Phone className="inline h-3 w-3 mr-1" />
                Kaan Pete Roi: +880-2-5853305 (24/7)
              </p>
              <p>
                <Phone className="inline h-3 w-3 mr-1" />
                Moner Bondhu: +880-1779-554391
              </p>
              <p>
                <Phone className="inline h-3 w-3 mr-1" />
                Emergency: 999
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Mental Health Support Assistant
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">How can I support you today?</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                I'm here to listen and provide support. Feel free to share what's on your mind. Everything you say is
                confidential.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "rounded-lg px-4 py-3 max-w-[80%]",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground border border-border",
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content.replace("[CRISIS_DETECTED]", "")}
                </p>
              </div>

              {message.role === "user" && (
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="rounded-lg px-4 py-3 bg-muted border border-border">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        <div className="border-t p-4">
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
              autoFocus
            />
            <Button type="submit" disabled={isLoading || !input || input.length === 0}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground text-center mt-4">
        This AI assistant provides support and information but is not a replacement for professional mental health care.
      </p>
    </div>
  )
}
