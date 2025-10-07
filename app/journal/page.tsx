import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Plus, Calendar, Smile, Meh, Frown } from "lucide-react"

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

export default async function JournalPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: entries } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Journal</h1>
              <p className="text-muted-foreground">Your private space to express thoughts and track your mood</p>
            </div>
            <Link href="/journal/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </Link>
          </div>

          {/* Entries */}
          {entries && entries.length > 0 ? (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Link key={entry.id} href={`/journal/${entry.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-1">{entry.title || "Untitled Entry"}</CardTitle>
                          <CardDescription className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(entry.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                            {entry.mood && (
                              <span className="flex items-center gap-1 capitalize">
                                {getMoodIcon(entry.mood)}
                                {entry.mood}
                              </span>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{entry.content}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Start Your Journal</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  Writing about your thoughts and feelings can help you understand yourself better and track your mental
                  health journey.
                </p>
                <Link href="/journal/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Write Your First Entry
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
