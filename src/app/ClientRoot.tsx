'use client'

import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {children}
      <Toaster />
    </Providers>
  )
} 