"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Phone, Video, MoreVertical, Send, Smile, Paperclip } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { io, Socket } from 'socket.io-client';
import { useSession } from "next-auth/react"

// const messages = [
//   {
//     id: 1,
//     text: "Hey! How's your day going?",
//     sender: "other",
//     time: "10:30 AM",
//     avatar: "/placeholder.svg?height=32&width=32",
//   },
//   {
//     id: 2,
//     text: "Pretty good! Just finished a big project. How about you?",
//     sender: "me",
//     time: "10:32 AM",
//   },
//   {
//     id: 3,
//     text: "That's awesome! I'm just working on some designs",
//     sender: "other",
//     time: "10:33 AM",
//     avatar: "/placeholder.svg?height=32&width=32",
//   },
//   {
//     id: 4,
//     text: "Would love to see them when you're ready to share!",
//     sender: "me",
//     time: "10:35 AM",
//   },
//   {
//     id: 5,
//     text: "I'll send them over later today",
//     sender: "other",
//     time: "10:36 AM",
//     avatar: "/placeholder.svg?height=32&width=32",
//   },
// ]

export default function ChatPage({ params }: { params: { id: string } }) {
  const [newMessage, setNewMessage] = useState("")
  type Message = {
    id: number | string;
    text: string;
    sender: "me" | "other";
    time: string;
    avatar?: string;
  };

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [participants, setParticipants] = useState([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
const router = useRouter();
const typingTimeout = useRef<NodeJS.Timeout | null>(null);
const { data: session } = useSession();
const param = useParams();
const conversationId = param.id;
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])
// console.log("Conversation ID:", conversationId);


//useeffect to connect to socket and join conversation
useEffect(() => {
    if (!conversationId) return;

    // Connect to your Express backend
    const socketConnection = io('http://localhost:8000'); // Your Express server URL
    setSocket(socketConnection);

    // Join the conversation room
    socketConnection.emit('join-conversation', conversationId);

    // Listen for new messages
    socketConnection.on('new-message', (message: Message) => {
      setChatMessages(prev => [...prev, message]);
    });

    // Listen for typing indicators
    socketConnection.on('user-typing', (data) => {
      setTypingUsers(prev => {
  if (!prev.includes(data.userName)) {
    return [...prev, data.userName];
  }
  return prev;
});
    });

    socketConnection.on('user-stopped-typing', (data) => {
      setTypingUsers(prev => prev.filter(name => name !== data.userName));
    });

    // Cleanup on unmount
    return () => {
      socketConnection.disconnect();
    };
  }, [conversationId]);


// useEffect to load convo on first render
useEffect(() => {
    if (!conversationId) return;

    const fetchConversation = async () => {
      const res = await fetch(`http://localhost:5000/api/conversation/${conversationId}`);
      const data = await res.json();

      const currentUserId = (session?.user as { id?: string | number })?.id;

      // console.log("seesion id:", currentUserId);

    const transformedMessages = data.messages.map((msg: any) => ({
      id: msg.id,
      text: msg.content,
      sender: msg.sender.id === currentUserId ? "me" : "other",
      time: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatar: "/placeholder.svg",
    }));


      setChatMessages(transformedMessages);
if (data?.data?.participants) {
  setParticipants(data.data.participants);
} else {
  // console.error("participants not found in response", data);

return;}    };

    fetchConversation();
  }, [conversationId, session?.user]);


  // const handleSendMessage = async() => {
  //   if (!newMessage.trim() || !(session?.user as { id?: string | number })?.id) return

  //   try {
  //     const res = await fetch("http://localhost:5000/api/conversation/messages/send", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         content: newMessage,
  //         senderId: (session?.user as { id?: string | number })?.id,
  //         conversationId: params.id,
  //       }),
  //     })

  //     const data = await res.json()

  //     if (res.ok) {
  //       setChatMessages((prev) => [...prev, data])
  //       setNewMessage("")
  //     } else {
  //       console.error("Message send error:", data)
  //     }
  //   } catch (err) {
  //     console.error("Error sending message:", err)
  //   }
  // }

  // useEffect to handle incoming messages
  // This will be handled by the socket connection established above
useEffect(() => {
  if (!socket) return;

  const handleNewMessage = (message:any) => {
    const currentUserId = (session?.user as { id?: string | number })?.id;
    // console.log("New incoming message:", message);
const tempId = uuidv4();
    setChatMessages(prev => [
      ...prev,
      {
        id: tempId,
        text: message.content,
        sender: message.senderId === currentUserId? "me" : "other",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
    ]);
    scrollToBottom();
  };

  socket.on('new-message', handleNewMessage);

  // Cleanup on unmount
  return () => {
    socket.off('new-message', handleNewMessage);
  };
}, [socket]);


  const handleSendMessage = () => {
    console.log("Sending message:", newMessage);
    const currentUserId = (session?.user as { id?: string | number })?.id;
    console.log("Current User ID:", currentUserId);
    console.log("socket:", socket);
    if (!socket || !newMessage.trim() || !currentUserId) return;
    socket.emit('send-message', {
      conversationId,
      senderId: currentUserId,
      content: newMessage.trim()
    });

    const tempId = uuidv4();
    setChatMessages(prev => [
      ...prev,
      {
        id: tempId,
        text: newMessage.trim(),
        sender: "me",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
    ]);
    scrollToBottom();
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleTyping = () => {
        const currentUserId = (session?.user as { id?: string | number })?.id;

  if (!socket || !currentUserId) return;

  // Emit 'typing-start'
  socket.emit('typing-start', {
    conversationId,
    userName: (session?.user as { name?: string })?.name || 'Unknown User'
  });

  // Clear previous timeout
  if (typingTimeout.current) {
    clearTimeout(typingTimeout.current);
  }

  // After 2 seconds of inactivity, emit 'typing-stop'
  typingTimeout.current = setTimeout(() => {
    socket.emit('typing-stop', {
      conversationId,
      userName: session?.user?.name || 'Unknown User'
    });
  }, 2000); // you can adjust this timeout
};

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <Link href="/inbox">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">SW</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Sarah Wilson</h2>
            <p className="text-xs text-green-500">Online</p>
            {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.join(', ')} is typing...
          </div>
        )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message, index) => (
          <div
            key={message.id}
            className={`flex items-end space-x-2 animate-in slide-in-from-bottom-2 duration-300`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {message.sender === "other" && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                  SW
                </AvatarFallback>
              </Avatar>
            )}

            <div className={`flex flex-col ${message.sender === "me" ? "items-end ml-auto" : "items-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl transition-all duration-200 hover:scale-105 ${
                  message.sender === "me"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-sm"
                    : "bg-muted rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1 px-2">{message.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-card/50 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onInput={handleTyping}
              className="pr-10 bg-background/50 backdrop-blur-sm"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6">
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
