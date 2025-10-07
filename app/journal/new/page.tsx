"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createJournalEntry } from "@/app/actions/journal"
import { Smile, Meh, Frown, SmilePlus, Angry } from "lucide-react"

const MOODS = [
  { value: "great", label: "Great", icon: SmilePlus },
  { value: "good", label: "Good", icon: Smile },
  { value: "okay", label: "Okay", icon: Meh },
  { value: "bad", label: "Bad", icon: Frown },
  { value: "terrible", label: "Terrible", icon: Angry },
]

export default function NewJournalEntryPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createJournalEntry({ title, content, mood })
      router.push("/journal")
      router.refresh()
    } catch (error) {
      console.error("Error creating entry:", error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>New Journal Entry</CardTitle>
              <CardDescription>Express your thoughts and feelings in your private journal</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title (Optional)</Label>
                  <Input
                    id="title"
                    placeholder="Give your entry a title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">What's on your mind?</Label>
                  <Textarea
                    id="content"
                    placeholder="Write freely about your thoughts, feelings, or experiences..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={12}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <Label>How are you feeling?</Label>
                  <RadioGroup value={mood} onValueChange={setMood}>
                    <div className="grid grid-cols-5 gap-3">
                      {MOODS.map((moodOption) => {
                        const Icon = moodOption.icon
                        return (
                          <div key={moodOption.value}>
                            <RadioGroupItem value={moodOption.value} id={moodOption.value} className="peer sr-only" />
                            <Label
                              htmlFor={moodOption.value}
                              className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <Icon className="h-6 w-6" />
                              <span className="text-xs font-medium">{moodOption.label}</span>
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading || !content.trim()} className="flex-1">
                    {loading ? "Saving..." : "Save Entry"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
