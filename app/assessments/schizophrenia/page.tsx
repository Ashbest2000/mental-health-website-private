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

const PSYRATS_QUESTIONS = [
  "Have you experienced hearing voices that others cannot hear?",
  "Do you see things that others do not see?",
  "Do you believe that people are trying to harm you or plot against you?",
  "Do you feel that your thoughts are being controlled by outside forces?",
  "Do you believe you have special powers or abilities that others do not have?",
  "Do you feel confused or disoriented about time, place, or who you are?",
  "Have you experienced sudden changes in your mood without clear reason?",
  "Do you find it difficult to concentrate or organize your thoughts?",
  "Do you feel withdrawn or lose interest in activities you normally enjoy?",
  "Have you experienced unusual or bizarre thoughts that seem out of your control?",
]

const OPTIONS = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Rarely" },
  { value: "2", label: "Sometimes" },
  { value: "3", label: "Often" },
  { value: "4", label: "Very often" },
]

export default function SchizophreniaAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const progress = ((currentQuestion + 1) / PSYRATS_QUESTIONS.length) * 100

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value })
  }

  const handleNext = () => {
    if (currentQuestion < PSYRATS_QUESTIONS.length - 1) {
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
    if (score >= 30) severity = "severe"
    else if (score >= 20) severity = "moderate"
    else if (score >= 10) severity = "mild"

    try {
      const result = await saveAssessmentResult({
        testType: "schizophrenia",
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
  const allAnswered = Object.keys(answers).length === PSYRATS_QUESTIONS.length

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Psychotic Symptoms Screening</CardTitle>
              <CardDescription>
                This screening helps identify potential psychotic symptoms. Please answer honestly. If you're
                experiencing severe symptoms, please seek immediate professional help.
              </CardDescription>
              <Progress value={progress} className="mt-4" />
              <p className="text-sm text-muted-foreground mt-2">
                Question {currentQuestion + 1} of {PSYRATS_QUESTIONS.length}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-relaxed">{PSYRATS_QUESTIONS[currentQuestion]}</h3>

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
                {currentQuestion < PSYRATS_QUESTIONS.length - 1 ? (
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
