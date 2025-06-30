"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MessageCircle, Users, Hash, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface WelcomePageProps {
  onGetStarted: () => void
}
export  default function WelcomePage({ onGetStarted }: WelcomePageProps) {
    const router = useRouter()
  return (
    <div>
     {/* <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center p-4"> */}
    {/* Background Elements */}
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
    </div>

    <div className="relative z-10 w-full max-w-4xl">
      <Card className="backdrop-blur-sm bg-white/90 dark:bg-[#111827]/90 border-0 shadow-2xl">
        <CardContent className="p-12">
          <div className="text-center space-y-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center">
              <Sparkles className="h-12 w-12 text-white" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome to Lynk!
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed">
                  Join millions of users connecting through beautiful conversations, vibrant communities, and meaningful
                  relationships. Let's create your perfect messaging experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="group p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-800/50 hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Smart Messaging</h3>
                  <p className="text-muted-foreground">
                    Lightning-fast messages with AI-powered features and beautiful animations
                  </p>
                </div>

                <div className="group p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-800/50 hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                    <Hash className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Community Rooms</h3>
                  <p className="text-muted-foreground">
                    Discover and join topic-based communities with like-minded people
                  </p>
                </div>

                <div className="group p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/50 hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Smart Connections</h3>
                  <p className="text-muted-foreground">
                    AI-powered contact suggestions and intelligent relationship management
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-16 text-center">
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    5M+
                  </div>
                  <div className="text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    100K+
                  </div>
                  <div className="text-muted-foreground">Communities</div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    99.9%
                  </div>
                  <div className="text-muted-foreground">Uptime</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
                <Button
                  onClick={() => (router.push("/onboarding"))}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-12 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => (router.push("/signin"))}
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 px-12 py-4 text-lg rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    {/* </div> */}
    </div>
  )
}
