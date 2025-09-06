"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Video, PhoneOff, X } from "lucide-react"

interface OutgoingCallPopupProps {
  isOpen: boolean
  onClose: () => void
  callType: "audio" | "video"
  contactName: string
  contactAvatar?: string
}

export function OutgoingCallPopup({ isOpen, onClose, callType, contactName, contactAvatar }: OutgoingCallPopupProps) {
  const [callStatus, setCallStatus] = useState<"calling" | "rejected">("calling")

  useEffect(() => {
    if (!isOpen) return

    // Simulate call being rejected after 15 seconds
    const timer = setTimeout(() => {
      setCallStatus("rejected")
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 15000)

    return () => clearTimeout(timer)
  }, [isOpen, onClose])

  const handleEndCall = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <Card className="w-80 backdrop-blur-sm bg-card/95 border shadow-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              {callType === "video" ? (
                <Video className="h-5 w-5 text-purple-600" />
              ) : (
                <Phone className="h-5 w-5 text-purple-600" />
              )}
              <span className="text-sm font-medium">{callType === "video" ? "Video Call" : "Voice Call"}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="text-center space-y-4">
            <Avatar className="h-20 w-20 mx-auto">
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
              <p className="text-sm text-muted-foreground mt-1">
                {callStatus === "calling" && "Waiting for user to respond..."}
                {callStatus === "rejected" && "Call rejected"}
              </p>
            </div>

            {/* Calling Animation */}
            {callStatus === "calling" && (
              <div className="flex justify-center space-x-1 mt-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            )}
          </div>

          {/* End Call Button */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleEndCall}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full w-14 h-14 p-0"
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
