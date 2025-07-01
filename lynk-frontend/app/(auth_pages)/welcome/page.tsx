"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Hash,
  Sparkles,
  ArrowRight,
  Play,
  Check,
  Zap,
  Shield,
  Globe,
  Monitor,
  ChevronRight,
  Star,
  Share2,
  Laptop,
  Chrome,
  ChromeIcon as Firefox,
  AppleIcon as Safari,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    title: "Lightning Fast",
    description: "Messages delivered instantly across all devices",
    icon: Zap,
    stats: "< 100ms",
  },
  {
    title: "Ultra Secure",
    description: "End-to-end encryption for all conversations",
    icon: Shield,
    stats: "256-bit",
  },
  {
    title: "Global Reach",
    description: "Connect with people from 190+ countries",
    icon: Globe,
    stats: "190+ Countries",
  },
  {
    title: "Smart Rooms",
    description: "AI-powered community recommendations",
    icon: Hash,
    stats: "50K+ Rooms",
  },
]

const browsers = [
  { name: "Chrome", icon: Chrome, supported: true },
  { name: "Firefox", icon: Firefox, supported: true },
  { name: "Safari", icon: Safari, supported: true },
  { name: "Edge", icon: Monitor, supported: true },
]

export default function WelcomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white w-full overflow-x-hidden">
      {/* Navigation - Full Width */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 w-full">
        <div className="w-full px-8 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Lynk
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-gray-300 hover:text-white transition-colors">Features</button>
              <button className="text-gray-300 hover:text-white transition-colors">Community</button>
              <button className="text-gray-300 hover:text-white transition-colors">Support</button>
              <Link href="/signin">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Sign-In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen Width */}
      <section className="relative min-h-screen flex items-center w-full pt-20">
        {/* Background Grid - Full Width */}
        <div className="absolute inset-0 w-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Gradient Orbs - Full Width */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 w-full">
          <div className="w-full px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Web-Based Messaging Platform
                </Badge>

                <h1 className="text-6xl lg:text-8xl font-black leading-none">
                  <span className="block text-white">Connect</span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Everyone
                  </span>
                  <span className="block text-white">Everywhere</span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  Experience messaging reimagined in your browser. Join communities, share moments, and build
                  connections that matter in a beautifully designed, privacy-first web platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/inbox">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
                  >
                    <Monitor className="mr-3 h-5 w-5" />
                    Launch Web App
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-2xl backdrop-blur-sm bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Browser Support */}
              <div className="pt-8">
                <p className="text-gray-400 text-sm mb-4">Works seamlessly on all modern browsers:</p>
                <div className="flex items-center space-x-6">
                  {browsers.map((browser) => (
                    <div key={browser.name} className="flex items-center space-x-2 text-gray-300">
                      <browser.icon className="h-6 w-6" />
                      <span className="text-sm">{browser.name}</span>
                      <Check className="h-4 w-4 text-green-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    10M+
                  </div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    50M+
                  </div>
                  <div className="text-gray-400 text-sm">Messages Daily</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    99.9%
                  </div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Content - Browser Mockup */}
            <div className="relative">
              <div className="relative z-10">
                {/* Browser Window Mockup */}
                <div className="relative mx-auto w-full max-w-2xl bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Browser Header */}
                  <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-gray-700">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-700 rounded-lg px-3 py-1 text-gray-300 text-sm">https://lynk.app</div>
                    </div>
                  </div>

                  {/* Browser Content */}
                  <div className="h-96 bg-gradient-to-b from-purple-900/20 to-pink-900/20 p-8">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold">L</span>
                          </div>
                          <span className="text-white text-xl font-bold">Lynk</span>
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      </div>

                      {/* Chat Preview */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                          <div className="flex-1 bg-gray-800/50 rounded-lg p-3">
                            <p className="text-white text-sm">Hey! How's the new web app coming along?</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 justify-end">
                          <div className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 max-w-xs ml-auto">
                            <p className="text-white text-sm">
                              It's looking amazing! The browser experience is seamless.
                            </p>
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                          <div className="flex-1 bg-gray-800/50 rounded-lg p-3">
                            <p className="text-white text-sm">Can't wait to try it out! 🚀</p>
                          </div>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="space-y-2 pt-4">
                        <div className="flex items-center space-x-2 text-green-400 text-sm">
                          <Check className="h-4 w-4" />
                          <span>Real-time messaging</span>
                        </div>
                        <div className="flex items-center space-x-2 text-green-400 text-sm">
                          <Check className="h-4 w-4" />
                          <span>Community rooms</span>
                        </div>
                        <div className="flex items-center space-x-2 text-green-400 text-sm">
                          <Check className="h-4 w-4" />
                          <span>Cross-platform sync</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-bounce">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div
                className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <Hash className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Full Width */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-900 w-full">
        <div className="w-full px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Built for the
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Modern Web
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every feature designed with performance, security, and user experience in mind for the web platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 hover:scale-105 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 mb-4">{feature.description}</p>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {feature.stats}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section - Full Width */}
      <section className="py-32 bg-black w-full">
        <div className="w-full px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              Trusted by
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Millions
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 border border-white/10 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 text-lg">
                    "Lynk's web platform has completely transformed how our team communicates. The interface is
                    beautiful and works perfectly in the browser."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <div className="text-white font-semibold">Alex Johnson</div>
                      <div className="text-gray-400 text-sm">Product Manager</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Full Width */}
      <section className="py-32 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 w-full">
        <div className="w-full px-8 text-center">
          <h2 className="text-6xl lg:text-7xl font-bold text-white mb-8">
            Ready to
            <span className="block bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              Get Started?
            </span>
          </h2>
          <p className="text-2xl text-purple-100 mb-12 max-w-3xl mx-auto">
            Join millions of users who have already discovered the future of web-based messaging
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link href="/inbox">
              <Button
                size="lg"
                className="bg-white text-purple-900 hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <Laptop className="mr-3 h-6 w-6" />
                Launch Web App
                <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl font-semibold rounded-2xl backdrop-blur-sm bg-transparent"
            >
              <Monitor className="mr-3 h-6 w-6" />
              Try Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-purple-200">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5" />
              <span>No installation required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5" />
              <span>Works in any browser</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5" />
              <span>Setup in 30 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Full Width */}
      <footer className="py-16 bg-black border-t border-white/10 w-full">
        <div className="w-full px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-8 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Lynk
              </span>
            </div>
            <div className="flex items-center space-x-8 text-gray-400">
              <span>© 2024 Lynk. All rights reserved.</span>
              <div className="flex items-center space-x-6">
                <button className="hover:text-purple-400 transition-colors">Privacy</button>
                <button className="hover:text-purple-400 transition-colors">Terms</button>
                <button className="hover:text-purple-400 transition-colors">Support</button>
                <button className="hover:text-purple-400 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
