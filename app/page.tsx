import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Brain, MessageCircle, BookOpen, Users, MapPin, Shield, Heart, Phone } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">Your Mental Health Matters</h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance leading-relaxed">
            Compassionate, confidential mental health support for everyone in Dhaka. Get AI-powered assessments, 24/7
            chat support, and connect with real help when you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/institutions">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                <MapPin className="mr-2 h-5 w-5" />
                Find Help Near You
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-accent/10 border-y border-accent/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-accent" />
              <span className="font-semibold">In Crisis?</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Call Kaan Pete Roi: <span className="font-semibold text-foreground">+880-2-5853305</span> (24/7) or Moner
              Bondhu: <span className="font-semibold text-foreground">+880-1779-554391</span>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Support You</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Comprehensive mental health tools designed for privacy, accessibility, and real support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Brain className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI Assessments</CardTitle>
              <CardDescription>
                Take validated screening tests for ADHD, depression, and anxiety. Get instant results and personalized
                recommendations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <MessageCircle className="h-10 w-10 text-primary mb-2" />
              <CardTitle>24/7 AI Chat Support</CardTitle>
              <CardDescription>
                Talk to our compassionate AI chatbot anytime. It listens, provides coping strategies, and detects crisis
                situations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Private Journal</CardTitle>
              <CardDescription>
                Express your thoughts in a secure, encrypted journal. Track your mood and mental health journey over
                time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Human Connection</CardTitle>
              <CardDescription>
                Connect with trained volunteers when you need to talk to a real person. Get support from people who
                care.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <MapPin className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Find Local Help</CardTitle>
              <CardDescription>
                Discover mental health professionals, clinics, and hospitals near you in Dhaka with contact information
                and services.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Complete Privacy</CardTitle>
              <CardDescription>
                Your data is encrypted and protected. We never share your information. Your mental health journey is
                yours alone.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Heart className="h-16 w-16 text-primary mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold">You Don't Have to Face This Alone</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Join thousands of people in Dhaka taking control of their mental health. Start your journey today with
              free, confidential support.
            </p>
            <Link href="/auth/signup">
              <Button size="lg">Create Your Free Account</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-semibold">MindCare Dhaka</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                Resources
              </Link>
              <Link href="/institutions" className="text-muted-foreground hover:text-foreground">
                Find Help
              </Link>
              <Link href="/volunteer" className="text-muted-foreground hover:text-foreground">
                Volunteer
              </Link>
              <Link href="/support" className="text-muted-foreground hover:text-foreground">
                Support Us
              </Link>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2025 MindCare Dhaka. Your mental health, your privacy, our priority.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
