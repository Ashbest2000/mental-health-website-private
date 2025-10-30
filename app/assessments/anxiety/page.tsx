"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { saveAssessmentResult } from "@/app/actions/assessments"

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
]

const OPTIONS = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" },
]

export default function AnxietyAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const progress = ((currentQuestion + 1) / GAD7_QUESTIONS.length) * 100

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value })
  }

  const handleNext = () => {
    if (currentQuestion < GAD7_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    const score = Object.values(answers).reduce((sum, val) => sum + Number.parseInt(val), 0)

    let severity = "minimal"
    if (score >= 15) severity = "severe"
    else if (score >= 10) severity = "moderate"
    else if (score >= 5) severity = "mild"

    try {
      const result = await saveAssessmentResult({
        testType: "anxiety",
        score,
        severity,
        responses: answers,
      })

      router.push(`/assessments/results/${result.id}`)
    } catch (error) {
      console.error("Error saving assessment:", error)
      setLoading(false)
    }
  }

  const isAnswered = answers[currentQuestion] !== undefined
  const allAnswered = Object.keys(answers).length === GAD7_QUESTIONS.length

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Anxiety Screening (GAD-7)</CardTitle>
              <CardDescription>
                Over the last 2 weeks, how often have you been bothered by the following problems?
              </CardDescription>
              <Progress value={progress} className="mt-4" />
              <p className="text-sm text-muted-foreground mt-2">
                Question {currentQuestion + 1} of {GAD7_QUESTIONS.length}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-relaxed">{GAD7_QUESTIONS[currentQuestion]}</h3>

                <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                  {OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value={option.value} id={`option-${currentQuestion}-${option.value}`} />
                      <Label
                        htmlFor={`option-${currentQuestion}-${option.value}`}
                        className="font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  Previous
                </Button>
                {currentQuestion < GAD7_QUESTIONS.length - 1 ? (
                  <Button onClick={handleNext} disabled={!isAnswered} className="flex-1">
                    Next Question
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={!allAnswered || loading} className="flex-1">
                    {loading ? "Submitting..." : "Submit Assessment"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
