"use client"

import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import WelcomePage from "../app/(auth_pages)/welcome/page"

interface OnboardingContextType {
  isOnboarding: boolean
  completeOnboarding: () => void
  startOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider")
  }
  return context
}

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isOnboarding, setIsOnboarding] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const ignoredRoutes = ["/signin", "/auth/login", "/onboarding"]

    // If current path is an ignored route, don't trigger onboarding screen
    if (ignoredRoutes.includes(pathname)) return

    const hasCompletedOnboarding = localStorage.getItem("lynk-onboarding-completed")
    if (!hasCompletedOnboarding) {
      setIsOnboarding(true)
    }
  }, [pathname])

  const completeOnboarding = () => {
    localStorage.setItem("lynk-onboarding-completed", "true")
    setIsOnboarding(false)
  }

  const startOnboarding = () => {
    localStorage.removeItem("lynk-onboarding-completed")
    setIsOnboarding(true)
  }

  const handleGetStarted = () => {
    router.push("/onboarding")
  }

  return (
    <OnboardingContext.Provider value={{ isOnboarding, completeOnboarding, startOnboarding }}>
      {isOnboarding ? <WelcomePage onGetStarted={handleGetStarted} /> : children}
    </OnboardingContext.Provider>
  )
}
