"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, FileText, Phone, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useEffect } from "react"

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "video":
      return <Video className="h-5 w-5" />
    case "article":
      return <FileText className="h-5 w-5" />
    case "hotline":
      return <Phone className="h-5 w-5" />
    default:
      return <BookOpen className="h-5 w-5" />
  }
}

interface Resource {
  id: string
  title: string
  description: string
  category: string
  language: string
  tags: string[]
  content_url?: string
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("resources").select("*").order("created_at", { ascending: false })
      setResources(data || [])
      setLoading(false)
    }

    fetchResources()
  }, [])

  const categories = ["guide", "article", "video", "hotline"]

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={false} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Mental Health Resources</h1>
            <p className="text-lg text-muted-foreground">
              Helpful information, guides, and support resources for your mental health journey
            </p>
          </div>

          {/* Resources by Category */}
          {categories.map((category) => {
            const categoryResources = resources?.filter((r) => r.category === category)
            if (!categoryResources || categoryResources.length === 0) return null

            return (
              <div key={category} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 capitalize flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {category}s
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {categoryResources.map((resource) => (
                    <Card
                      key={resource.id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => toggleExpand(resource.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-lg flex-1">{resource.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            {resource.language === "bn" && <Badge variant="secondary">বাংলা</Badge>}
                            {expandedId === resource.id ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </div>
                        </div>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>

                      {/* Expanded Content */}
                      {expandedId === resource.id && (
                        <CardContent className="space-y-4 border-t pt-4">
                          {resource.description && (
                            <div className="prose prose-sm max-w-none">
                              <p className="text-sm text-foreground whitespace-pre-wrap">{resource.description}</p>
                            </div>
                          )}

                          {resource.tags && resource.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {resource.tags.map((tag: string) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {resource.content_url && (
                            <Button asChild className="w-full">
                              <a
                                href={resource.content_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                Learn More
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}

          {(!resources || resources.length === 0) && !loading && (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Resources Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  We're building a comprehensive library of mental health resources for you.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
