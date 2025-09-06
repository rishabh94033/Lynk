"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Video, PhoneOff } from "lucide-react"

interface IncomingCallPopupProps {
  isOpen: boolean
  onAnswer: () => void
  onReject: () => void
  callType: "audio" | "video"
  contactName: string
  contactAvatar?: string
}

export function IncomingCallPopup({
  isOpen,
  onAnswer,
  onReject,
  callType,
  contactName,
  contactAvatar,
}: IncomingCallPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <Card className="w-80 backdrop-blur-sm bg-card/95 border shadow-2xl animate-pulse">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              {callType === "video" ? (
                <Video className="h-5 w-5 text-green-600" />
              ) : (
                <Phone className="h-5 w-5 text-green-600" />
              )}
              <span className="text-sm font-medium">Incoming {callType === "video" ? "Video" : "Voice"} Call</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center space-y-4">
            <Avatar className="h-20 w-20 mx-auto ring-4 ring-green-500/30 animate-pulse">
              <AvatarImage src={contactAvatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl">
                {contactName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div>
              <h3 className="font-semibold text-lg">{contactName}</h3>
              <p className="text-sm text-muted-foreground">is calling you...</p>
            </div>

            {/* Ringing Animation */}
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>

          {/* Answer/Reject Buttons */}
          <div className="flex items-center justify-center space-x-8 mt-6">
            <Button onClick={onReject} className="bg-red-500 hover:bg-red-600 text-white rounded-full w-14 h-14 p-0">
              <PhoneOff className="h-6 w-6" />
            </Button>
            <Button
              onClick={onAnswer}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 p-0"
            >
              <Phone className="h-6 w-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
