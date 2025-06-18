"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { OnboardingFlow } from "./onboarding-flow"

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

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("lynk-onboarding-completed")
    if (!hasCompletedOnboarding) {
      setIsOnboarding(true)
    }
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem("lynk-onboarding-completed", "true")
    setIsOnboarding(false)
  }

  const startOnboarding = () => {
    localStorage.removeItem("lynk-onboarding-completed")
    setIsOnboarding(true)
  }

  return (
    <OnboardingContext.Provider value={{ isOnboarding, completeOnboarding, startOnboarding }}>
      {isOnboarding ? <OnboardingFlow onComplete={completeOnboarding} /> : children}
    </OnboardingContext.Provider>
  )
}
