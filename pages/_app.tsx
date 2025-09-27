import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@/components/QueryClientProvider'
import { AuthProvider } from '@/components/AuthProvider'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { useState } from 'react'

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}


