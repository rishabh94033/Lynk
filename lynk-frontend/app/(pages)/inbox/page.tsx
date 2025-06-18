"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreVertical } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Sarah Wilson",
    lastMessage: "Hey! How was your day?",
    time: "2m ago",
    unread: 2,
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 2,
    name: "Team Alpha",
    lastMessage: "Meeting at 3 PM tomorrow",
    time: "1h ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    isGroup: true,
  },
  {
    id: 3,
    name: "Mike Johnson",
    lastMessage: "Thanks for the help!",
    time: "3h ago",
    unread: 1,
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
  },
  {
    id: 4,
    name: "Design Team",
    lastMessage: "New mockups are ready",
    time: "1d ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    isGroup: true,
  },
  {
    id: 5,
    name: "Emma Davis",
    lastMessage: "See you tomorrow!",
    time: "2d ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
  },
]

export default function InboxPage() {
    console
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  console.log("Rendering InboxPage")
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-card/50 backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{conversations.length} conversations</p>
        </div>
        <Button
          size="icon"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm border-muted"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-2">
          {filteredConversations.map((conversation, index) => (
            <Link key={conversation.id} href={`/chat/${conversation.id}`} className="block">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] group">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                    <AvatarFallback
                      className={
                        conversation.isGroup
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                          : "bg-gradient-to-r from-purple-500 to-pink-500"
                      }
                    >
                      {conversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full animate-pulse" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                </div>

                <div className="flex flex-col items-end space-y-1">
                  {conversation.unread > 0 && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs animate-pulse">
                      {conversation.unread}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}



