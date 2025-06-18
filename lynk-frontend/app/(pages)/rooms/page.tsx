"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Hash, Users, TrendingUp, Star } from "lucide-react"

const rooms = {
  trending: [
    {
      id: 1,
      name: "Design Trends 2024",
      description: "Discussing the latest design trends and innovations",
      members: 1247,
      online: 89,
      category: "Design",
      avatar: "/placeholder.svg?height=48&width=48",
      isJoined: false,
      lastActivity: "2m ago",
    },
    {
      id: 2,
      name: "Tech Startup Hub",
      description: "Connect with fellow entrepreneurs and share ideas",
      members: 892,
      online: 156,
      category: "Business",
      avatar: "/placeholder.svg?height=48&width=48",
      isJoined: true,
      lastActivity: "5m ago",
    },
    {
      id: 3,
      name: "Photography Masters",
      description: "Share your best shots and get feedback from pros",
      members: 2341,
      online: 234,
      category: "Photography",
      avatar: "/placeholder.svg?height=48&width=48",
      isJoined: false,
      lastActivity: "1m ago",
    },
  ],
  joined: [
    {
      id: 2,
      name: "Tech Startup Hub",
      description: "Connect with fellow entrepreneurs and share ideas",
      members: 892,
      online: 156,
      category: "Business",
      avatar: "/placeholder.svg?height=48&width=48",
      isJoined: true,
      lastActivity: "5m ago",
      unread: 3,
    },
    {
      id: 4,
      name: "UI/UX Designers",
      description: "A community for designers to share and learn",
      members: 567,
      online: 78,
      category: "Design",
      avatar: "/placeholder.svg?height=48&width=48",
      isJoined: true,
      lastActivity: "10m ago",
      unread: 0,
    },
  ],
  discover: [
    {
      id: 5,
      name: "Crypto Enthusiasts",
      description: "Discuss cryptocurrency trends and trading tips",
      members: 1456,
      online: 201,
      category: "Finance",
      avatar: "/placeholder.svg?height=48&width=48",
      isJoined: false,
      lastActivity: "3m ago",
    },
    {
      id: 6,
      name: "Fitness Motivation",
      description: "Stay motivated and share your fitness journey",
      members: 789,
      online: 123,
      category: "Health",
      avatar: "/placeholder.svg?height=48&width=48",
      isJoined: false,
      lastActivity: "7m ago",
    },
  ],
}

const categories = ["All", "Design", "Technology", "Business", "Photography", "Finance", "Health"]

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const getCategoryColor = (category: string) => {
    const colors = {
      Design: "from-purple-500 to-pink-500",
      Technology: "from-blue-500 to-cyan-500",
      Business: "from-green-500 to-emerald-500",
      Photography: "from-orange-500 to-red-500",
      Finance: "from-yellow-500 to-orange-500",
      Health: "from-teal-500 to-green-500",
    }
    return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Rooms
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Join communities and start conversations</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Room
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm border-muted"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Rooms Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="trending" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 m-4">
            <TabsTrigger value="trending" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="joined" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Joined</span>
            </TabsTrigger>
            <TabsTrigger value="discover" className="flex items-center space-x-2">
              <Hash className="h-4 w-4" />
              <span>Discover</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-4">
            <TabsContent value="trending" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rooms.trending.map((room, index) => (
                  <div
                    key={room.id}
                    className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] animate-in slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={room.avatar || "/placeholder.svg"} />
                        <AvatarFallback className={`bg-gradient-to-r ${getCategoryColor(room.category)} text-white`}>
                          {room.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{room.name}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {room.category}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{room.description}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{room.members}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>{room.online} online</span>
                        </span>
                      </div>
                      <span>{room.lastActivity}</span>
                    </div>

                    <Button
                      className={
                        room.isJoined
                          ? "w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : "w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      }
                      size="sm"
                    >
                      {room.isJoined ? "Joined" : "Join Room"}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="joined" className="mt-0">
              <div className="space-y-3">
                {rooms.joined.map((room, index) => (
                  <Link key={room.id} href={`/rooms/${room.id}`} className="block">
                    <div
                      className="flex items-center space-x-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] animate-in slide-in-from-left-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={room.avatar || "/placeholder.svg"} />
                        <AvatarFallback className={`bg-gradient-to-r ${getCategoryColor(room.category)} text-white`}>
                          {room.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold truncate">{room.name}</h3>
                          {room.unread > 0 && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                              {room.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">{room.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{room.members}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span>{room.online} online</span>
                          </span>
                          <span>{room.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discover" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rooms.discover.map((room, index) => (
                  <div
                    key={room.id}
                    className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] animate-in slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={room.avatar || "/placeholder.svg"} />
                        <AvatarFallback className={`bg-gradient-to-r ${getCategoryColor(room.category)} text-white`}>
                          {room.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{room.name}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {room.category}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{room.description}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{room.members}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>{room.online} online</span>
                        </span>
                      </div>
                      <span>{room.lastActivity}</span>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      size="sm"
                    >
                      Join Room
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
