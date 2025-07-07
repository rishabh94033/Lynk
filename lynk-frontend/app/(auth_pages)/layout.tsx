// app/(auth)/layout.tsx

import { Providers } from "@/providers";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted">
      <Providers>
      {children}</Providers>
    </main>
  )
}
