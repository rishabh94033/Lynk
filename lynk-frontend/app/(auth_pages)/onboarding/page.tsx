"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  ArrowRight,
  ArrowLeft,
  Check,
  MessageCircle,
  Users,
  Hash,
  Sparkles,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Zap,
  Heart,
  Rocket,
} from "lucide-react"

const steps = [
  { id: 1, title: "Profile", description: "Create your profile", icon: User },
  { id: 2, title: "Interests", description: "Choose your interests", icon: Heart },
  { id: 3, title: "Connect", description: "Find your people", icon: Users },
  { id: 4, title: "Permissions", description: "Enable features", icon: Zap },
  { id: 5, title: "Complete", description: "You're ready!", icon: Rocket },
]

const interests = [
  { id: 1, name: "Design", icon: "🎨", color: "from-purple-500 to-pink-500", description: "UI/UX, Graphics, Art" },
  {
    id: 2,
    name: "Technology",
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
    description: "Programming, AI, Gadgets",
  },
  {
    id: 3,
    name: "Business",
    icon: "💼",
    color: "from-green-500 to-emerald-500",
    description: "Startups, Finance, Marketing",
  },
  {
    id: 4,
    name: "Photography",
    icon: "📸",
    color: "from-orange-500 to-red-500",
    description: "Portrait, Landscape, Street",
  },
  {
    id: 5,
    name: "Music",
    icon: "🎵",
    color: "from-pink-500 to-rose-500",
    description: "Production, Instruments, Genres",
  },
  {
    id: 6,
    name: "Sports",
    icon: "⚽",
    color: "from-teal-500 to-green-500",
    description: "Football, Basketball, Fitness",
  },
  { id: 7, name: "Travel", icon: "✈️", color: "from-indigo-500 to-purple-500", description: "Adventure, Culture, Food" },
  { id: 8, name: "Gaming", icon: "🎮", color: "from-violet-500 to-purple-500", description: "PC, Console, Mobile" },
  {
    id: 9,
    name: "Food",
    icon: "🍕",
    color: "from-yellow-500 to-orange-500",
    description: "Cooking, Restaurants, Recipes",
  },
  {
    id: 10,
    name: "Books",
    icon: "📚",
    color: "from-amber-500 to-yellow-500",
    description: "Fiction, Non-fiction, Poetry",
  },
  { id: 11, name: "Movies", icon: "🎬", color: "from-red-500 to-pink-500", description: "Cinema, TV Shows, Reviews" },
  {
    id: 12,
    name: "Science",
    icon: "🔬",
    color: "from-cyan-500 to-blue-500",
    description: "Research, Discovery, Innovation",
  },
]

const suggestedConnections = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "UI Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualFriends: 12,
    interests: ["Design", "Photography"],
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualFriends: 8,
    interests: ["Technology", "Gaming"],
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualFriends: 15,
    interests: ["Business", "Travel"],
  },
  {
    id: 4,
    name: "Alex Kim",
    role: "Photographer",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualFriends: 6,
    interests: ["Photography", "Travel"],
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    phone: "",
    bio: "",
    location: "",
  })
  const [selectedInterests, setSelectedInterests] = useState<number[]>([])
  const [selectedConnections, setSelectedConnections] = useState<number[]>([])
  const [permissions, setPermissions] = useState({
    notifications: false,
    contacts: false,
    location: false,
  })

  const progress = (currentStep / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding and redirect to inbox
      localStorage.setItem("lynk-onboarding-completed", "true")
      window.location.href = "/inbox"
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleInterest = (interestId: number) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId],
    )
  }

  const toggleConnection = (connectionId: number) => {
    setSelectedConnections((prev) =>
      prev.includes(connectionId) ? prev.filter((id) => id !== connectionId) : [...prev, connectionId],
    )
  }

  const requestPermission = async (type: "notifications" | "contacts" | "location") => {
    if (type === "notifications") {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission()
        setPermissions((prev) => ({ ...prev, notifications: permission === "granted" }))
      }
    } else if (type === "contacts") {
      setPermissions((prev) => ({ ...prev, contacts: true }))
    } else if (type === "location") {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          () => setPermissions((prev) => ({ ...prev, location: true })),
          () => setPermissions((prev) => ({ ...prev, location: false })),
        )
      }
    }
  }

  return (
    <div>
    {/* <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20"> */}
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-purple-300 dark:scrollbar-thumb-purple-700">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Lynk Setup
              </span>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                    step.id <= currentStep
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-1 mx-2 rounded-full transition-all duration-300 ${
                      step.id < currentStep ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Card */}
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-8 w-8 text-white" })}
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-lg">{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Step 1: Enhanced Profile Setup */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="h-32 w-32 mx-auto border-4 border-white shadow-2xl">
                      <AvatarImage src="/placeholder.svg?height=128&width=128" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-4xl">
                        {profile.name
                          ? profile.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:scale-110 transition-transform"
                    >
                      <Camera className="h-6 w-6" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground mt-4">Upload a photo to help others recognize you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center space-x-2 text-base font-medium">
                      <User className="h-4 w-4" />
                      <span>Full Name *</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-base font-medium">
                      Username *
                    </Label>
                    <Input
                      id="username"
                      placeholder="@username"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2 text-base font-medium">
                      <Mail className="h-4 w-4" />
                      <span>Email *</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center space-x-2 text-base font-medium">
                      <Phone className="h-4 w-4" />
                      <span>Phone</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center space-x-2 text-base font-medium">
                      <MapPin className="h-4 w-4" />
                      <span>Location</span>
                    </Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center space-x-2 text-base font-medium">
                      <Globe className="h-4 w-4" />
                      <span>Website</span>
                    </Label>
                    <Input
                      id="website"
                      placeholder="yourwebsite.com"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-base font-medium">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="text-base"
                  />
                  <p className="text-sm text-muted-foreground">{profile.bio.length}/500 characters</p>
                </div>
              </div>
            )}

            {/* Step 2: Enhanced Interests */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">What sparks your interest?</h3>
                  <p className="text-muted-foreground text-lg">
                    Select topics you're passionate about. This helps us recommend relevant rooms and connect you with
                    like-minded people.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`group p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                        selectedInterests.includes(interest.id)
                          ? `border-purple-500 bg-gradient-to-r ${interest.color} text-white shadow-lg`
                          : "border-muted hover:border-purple-300 bg-card hover:bg-accent/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{interest.icon}</div>
                      <div className="font-semibold text-sm mb-1">{interest.name}</div>
                      <div
                        className={`text-xs ${selectedInterests.includes(interest.id) ? "text-white/80" : "text-muted-foreground"}`}
                      >
                        {interest.description}
                      </div>
                      {selectedInterests.includes(interest.id) && (
                        <div className="mt-2">
                          <Check className="h-4 w-4 mx-auto" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {selectedInterests.length > 0 && (
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                    <p className="text-lg font-medium">
                      Great choice! You've selected {selectedInterests.length} interest
                      {selectedInterests.length !== 1 ? "s" : ""}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">We'll use these to personalize your experience</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Connect with People */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Connect with amazing people</h3>
                  <p className="text-muted-foreground text-lg">
                    Based on your interests, here are some people you might want to connect with.
                  </p>
                </div>

                <div className="grid gap-4">
                  {suggestedConnections.map((person) => (
                    <div
                      key={person.id}
                      className={`flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                        selectedConnections.includes(person.id)
                          ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                          : "border-muted hover:border-purple-300 bg-card"
                      }`}
                      onClick={() => toggleConnection(person.id)}
                    >
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={person.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg">
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{person.name}</h4>
                        <p className="text-muted-foreground">{person.role}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-sm text-muted-foreground">
                            {person.mutualFriends} mutual connections
                          </span>
                          <div className="flex space-x-1">
                            {person.interests.map((interest) => (
                              <Badge key={interest} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedConnections.includes(person.id) ? (
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <Check className="h-5 w-5 text-white" />
                          </div>
                        ) : (
                          <Button variant="outline" size="sm">
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedConnections.length > 0 && (
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                    <p className="text-lg font-medium">
                      Awesome! You'll connect with {selectedConnections.length} new people
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      They'll receive a connection request after you complete setup
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Enhanced Permissions */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Enable powerful features</h3>
                  <p className="text-muted-foreground text-lg">
                    Grant permissions to unlock the full Lynk experience. You can change these anytime in settings.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 rounded-2xl border bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Push Notifications</h4>
                        <p className="text-sm text-muted-foreground">Get notified about new messages and mentions</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => requestPermission("notifications")}
                      variant={permissions.notifications ? "default" : "outline"}
                      size="lg"
                      className={
                        permissions.notifications
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : ""
                      }
                    >
                      {permissions.notifications ? (
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4" />
                          <span>Enabled</span>
                        </div>
                      ) : (
                        "Enable"
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-6 rounded-2xl border bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Contact Access</h4>
                        <p className="text-sm text-muted-foreground">Find friends who are already on Lynk</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => requestPermission("contacts")}
                      variant={permissions.contacts ? "default" : "outline"}
                      size="lg"
                      className={
                        permissions.contacts
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : ""
                      }
                    >
                      {permissions.contacts ? (
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4" />
                          <span>Enabled</span>
                        </div>
                      ) : (
                        "Enable"
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-6 rounded-2xl border bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Location Services</h4>
                        <p className="text-sm text-muted-foreground">Discover nearby rooms and local events</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => requestPermission("location")}
                      variant={permissions.location ? "default" : "outline"}
                      size="lg"
                      className={
                        permissions.location
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : ""
                      }
                    >
                      {permissions.location ? (
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4" />
                          <span>Enabled</span>
                        </div>
                      ) : (
                        "Enable"
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-center p-4 bg-muted/50 rounded-2xl">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Privacy first:</span> All permissions can be revoked at any time in
                    your settings. We never share your data without permission.
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Enhanced Completion */}
            {currentStep === 5 && (
              <div className="text-center space-y-8 py-8">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold">🎉 Welcome to Lynk!</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    Your account is ready! You can now start chatting with friends, join amazing communities, and
                    discover new connections.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-800/50">
                    <MessageCircle className="h-10 w-10 mx-auto mb-3 text-purple-600" />
                    <h4 className="font-semibold mb-2">Start Messaging</h4>
                    <p className="text-sm text-muted-foreground">Send your first message and begin conversations</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-800/50">
                    <Hash className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                    <h4 className="font-semibold mb-2">Explore Rooms</h4>
                    <p className="text-sm text-muted-foreground">Join communities based on your interests</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/50">
                    <Users className="h-10 w-10 mx-auto mb-3 text-green-600" />
                    <h4 className="font-semibold mb-2">Build Network</h4>
                    <p className="text-sm text-muted-foreground">Connect with like-minded people</p>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedInterests.length}</div>
                    <div className="text-sm text-muted-foreground">Interests Selected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedConnections.length}</div>
                    <div className="text-sm text-muted-foreground">New Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Object.values(permissions).filter(Boolean).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Features Enabled</div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 h-12 px-6 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>

              <div className="flex space-x-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      step.id <= currentStep
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-110"
                        : "bg-muted hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center space-x-2 h-12 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={
                  (currentStep === 1 && (!profile.name || !profile.username )) ||
                  (currentStep === 2 && selectedInterests.length === 0)
                }
              >
                <span>{currentStep === steps.length ? "Enter Lynk" : "Continue"}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    {/* </div> */}
    </div>
  )
}
