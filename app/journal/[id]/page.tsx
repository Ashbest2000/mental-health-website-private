import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Smile, Meh, Frown, Edit, ArrowLeft } from "lucide-react"
import { DeleteEntryButton } from "@/components/delete-entry-button"

const getMoodIcon = (mood: string) => {
  switch (mood) {
    case "great":
    case "good":
      return <Smile className="h-5 w-5 text-primary" />
    case "okay":
      return <Meh className="h-5 w-5 text-muted-foreground" />
    case "bad":
    case "terrible":
      return <Frown className="h-5 w-5 text-accent" />
    default:
      return null
  }
}

export default async function JournalEntryPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: entry, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single()

  if (error || !entry) {
    redirect("/journal")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/journal">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Journal
            </Button>
          </Link>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-3">{entry.title || "Untitled Entry"}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(entry.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {entry.mood && (
                      <span className="flex items-center gap-1 capitalize">
                        {getMoodIcon(entry.mood)}
                        {entry.mood}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/journal/${entry.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteEntryButton entryId={entry.id} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed">{entry.content}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
