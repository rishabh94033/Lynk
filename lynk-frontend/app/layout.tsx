
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Providers } from "@/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lynk",
  description: "A modern texting app with rooms and communities",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
         
            <div className="flex h-screen bg-background">
              {/* <Sidebar /> */}
              <main className="flex-1 overflow-hidden">{children}</main>
            </div>
          
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
