"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
} from "lucide-react"

interface OnboardingFlowProps {
  onComplete: () => void
}

const steps = [
  { id: 1, title: "Welcome", description: "Welcome to Lynk" },
  { id: 2, title: "Profile", description: "Set up your profile" },
  { id: 3, title: "Interests", description: "Choose your interests" },
  { id: 4, title: "Permissions", description: "Grant permissions" },
  { id: 5, title: "Complete", description: "You're all set!" },
]

const interests = [
  { id: 1, name: "Design", icon: "🎨", color: "from-purple-500 to-pink-500" },
  { id: 2, name: "Technology", icon: "💻", color: "from-blue-500 to-cyan-500" },
  { id: 3, name: "Business", icon: "💼", color: "from-green-500 to-emerald-500" },
  { id: 4, name: "Photography", icon: "📸", color: "from-orange-500 to-red-500" },
  { id: 5, name: "Music", icon: "🎵", color: "from-pink-500 to-rose-500" },
  { id: 6, name: "Sports", icon: "⚽", color: "from-teal-500 to-green-500" },
  { id: 7, name: "Travel", icon: "✈️", color: "from-indigo-500 to-purple-500" },
  { id: 8, name: "Food", icon: "🍕", color: "from-yellow-500 to-orange-500" },
]

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    website: "",
  })
  const [selectedInterests, setSelectedInterests] = useState<number[]>([])
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
      onComplete()
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

  const requestPermission = async (type: "notifications" | "contacts" | "location") => {
    if (type === "notifications") {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission()
        setPermissions((prev) => ({ ...prev, notifications: permission === "granted" }))
      }
    } else if (type === "contacts") {
      // Simulate contacts permission
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-base">{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className="text-center space-y-6 py-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Welcome to Lynk!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Connect with friends, join communities, and discover new conversations. Let's get you set up in just
                    a few steps.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm font-medium">Chat</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm font-medium">Connect</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto">
                      <Hash className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm font-medium">Discover</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Profile Setup */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
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
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Full Name</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="@username"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Location</span>
                    </Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>Website</span>
                    </Label>
                    <Input
                      id="website"
                      placeholder="yourwebsite.com"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">What are you interested in?</h3>
                  <p className="text-muted-foreground">
                    Select topics you'd like to see and discuss. This helps us recommend relevant rooms and
                    conversations.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        selectedInterests.includes(interest.id)
                          ? `border-purple-500 bg-gradient-to-r ${interest.color} text-white`
                          : "border-muted hover:border-purple-300 bg-card"
                      }`}
                    >
                      <div className="text-2xl mb-2">{interest.icon}</div>
                      <div className="text-sm font-medium">{interest.name}</div>
                      {selectedInterests.includes(interest.id) && <Check className="h-4 w-4 mx-auto mt-2" />}
                    </button>
                  ))}
                </div>

                {selectedInterests.length > 0 && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {selectedInterests.length} interest{selectedInterests.length !== 1 ? "s" : ""} selected
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Permissions */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Enable features</h3>
                  <p className="text-muted-foreground">
                    Grant permissions to unlock the full Lynk experience. You can change these later in settings.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Notifications</h4>
                        <p className="text-sm text-muted-foreground">Get notified about new messages</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => requestPermission("notifications")}
                      variant={permissions.notifications ? "default" : "outline"}
                      size="sm"
                      className={permissions.notifications ? "bg-gradient-to-r from-green-500 to-emerald-500" : ""}
                    >
                      {permissions.notifications ? <Check className="h-4 w-4 mr-2" /> : null}
                      {permissions.notifications ? "Enabled" : "Enable"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Contacts</h4>
                        <p className="text-sm text-muted-foreground">Find friends who are already on Lynk</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => requestPermission("contacts")}
                      variant={permissions.contacts ? "default" : "outline"}
                      size="sm"
                      className={permissions.contacts ? "bg-gradient-to-r from-green-500 to-emerald-500" : ""}
                    >
                      {permissions.contacts ? <Check className="h-4 w-4 mr-2" /> : null}
                      {permissions.contacts ? "Enabled" : "Enable"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p className="text-sm text-muted-foreground">Discover nearby rooms and events</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => requestPermission("location")}
                      variant={permissions.location ? "default" : "outline"}
                      size="sm"
                      className={permissions.location ? "bg-gradient-to-r from-green-500 to-emerald-500" : ""}
                    >
                      {permissions.location ? <Check className="h-4 w-4 mr-2" /> : null}
                      {permissions.location ? "Enabled" : "Enable"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Complete */}
            {currentStep === 5 && (
              <div className="text-center space-y-6 py-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">You're all set!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Welcome to Lynk! You can now start chatting with friends, join rooms, and discover new communities.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                  <div className="p-4 rounded-lg border bg-card">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-medium text-sm">Start Chatting</h4>
                    <p className="text-xs text-muted-foreground mt-1">Send your first message</p>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <Hash className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-medium text-sm">Join Rooms</h4>
                    <p className="text-xs text-muted-foreground mt-1">Discover communities</p>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-medium text-sm">Add Friends</h4>
                    <p className="text-xs text-muted-foreground mt-1">Connect with others</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>

              <div className="flex space-x-1">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      step.id <= currentStep ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center space-x-2"
                disabled={currentStep === 2 && !profile.name}
              >
                <span>{currentStep === steps.length ? "Get Started" : "Next"}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
