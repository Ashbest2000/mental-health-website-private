import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, Heart, Zap, Clock, Shield } from "lucide-react"
import { requireAuth } from "@/lib/auth-helpers"

export default async function AssessmentsPage() {
  await requireAuth()

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Mental Health Assessments</h1>
            <p className="text-lg text-muted-foreground text-balance">
              Take validated screening tests to understand your mental health better. These assessments are confidential
              and provide personalized insights.
            </p>
          </div>

          {/* Info Banner */}
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <p className="font-semibold">Your Privacy is Protected</p>
                  <p className="text-sm text-muted-foreground">
                    All assessment results are encrypted and stored securely. Only you can access your results. These
                    screenings are not diagnostic tools - please consult a mental health professional for a formal
                    diagnosis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Cards */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Heart className="h-6 w-6 text-primary" />
                      <CardTitle>Depression Screening (PHQ-9)</CardTitle>
                    </div>
                    <CardDescription>
                      The Patient Health Questionnaire-9 is a validated tool for screening depression severity. It takes
                      about 5 minutes to complete.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>9 questions</span>
                  </div>
                </div>
                <Link href="/assessments/depression">
                  <Button>Start Depression Screening</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-6 w-6 text-primary" />
                      <CardTitle>Anxiety Screening (GAD-7)</CardTitle>
                    </div>
                    <CardDescription>
                      The Generalized Anxiety Disorder-7 scale is a reliable tool for assessing anxiety symptoms. It
                      takes about 5 minutes to complete.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>7 questions</span>
                  </div>
                </div>
                <Link href="/assessments/anxiety">
                  <Button>Start Anxiety Screening</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-6 w-6 text-primary" />
                      <CardTitle>ADHD Screening (ASRS-6)</CardTitle>
                    </div>
                    <CardDescription>
                      The Adult ADHD Self-Report Scale is designed to screen for attention-deficit/hyperactivity
                      disorder in adults. Takes about 3 minutes.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>3 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>6 questions</span>
                  </div>
                </div>
                <Link href="/assessments/adhd">
                  <Button>Start ADHD Screening</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-6 w-6 text-primary" />
                      <CardTitle>Autism Spectrum Screening (AQ-10)</CardTitle>
                    </div>
                    <CardDescription>
                      The Autism Quotient-10 helps identify traits associated with autism spectrum. Takes about 5
                      minutes.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>10 questions</span>
                  </div>
                </div>
                <Link href="/assessments/autism">
                  <Button>Start Autism Screening</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-6 w-6 text-primary" />
                      <CardTitle>Psychotic Symptoms Screening</CardTitle>
                    </div>
                    <CardDescription>
                      This screening helps identify potential psychotic symptoms. Takes about 5 minutes. If experiencing
                      severe symptoms, seek immediate professional help.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>10 questions</span>
                  </div>
                </div>
                <Link href="/assessments/schizophrenia">
                  <Button>Start Psychotic Symptoms Screening</Button>
                </Link>
              </CardContent>
            </Card>

            {/* OCD Screening Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-6 w-6 text-primary" />
                      <CardTitle>OCD Screening (FOCI)</CardTitle>
                    </div>
                    <CardDescription>
                      The Florida Obsessive-Compulsive Inventory screens for OCD symptoms and compulsive behaviors.
                      Takes about 5 minutes.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>10 questions</span>
                  </div>
                </div>
                <Link href="/assessments/ocd">
                  <Button>Start OCD Screening</Button>
                </Link>
              </CardContent>
            </Card>

            {/* PTSD Screening Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Heart className="h-6 w-6 text-primary" />
                      <CardTitle>PTSD Screening (PCL-5)</CardTitle>
                    </div>
                    <CardDescription>
                      The PTSD Checklist for DSM-5 screens for post-traumatic stress disorder symptoms. Takes about 5
                      minutes.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>10 questions</span>
                  </div>
                </div>
                <Link href="/assessments/ptsd">
                  <Button>Start PTSD Screening</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
