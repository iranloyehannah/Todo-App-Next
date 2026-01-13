'use client'

import { AuthProvider } from '@/components/AuthProvider'
import { QueryClientProvider } from '@/components/QueryClientProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  )
}
