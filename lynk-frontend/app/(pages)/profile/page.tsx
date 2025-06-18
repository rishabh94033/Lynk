"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Camera, Edit, Bell, Shield, Palette, MessageCircle, Users, Hash, Calendar } from "lucide-react"

const userStats = [
  { label: "Messages Sent", value: "2,847", icon: MessageCircle },
  { label: "Contacts", value: "156", icon: Users },
  { label: "Rooms Joined", value: "23", icon: Hash },
  { label: "Days Active", value: "89", icon: Calendar },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "@johndoe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Product designer passionate about creating beautiful and functional user experiences. Love connecting with fellow creatives!",
    location: "San Francisco, CA",
    website: "johndoe.design",
  })

  const [settings, setSettings] = useState({
    notifications: {
      messages: true,
      mentions: true,
      roomUpdates: false,
      emailNotifications: true,
    },
    privacy: {
      showOnlineStatus: true,
      allowDirectMessages: true,
      showReadReceipts: true,
    },
  })

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b bg-card/50 backdrop-blur-sm">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="profile" className="h-full">
          <TabsList className="grid w-full grid-cols-3 m-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <div className="px-4 pb-4">
            <TabsContent value="profile" className="mt-0">
              <div className="space-y-6">
                {/* Profile Header */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg?height=96&width=96" />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          size="icon"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <p className="text-muted-foreground">{profile.username}</p>
                        <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-sm text-green-600 dark:text-green-400">Online</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => setIsEditing(!isEditing)}
                        variant={isEditing ? "default" : "outline"}
                        className={isEditing ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditing ? "Save Changes" : "Edit Profile"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={profile.username}
                          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profile.website}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <div className="space-y-6">
                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <span>Notifications</span>
                    </CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Message Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
                      </div>
                      <Switch
                        checked={settings.notifications.messages}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, messages: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Mentions</Label>
                        <p className="text-sm text-muted-foreground">Get notified when someone mentions you</p>
                      </div>
                      <Switch
                        checked={settings.notifications.mentions}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, mentions: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Room Updates</Label>
                        <p className="text-sm text-muted-foreground">Get notified about room activity</p>
                      </div>
                      <Switch
                        checked={settings.notifications.roomUpdates}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, roomUpdates: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, emailNotifications: checked },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Privacy</span>
                    </CardTitle>
                    <CardDescription>Control your privacy and visibility settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Online Status</Label>
                        <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                      </div>
                      <Switch
                        checked={settings.privacy.showOnlineStatus}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, showOnlineStatus: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Direct Messages</Label>
                        <p className="text-sm text-muted-foreground">Allow anyone to send you direct messages</p>
                      </div>
                      <Switch
                        checked={settings.privacy.allowDirectMessages}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, allowDirectMessages: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Read Receipts</Label>
                        <p className="text-sm text-muted-foreground">Show when you've read messages</p>
                      </div>
                      <Switch
                        checked={settings.privacy.showReadReceipts}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, showReadReceipts: checked },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Appearance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="h-5 w-5" />
                      <span>Appearance</span>
                    </CardTitle>
                    <CardDescription>Customize the look and feel of your app</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Theme</Label>
                        <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Light
                        </Button>
                        <Button variant="outline" size="sm">
                          Dark
                        </Button>
                        <Button variant="outline" size="sm">
                          System
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-0">
              <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {userStats.map((stat, index) => (
                    <Card
                      key={stat.label}
                      className="animate-in slide-in-from-bottom-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2">
                          <stat.icon className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                        </div>
                        <div className="text-2xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent actions and interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: 'Joined room "Design Trends 2024"', time: "2 hours ago", type: "room" },
                        { action: "Sent message to Sarah Wilson", time: "4 hours ago", type: "message" },
                        { action: "Updated profile information", time: "1 day ago", type: "profile" },
                        { action: "Added Mike Johnson to contacts", time: "2 days ago", type: "contact" },
                        { action: 'Created room "UI/UX Designers"', time: "3 days ago", type: "room" },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-lg border animate-in slide-in-from-left-2"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              activity.type === "room"
                                ? "bg-blue-500"
                                : activity.type === "message"
                                  ? "bg-green-500"
                                  : activity.type === "profile"
                                    ? "bg-purple-500"
                                    : "bg-orange-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
