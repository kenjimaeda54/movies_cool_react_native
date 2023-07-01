import { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native' //precisa ser /native
import theme from '@/themes/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/services/query_client'

type Options = Parameters<typeof render>[1]

const allTheProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </ThemeProvider>
)

const newRender = (ui: ReactElement, options?: Options) =>
  render(ui, { wrapper: allTheProviders, ...options })

export * from '@testing-library/react-native'

export { newRender as render }
