import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Brain, AlertCircle, CheckCircle, TrendingUp, Phone } from "lucide-react"

export default async function AssessmentResultPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: result, error } = await supabase
    .from("diagnostic_results")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single()

  if (error || !result) {
    redirect("/assessments")
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
      case "moderately severe":
        return "text-destructive"
      case "moderate":
        return "text-accent"
      case "mild":
        return "text-primary"
      default:
        return "text-muted-foreground"
    }
  }

  const getSeverityIcon = (severity: string) => {
    if (severity === "severe" || severity === "moderately severe") {
      return <AlertCircle className="h-8 w-8 text-destructive" />
    } else if (severity === "minimal") {
      return <CheckCircle className="h-8 w-8 text-primary" />
    }
    return <TrendingUp className="h-8 w-8 text-accent" />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Results Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Brain className="h-6 w-6 text-primary" />
                <CardTitle className="capitalize">{result.test_type} Assessment Results</CardTitle>
              </div>
              <CardDescription>
                Completed on{" "}
                {new Date(result.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                  <p className="text-4xl font-bold">{result.score}</p>
                </div>
                <div className="text-right">
                  {getSeverityIcon(result.severity)}
                  <p className={`text-lg font-semibold capitalize mt-2 ${getSeverityColor(result.severity)}`}>
                    {result.severity}
                  </p>
                </div>
              </div>

              {(result.severity === "severe" || result.severity === "moderately severe") && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your results indicate significant symptoms. We strongly encourage you to reach out to a mental
                    health professional for support and guidance.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Recommendations Card */}
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Based on your assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed whitespace-pre-line">{result.recommendations}</p>
            </CardContent>
          </Card>

          {/* Next Steps Card */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/chat">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Talk to AI Support
                  </Button>
                </Link>
                <Link href="/journal">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Write in Journal
                  </Button>
                </Link>
                <Link href="/institutions">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Find Professional Help
                  </Button>
                </Link>
                <Link href="/resources">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Browse Resources
                  </Button>
                </Link>
              </div>

              {(result.severity === "severe" ||
                result.severity === "moderately severe" ||
                result.severity === "moderate") && (
                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-2">Need to talk to someone now?</p>
                      <div className="text-sm space-y-1">
                        <p>Kaan Pete Roi: +880-2-5853305 (24/7)</p>
                        <p>Moner Bondhu: +880-1779-554391</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Link href="/assessments" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Take Another Assessment
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
