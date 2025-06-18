"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { MessageCircle, Users, Search, Hash, User, Menu, X } from "lucide-react"
import { useOnboarding } from "@/components/onboarding-provider"

const navigation = [
  { name: "Inbox", href: "/inbox", icon: MessageCircle },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Search", href: "/search", icon: Search },
  { name: "Rooms", href: "/rooms", icon: Hash },
  { name: "Profile", href: "/profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { startOnboarding } = useOnboarding()

  return (
    <>
      <div
        className={cn(
          "flex flex-col bg-card border-r transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Lynk
              </span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">JD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">Online</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground group",
                      isActive &&
                        "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800",
                    )}
                  >
                    <item.icon
                      className={cn("h-5 w-5 transition-colors", isActive && "text-purple-600 dark:text-purple-400")}
                    />
                    {!isCollapsed && (
                      <span className="transition-all duration-200 group-hover:translate-x-1">{item.name}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-2">
            {!isCollapsed && <span className="text-sm text-muted-foreground">Theme</span>}
            <ThemeToggle />
          </div>
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={startOnboarding}
              className="w-full text-xs text-muted-foreground hover:text-foreground"
            >
              Restart Onboarding
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
