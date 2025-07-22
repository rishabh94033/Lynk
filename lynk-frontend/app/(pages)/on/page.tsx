"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
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
  Bell,
  ImageIcon,
  Mic,
} from "lucide-react"

interface OnboardingFlowProps {
  onComplete: () => void
}

const steps = [
  { id: 1, title: "Welcome to Lynk", description: "Let's get you set up in just a few steps." },
  { id: 2, title: "Your Profile", description: "Tell us a bit about yourself." },
  { id: 3, title: "Your Interests", description: "Help us personalize your experience." },
  { id: 4, title: "Permissions", description: "Enable key features for a full experience." },
  { id: 5, title: "You're All Set!", description: "Welcome to the Lynk community!" },
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

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
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
    microphone: false,
    camera: false,
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

  const requestPermission = async (type: "notifications" | "contacts" | "location" | "microphone" | "camera") => {
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
    } else if (type === "microphone") {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true })
        setPermissions((prev) => ({ ...prev, microphone: true }))
      } catch (error) {
        setPermissions((prev) => ({ ...prev, microphone: false }))
      }
    } else if (type === "camera") {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true })
        setPermissions((prev) => ({ ...prev, camera: true }))
      } catch (error) {
        setPermissions((prev) => ({ ...prev, camera: false }))
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 rounded-full" />
        </div>

        <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="text-center p-6 pb-4">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className="text-center space-y-8 py-8">
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  Connect with friends, join communities, and discover new conversations. Let's get you set up for the
                  best experience.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto">
                  <div className="text-center space-y-3 p-4 rounded-lg bg-accent/20 border border-accent/30 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto shadow-md">
                      <MessageCircle className="h-7 w-7 text-white" />
                    </div>
                    <p className="text-base font-medium text-foreground">Chat</p>
                    <p className="text-sm text-muted-foreground">Instant messages</p>
                  </div>
                  <div className="text-center space-y-3 p-4 rounded-lg bg-accent/20 border border-accent/30 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto shadow-md">
                      <Users className="h-7 w-7 text-white" />
                    </div>
                    <p className="text-base font-medium text-foreground">Connect</p>
                    <p className="text-sm text-muted-foreground">Find your friends</p>
                  </div>
                  <div className="text-center space-y-3 p-4 rounded-lg bg-accent/20 border border-accent/30 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto shadow-md">
                      <Hash className="h-7 w-7 text-white" />
                    </div>
                    <p className="text-base font-medium text-foreground">Discover</p>
                    <p className="text-sm text-muted-foreground">Explore communities</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Profile Setup */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-500">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="h-28 w-28 mx-auto border-4 border-purple-300 dark:border-purple-700 shadow-lg">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-3xl font-bold">
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
                      className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:scale-110 transition-transform"
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center space-x-2 text-foreground">
                      <User className="h-4 w-4 text-purple-600" />
                      <span>Full Name</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="h-12 bg-background/50 backdrop-blur-sm border-muted focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="flex items-center space-x-2 text-foreground">
                      <User className="h-4 w-4 text-pink-600" />
                      <span>Username</span>
                    </Label>
                    <Input
                      id="username"
                      placeholder="@johndoe"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      className="h-12 bg-background/50 backdrop-blur-sm border-muted focus:border-pink-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2 text-foreground">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span>Email</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="h-12 bg-background/50 backdrop-blur-sm border-muted focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center space-x-2 text-foreground">
                      <Phone className="h-4 w-4 text-cyan-600" />
                      <span>Phone</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="h-12 bg-background/50 backdrop-blur-sm border-muted focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center space-x-2 text-foreground">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span>Location</span>
                    </Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="h-12 bg-background/50 backdrop-blur-sm border-muted focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center space-x-2 text-foreground">
                      <Globe className="h-4 w-4 text-emerald-600" />
                      <span>Website</span>
                    </Label>
                    <Input
                      id="website"
                      placeholder="yourwebsite.com"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="h-12 bg-background/50 backdrop-blur-sm border-muted focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-foreground">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                    className="bg-background/50 backdrop-blur-sm border-muted focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-500">
                <p className="text-lg text-muted-foreground text-center max-w-md mx-auto">
                  Select topics you'd like to see and discuss. This helps us recommend relevant rooms and conversations.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {interests.map((interest, index) => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-5 rounded-xl border-2 transition-all duration-200 hover:scale-105 shadow-sm ${
                        selectedInterests.includes(interest.id)
                          ? `border-purple-500 bg-gradient-to-r ${interest.color} text-white shadow-lg`
                          : "border-muted hover:border-purple-300 bg-card/50 dark:bg-card/30"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="text-3xl mb-3">{interest.icon}</div>
                      <div className="text-base font-medium text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {interest.name}
                      </div>
                      {selectedInterests.includes(interest.id) && (
                        <Check className="h-5 w-5 mx-auto mt-3 text-white animate-in zoom-in" />
                      )}
                    </button>
                  ))}
                </div>

                {selectedInterests.length > 0 && (
                  <div className="text-center text-sm text-muted-foreground">
                    {selectedInterests.length} interest{selectedInterests.length !== 1 ? "s" : ""} selected
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Permissions */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-500">
                <p className="text-lg text-muted-foreground text-center max-w-md mx-auto">
                  Grant permissions to unlock the full Lynk experience. You can change these later in settings.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-left-2 duration-500">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                        <Bell className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Notifications</h4>
                        <p className="text-sm text-muted-foreground">Get notified about new messages</p>
                      </div>
                    </div>
                    <Switch
                      checked={permissions.notifications}
                      onCheckedChange={(checked) => setPermissions((prev) => ({ ...prev, notifications: checked }))}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-left-2 duration-500 delay-100">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Contacts</h4>
                        <p className="text-sm text-muted-foreground">Find friends who are already on Lynk</p>
                      </div>
                    </div>
                    <Switch
                      checked={permissions.contacts}
                      onCheckedChange={(checked) => setPermissions((prev) => ({ ...prev, contacts: checked }))}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-left-2 duration-500 delay-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Location</h4>
                        <p className="text-sm text-muted-foreground">Discover nearby rooms and events</p>
                      </div>
                    </div>
                    <Switch
                      checked={permissions.location}
                      onCheckedChange={(checked) => setPermissions((prev) => ({ ...prev, location: checked }))}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-left-2 duration-500 delay-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                        <Mic className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Microphone</h4>
                        <p className="text-sm text-muted-foreground">Enable voice messages and calls</p>
                      </div>
                    </div>
                    <Switch
                      checked={permissions.microphone}
                      onCheckedChange={(checked) => setPermissions((prev) => ({ ...prev, microphone: checked }))}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-left-2 duration-500 delay-400">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-md">
                        <ImageIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Camera</h4>
                        <p className="text-sm text-muted-foreground">Enable video calls and photo sharing</p>
                      </div>
                    </div>
                    <Switch
                      checked={permissions.camera}
                      onCheckedChange={(checked) => setPermissions((prev) => ({ ...prev, camera: checked }))}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Complete */}
            {currentStep === 5 && (
              <div className="text-center space-y-8 py-8 animate-in fade-in slide-in-from-right-2 duration-500">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-bounce-once">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>

                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  You're all set! Welcome to Lynk. You can now start chatting with friends, join rooms, and discover new
                  communities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-lg mx-auto">
                  <div className="p-5 rounded-lg border bg-card/50 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <MessageCircle className="h-9 w-9 mx-auto mb-3 text-purple-600" />
                    <h4 className="font-medium text-base text-foreground">Start Chatting</h4>
                    <p className="text-sm text-muted-foreground mt-1">Send your first message</p>
                  </div>
                  <div className="p-5 rounded-lg border bg-card/50 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
                    <Hash className="h-9 w-9 mx-auto mb-3 text-blue-600" />
                    <h4 className="font-medium text-base text-foreground">Join Rooms</h4>
                    <p className="text-sm text-muted-foreground mt-1">Discover communities</p>
                  </div>
                  <div className="p-5 rounded-lg border bg-card/50 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
                    <Users className="h-9 w-9 mx-auto mb-3 text-green-600" />
                    <h4 className="font-medium text-base text-foreground">Add Friends</h4>
                    <p className="text-sm text-muted-foreground mt-1">Connect with others</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border/50">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg text-base hover:bg-accent/50 transition-colors bg-transparent"
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
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-lg text-base transition-all duration-300 hover:scale-105 shadow-md"
                disabled={currentStep === 2 && !profile.name}
              >
                <span>{currentStep === steps.length ? "Get Started" : "Next"}</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
