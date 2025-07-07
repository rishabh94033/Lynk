"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MessageCircle, Users, Hash } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"


type Message = {
  id: number
  text: string
  sender: string
  chat: string
  time: string
  avatar?: string
}

type Person = {
  id: number
  name: string
  username: string
  status?: string
  avatar?: string
  mutualFriends?: number
}

type Room = {
  id: number
  name: string
  description: string
  members: number
  avatar?: string
  category: string
}

type SearchResults = {
  messages: Message[]
  people: Person[]
  rooms: Room[]
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [searchResults, setSearchResults] = useState<SearchResults>({
    messages: [],
    people: [],
    rooms: [],
  });

  const [selectedUserId, setselectedUserId] = useState<number | null>(null);
  const {data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
// seach the recent 2 people with whom we had convo)

  })


  useEffect(() => {
    fetch("/api/search-recent-convos")
      .then((res) => res.json())
      .then((data) =>
        setSearchResults((prev) => ({ ...prev, people: data.people }))
      )
      .catch((err) => console.error("Failed to fetch recent convos", err));
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      // Optional: clear on empty
      setSearchResults({
        messages: [],
        people: [],
        rooms: [],
      });
      return;
    }

    const delayDebounce = setTimeout(() => {
      const res=axios.post("http://localhost:5000/api/search", {
        query: searchQuery,
      });
      res.then((response) => {
        setSearchResults({
          messages: response.data.messages || [],
          people: response.data.people || [],
          rooms: response.data.rooms || [],
        });
      }).catch((error) => {
        console.error("Error during search:", error);
        setSearchResults({
          messages: [],
          people: [],
          rooms: [],
        });
      });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

async function handleMessageClick() {
  const response = await fetch("http://localhost:5000/api/conversation", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId1: (session?.user as { id?: string | number })?.id,
    userId2: selectedUserId,
  }),
});

const convo = await response.json();
router.push(`/chat/${convo.id}`);
}
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Search
          </h1>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages, people, and rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm border-muted"
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 m-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-4">
            <TabsContent value="all" className="space-y-6 mt-0">
              {/* Messages Section */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <MessageCircle className="h-4 w-4 text-purple-600" />
                  <h3 className="font-semibold">Messages</h3>
                  <Badge variant="secondary">{searchResults.messages.length}</Badge>
                </div>
                <div className="space-y-2">
                  {searchResults.messages.map((message, index) => (
                    <div
                      key={message.id}
                      className="p-3 rounded-lg border hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] animate-in slide-in-from-left-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                            {message.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{message.sender}</span>
                            <span className="text-xs text-muted-foreground">in {message.chat}</span>
                            <span className="text-xs text-muted-foreground">• {message.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* People Section */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="h-4 w-4 text-purple-600" />
                  <h3 className="font-semibold">People</h3>
                  <Badge variant="secondary">{searchResults.people.length}</Badge>
                </div>
                <div className="space-y-2">
                  {searchResults.people.map((person, index) => (
                    <div
                      key={person.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] animate-in slide-in-from-left-2"
                      style={{ animationDelay: `${(index + 2) * 100}ms` }}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={person.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">{person.name}</h4>
                        <p className="text-sm text-muted-foreground">{person.username}</p>
                        <p className="text-xs text-muted-foreground">{person.mutualFriends} mutual friends</p>
                      </div>
                      <Button onClick={()=>{
                        setselectedUserId(person.id);
                        handleMessageClick()}} variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rooms Section */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Hash className="h-4 w-4 text-purple-600" />
                  <h3 className="font-semibold">Rooms</h3>
                  <Badge variant="secondary">{searchResults.rooms.length}</Badge>
                </div>
                <div className="space-y-2">
                  {searchResults.rooms.map((room, index) => (
                    <div
                      key={room.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] animate-in slide-in-from-left-2"
                      style={{ animationDelay: `${(index + 4) * 100}ms` }}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={room.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                          {room.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">{room.name}</h4>
                        <p className="text-sm text-muted-foreground">{room.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {room.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{room.members} members</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="messages" className="mt-0">
              <div className="space-y-2">
                {searchResults.messages.map((message, index) => (
                  <div
                    key={message.id}
                    className="p-3 rounded-lg border hover:bg-accent/50 transition-all duration-200 animate-in slide-in-from-left-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                          {message.sender
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{message.sender}</span>
                          <span className="text-xs text-muted-foreground">in {message.chat}</span>
                          <span className="text-xs text-muted-foreground">• {message.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="people" className="mt-0">
              <div className="space-y-2">
                {searchResults.people.map((person, index) => (
                  <div
                    key={person.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-all duration-200 animate-in slide-in-from-left-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={person.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{person.name}</h4>
                      <p className="text-sm text-muted-foreground">{person.username}</p>
                      <p className="text-xs text-muted-foreground">{person.mutualFriends} mutual friends</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Message
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rooms" className="mt-0">
              <div className="space-y-2">
                {searchResults.rooms.map((room, index) => (
                  <div
                    key={room.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-all duration-200 animate-in slide-in-from-left-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={room.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                        {room.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{room.name}</h4>
                      <p className="text-sm text-muted-foreground">{room.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {room.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{room.members} members</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Join
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
