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

const FOCI_QUESTIONS = [
  "I have saved up so many things that they get in the way",
  "I check things more often than necessary",
  "I get upset if objects are not arranged properly",
  "I feel compelled to count while I am doing things",
  "I find it difficult to touch an object when I know it has been touched by strangers or certain people",
  "I find it difficult to control my own thoughts",
  "I collect things I don't need",
  "I repeatedly check gas taps, water taps, or light switches after turning them off",
  "I am more concerned about cleanliness than most people",
  "I am bothered by intrusive thoughts of hurting someone or myself",
]

const OPTIONS = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "A little" },
  { value: "2", label: "Moderately" },
  { value: "3", label: "A lot" },
  { value: "4", label: "Extremely" },
]

export default function OCDAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const progress = ((currentQuestion + 1) / FOCI_QUESTIONS.length) * 100

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value })
  }

  const handleNext = () => {
    if (currentQuestion < FOCI_QUESTIONS.length - 1) {
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
        testType: "ocd",
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
  const allAnswered = Object.keys(answers).length === FOCI_QUESTIONS.length

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>OCD Screening (FOCI)</CardTitle>
              <CardDescription>
                The Florida Obsessive-Compulsive Inventory helps screen for obsessive-compulsive disorder symptoms.
                Please answer based on your experiences over the past month.
              </CardDescription>
              <Progress value={progress} className="mt-4" />
              <p className="text-sm text-muted-foreground mt-2">
                Question {currentQuestion + 1} of {FOCI_QUESTIONS.length}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-relaxed">{FOCI_QUESTIONS[currentQuestion]}</h3>

                <RadioGroup key={currentQuestion} value={answers[currentQuestion] || ""} onValueChange={handleAnswer}>
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
                {currentQuestion < FOCI_QUESTIONS.length - 1 ? (
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
