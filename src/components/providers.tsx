'use client'

import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SWRConfig } from 'swr'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
    },
  }))

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SWRConfig
          value={{
            fetcher: (url: string) => fetch(url).then((res) => res.json()),
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SWRConfig>
      </QueryClientProvider>
    </SessionProvider>
  )
} 