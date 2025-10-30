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

const AQ10_QUESTIONS = [
  "I prefer to do things with others rather than on my own",
  "I prefer to do things the same way over and over again",
  "If I try to imagine something, I find it very easy to create a picture in my mind",
  "I frequently get so strongly absorbed in one thing that I lose sight of other things",
  "I often notice small sounds when others do not",
  "I usually notice car number plates or similar strings of information",
  "Other people frequently tell me that what I've said is impolite, even though I think it is polite",
  "When I'm reading a story, I can easily imagine what the characters might look like",
  "I am fascinated by numbers",
  "When I'm in a social group, I can easily keep track of several different people's conversations",
]

const OPTIONS = [
  { value: "0", label: "Definitely disagree" },
  { value: "1", label: "Slightly disagree" },
  { value: "2", label: "Slightly agree" },
  { value: "3", label: "Definitely agree" },
]

export default function AutismAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const progress = ((currentQuestion + 1) / AQ10_QUESTIONS.length) * 100

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value })
  }

  const handleNext = () => {
    if (currentQuestion < AQ10_QUESTIONS.length - 1) {
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
    if (score >= 30) severity = "high"
    else if (score >= 20) severity = "moderate"
    else if (score >= 10) severity = "mild"

    try {
      const result = await saveAssessmentResult({
        testType: "autism",
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
  const allAnswered = Object.keys(answers).length === AQ10_QUESTIONS.length

  return (
    <div className="min-h-screen bg-background">
      <Navigation isLoggedIn={true} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Autism Spectrum Screening (AQ-10)</CardTitle>
              <CardDescription>
                This screening helps identify traits associated with autism spectrum. Please answer honestly based on
                your experiences.
              </CardDescription>
              <Progress value={progress} className="mt-4" />
              <p className="text-sm text-muted-foreground mt-2">
                Question {currentQuestion + 1} of {AQ10_QUESTIONS.length}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-relaxed">{AQ10_QUESTIONS[currentQuestion]}</h3>

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
                {currentQuestion < AQ10_QUESTIONS.length - 1 ? (
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
