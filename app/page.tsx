import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import {
  Brain,
  MessageCircle,
  BookOpen,
  Users,
  MapPin,
  Shield,
  Heart,
  Phone,
  Sparkles,
  Stethoscope,
  Lightbulb,
  TestTube,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-secondary/5">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
              <Sparkles className="h-4 w-4" />
              Free, Confidential Mental Health Support
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Your Mental Health Matters
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance leading-relaxed">
              Compassionate, confidential mental health support for everyone in Dhaka. Get AI-powered assessments, 24/7
              chat support, and connect with real help when you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
                  <Heart className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/institutions">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Help Near You
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <img
              src="/peaceful-person-meditating-in-nature-with-sunrise-.jpg"
              alt="Person finding peace and mental wellness"
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border-y border-accent/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent/20 rounded-full">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <span className="font-semibold text-lg">In Crisis?</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Call Kaan Pete Roi: <span className="font-semibold text-foreground">+880-2-5853305</span> (24/7) or Moner
              Bondhu: <span className="font-semibold text-foreground">+880-1779-554391</span>
            </p>
          </div>
        </div>
      </section>

      {/* TREATMENT SECTION */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            <Stethoscope className="h-4 w-4" />
            Treatment & Support
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mental Health Treatment & Support</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Access comprehensive treatment resources, professional guidance, and 24/7 support to help you on your mental
            health journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary to-primary/50"></div>
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-10 w-10 text-primary" />
              </div>
              <CardTitle>24/7 AI Chat Support</CardTitle>
              <CardDescription>
                Talk to our compassionate AI chatbot anytime. It listens, provides coping strategies, and detects crisis
                situations.
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <Link href="/chat">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Start Chatting
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="border-2 hover:border-secondary/50 transition-all hover:shadow-lg group overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-secondary to-secondary/50"></div>
            <CardHeader>
              <div className="p-3 bg-secondary/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="h-10 w-10 text-secondary" />
              </div>
              <CardTitle>Guides & Resources</CardTitle>
              <CardDescription>
                Access comprehensive guides, coping strategies, and educational resources to help you understand and
                manage your mental health.
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <Link href="/resources">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Resources
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-all hover:shadow-lg group overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-accent to-accent/50"></div>
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="h-10 w-10 text-accent" />
              </div>
              <CardTitle>Find Professional Help</CardTitle>
              <CardDescription>
                Discover mental health professionals, clinics, and hospitals near you in Dhaka with contact information
                and services.
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <Link href="/institutions">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Find Help Near You
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="border-2 hover:border-chart-4/50 transition-all hover:shadow-lg group overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-chart-4 to-chart-4/50"></div>
            <CardHeader>
              <div className="p-3 bg-chart-4/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-chart-4" />
              </div>
              <CardTitle>Human Connection</CardTitle>
              <CardDescription>
                Connect with trained volunteers when you need to talk to a real person. Get support from people who
                care.
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <Link href="/volunteer/dashboard">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Connect with Volunteers
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="border-2 hover:border-chart-5/50 transition-all hover:shadow-lg group overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-chart-5 to-chart-5/50"></div>
            <CardHeader>
              <div className="p-3 bg-chart-5/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                <Heart className="h-10 w-10 text-chart-5" />
              </div>
              <CardTitle>Private Journal</CardTitle>
              <CardDescription>
                Express your thoughts in a secure, encrypted journal. Track your mood and mental health journey over
                time.
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <Link href="/journal">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Start Journaling
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <CardTitle>Complete Privacy</CardTitle>
              <CardDescription>
                Your data is encrypted and protected. We never share your information. Your mental health journey is
                yours alone.
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <Button variant="outline" size="sm" className="w-full bg-transparent" disabled>
                Always Protected
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* TEST SECTION */}
      <section className="bg-gradient-to-r from-secondary/10 via-background to-primary/10 border-y border-secondary/20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary font-medium text-sm mb-4">
              <TestTube className="h-4 w-4" />
              Preliminary Screening Tests
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Check Your Mental Health</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Take validated preliminary screening tests to understand your mental health better. These tests are not
              diagnoses but can help you identify if you should seek professional evaluation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ADHD Test */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-primary/50"></div>
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                  <Brain className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>ADHD Screening</CardTitle>
                <CardDescription>
                  Take the ASRS-6 screening test to assess for symptoms of Attention-Deficit/Hyperactivity Disorder.
                  Quick and confidential.
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <Link href="/assessments/adhd">
                  <Button size="sm" className="w-full">
                    Take ADHD Test
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Depression Test */}
            <Card className="border-2 hover:border-secondary/50 transition-all hover:shadow-lg group overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-secondary to-secondary/50"></div>
              <CardHeader>
                <div className="p-3 bg-secondary/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                  <Lightbulb className="h-10 w-10 text-secondary" />
                </div>
                <CardTitle>Depression Screening</CardTitle>
                <CardDescription>
                  Use the PHQ-9 test to screen for depressive symptoms. Get instant results and personalized
                  recommendations.
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <Link href="/assessments/depression">
                  <Button size="sm" className="w-full">
                    Take Depression Test
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Anxiety Test */}
            <Card className="border-2 hover:border-accent/50 transition-all hover:shadow-lg group overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-accent to-accent/50"></div>
              <CardHeader>
                <div className="p-3 bg-accent/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                  <Heart className="h-10 w-10 text-accent" />
                </div>
                <CardTitle>Anxiety Screening</CardTitle>
                <CardDescription>
                  Take the GAD-7 test to assess for generalized anxiety symptoms. Understand your anxiety levels better.
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <Link href="/assessments/anxiety">
                  <Button size="sm" className="w-full">
                    Take Anxiety Test
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Autism Spectrum Test */}
            <Card className="border-2 hover:border-chart-4/50 transition-all hover:shadow-lg group overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-chart-4 to-chart-4/50"></div>
              <CardHeader>
                <div className="p-3 bg-chart-4/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                  <Brain className="h-10 w-10 text-chart-4" />
                </div>
                <CardTitle>Autism Spectrum Screening</CardTitle>
                <CardDescription>
                  Take the AQ-10 screening test for autism spectrum characteristics. Helps identify if professional
                  evaluation is needed.
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <Link href="/assessments/autism">
                  <Button size="sm" className="w-full">
                    Take Autism Test
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Schizophrenia Test */}
            <Card className="border-2 hover:border-chart-5/50 transition-all hover:shadow-lg group overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-chart-5 to-chart-5/50"></div>
              <CardHeader>
                <div className="p-3 bg-chart-5/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                  <Stethoscope className="h-10 w-10 text-chart-5" />
                </div>
                <CardTitle>Schizophrenia Screening</CardTitle>
                <CardDescription>
                  Preliminary screening for psychotic symptoms. Important for early identification and professional
                  support.
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <Link href="/assessments/schizophrenia">
                  <Button size="sm" className="w-full">
                    Take Schizophrenia Test
                  </Button>
                </Link>
              </div>
            </Card>

            {/* OCD Test */}
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-primary/50"></div>
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                  <Brain className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>OCD Screening</CardTitle>
                <CardDescription>
                  Take the FOCI screening test to assess for obsessive-compulsive symptoms including obsessions and
                  compulsions.
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <Link href="/assessments/ocd">
                  <Button size="sm" className="w-full">
                    Take OCD Test
                  </Button>
                </Link>
              </div>
            </Card>

            {/* PTSD Test */}
            <Card className="border-2 hover:border-secondary/50 transition-all hover:shadow-lg group overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-secondary to-secondary/50"></div>
              <CardHeader>
                <div className="p-3 bg-secondary/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                  <Heart className="h-10 w-10 text-secondary" />
                </div>
                <CardTitle>PTSD Screening</CardTitle>
                <CardDescription>
                  Take the PCL-5 screening test to assess for post-traumatic stress symptoms and trauma-related
                  concerns.
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <Link href="/assessments/ptsd">
                  <Button size="sm" className="w-full">
                    Take PTSD Test
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Track Your Progress */}
            <Card className="border-2 hover:border-accent/50 transition-all hover:shadow-lg group overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-accent to-accent/50"></div>
              <CardHeader>
                <div className="p-3 bg-accent/10 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                  <TestTube className="h-10 w-10 text-accent" />
                </div>
                <CardTitle>Track Your Progress</CardTitle>
                <CardDescription>
                  View all your assessment results in one place. Track changes over time and see your mental health
                  journey.
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <Link href="/assessments">
                  <Button size="sm" className="w-full">
                    View Assessment History
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-background/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground text-center">
              <span className="font-semibold">Important:</span> These screening tests are preliminary tools designed to
              help you understand your mental health better. They are not medical diagnoses. If you have concerns about
              your mental health, please consult with a qualified mental health professional for proper evaluation and
              treatment.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-bl from-secondary/20 via-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <img
              src="/diverse-group-of-people-supporting-each-other-warm.jpg"
              alt="Community support and connection"
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold">Join a Caring Community</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              You're not alone in your journey. Thousands of people in Dhaka are taking steps toward better mental
              health every day. Our platform connects you with compassionate support, whether through AI assistance or
              real human volunteers who understand what you're going through.
            </p>
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground">Support Available</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-secondary">100%</p>
                <p className="text-sm text-muted-foreground">Confidential</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">Free</p>
                <p className="text-sm text-muted-foreground">Core Features</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-y border-primary/20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full w-fit mx-auto">
              <Heart className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">You Don't Have to Face This Alone</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Join thousands of people in Dhaka taking control of their mental health. Start your journey today with
              free, confidential support.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Sparkles className="mr-2 h-5 w-5" />
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">MindCare Dhaka</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link href="/institutions" className="text-muted-foreground hover:text-primary transition-colors">
                Find Help
              </Link>
              <Link href="/volunteer" className="text-muted-foreground hover:text-primary transition-colors">
                Volunteer
              </Link>
              <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
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
