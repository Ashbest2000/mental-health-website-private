import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Video, FileText, Phone } from "lucide-react"

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

export default async function ResourcesPage() {
  const supabase = await createClient()

  const { data: resources } = await supabase.from("resources").select("*").order("created_at", { ascending: false })

  const categories = ["guide", "article", "video", "hotline"]

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
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          {resource.language === "bn" && <Badge variant="secondary">বাংলা</Badge>}
                        </div>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      {resource.tags && resource.tags.length > 0 && (
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {resource.tags.map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}

          {(!resources || resources.length === 0) && (
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
