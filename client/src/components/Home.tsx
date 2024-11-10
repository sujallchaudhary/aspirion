'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Lightbulb, LineChart, Rocket, Brain, CheckCircle, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 dark:text-white">
                  Discover Your Ideal Career Path with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Aspirion uses advanced AI to analyze your skills, interests, and personality, guiding you towards a fulfilling career that aligns with your unique potential.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600" size="lg">
                    Start Your Career Journey
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-emerald-600 border-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-emerald-950">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-36 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900 dark:text-white">
              Why Choose Aspirion?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Lightbulb, title: "Personalized Insights", content: "Get tailored career recommendations based on your unique profile and preferences." },
                { icon: LineChart, title: "Data-Driven Decisions", content: "Our AI analyzes vast amounts of career data to provide accurate and up-to-date guidance." },
                { icon: Rocket, title: "Future-Proof Your Career", content: "Stay ahead of the curve with insights into emerging industries and in-demand skills." },
                { icon: Brain, title: "Continuous Learning", content: "Receive ongoing recommendations for skill development and career growth opportunities." },
              ].map((item, index) => (
                <Card key={index} className="bg-gray-50 dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <item.icon className="h-8 w-8 mb-2 text-emerald-600 dark:text-emerald-400" />
                    <CardTitle className="text-gray-900 dark:text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-500 dark:text-gray-400">
                    {item.content}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-36 bg-gray-100 dark:bg-gray-950">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900 dark:text-white">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: CheckCircle, title: "Comprehensive Assessment", content: "Our AI-powered assessment covers personality traits, skills, and interests to provide a holistic view of your career potential." },
                { icon: Users, title: "Expert-Backed Recommendations", content: "Career suggestions are based on data from industry experts and successful professionals in various fields." },
                { icon: TrendingUp, title: "Career Path Visualization", content: "See potential career trajectories and understand the steps needed to reach your goals." },
                { icon: Brain, title: "Skill Gap Analysis", content: "Identify areas for improvement and get personalized learning recommendations to boost your employability." },
                { icon: Rocket, title: "Industry Trends Integration", content: "Stay informed about emerging trends and opportunities in your chosen field." },
                { icon: Lightbulb, title: "Personalized Action Plan", content: "Receive a tailored roadmap with actionable steps to help you achieve your career objectives." },
              ].map((feature, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <feature.icon className="h-8 w-8 mb-2 text-emerald-600 dark:text-emerald-400" />
                    <CardTitle className="text-gray-900 dark:text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-500 dark:text-gray-400">
                    {feature.content}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-36 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900 dark:text-white">
              About Aspirion
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Aspirion was founded with a mission to revolutionize career guidance using the power of artificial intelligence. Our team of data scientists, career counselors, and industry experts have come together to create a platform that understands the complexities of the modern job market and the unique potential of each individual.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We believe that everyone deserves a fulfilling career that aligns with their passions, skills, and values. By leveraging advanced AI algorithms and comprehensive data analysis, we provide personalized career recommendations that go beyond traditional assessments.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Join us in shaping the future of career guidance and unlock your true potential with Aspirion.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-36 bg-gray-100 dark:bg-gray-950">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does Aspirion's AI career guidance work?</AccordionTrigger>
                <AccordionContent>
                  Aspirion uses advanced machine learning algorithms to analyze your responses to our comprehensive assessment. It then compares your profile with vast amounts of career data and successful professionals to provide tailored recommendations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is my data safe and confidential?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take data privacy very seriously. All your information is encrypted and stored securely. We never share your personal data with third parties without your explicit consent.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How accurate are the career recommendations?</AccordionTrigger>
                <AccordionContent>
                  Our recommendations are highly accurate, based on extensive data and continually refined algorithms. However, they should be used as a guide alongside your own research and personal preferences.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I use Aspirion if I'm already employed?</AccordionTrigger>
                <AccordionContent>
                  Aspirion is useful for career changers, those looking to advance in their current field, or anyone seeking to better understand their career potential.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How often should I retake the assessment?</AccordionTrigger>
                <AccordionContent>
                  We recommend retaking the assessment every 6-12 months or whenever you experience significant changes in your skills, interests, or career goals.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                  Ready to Find Your Dream Career?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Take our comprehensive career assessment and get your personalized career roadmap in minutes.
                </p>
              </div>
              <Link href="/assessment">
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600" size="lg">
                  Start Your Assessment Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col gap-2 sm:flex-row items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2024 Aspirion. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400" href="#">
                Privacy Policy
              </Link>
              <Link className="text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400" href="#">
                Careers
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}