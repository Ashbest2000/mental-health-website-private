import { requireAuth } from "@/lib/auth-helpers"
import { Navigation } from "@/components/navigation"
import { ChatClient } from "./chat-client"

export default async function ChatPage() {
  await requireAuth()

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />
      <div className="container mx-auto px-4 py-8">
        <ChatClient />
      </div>
    </div>
  )
}
