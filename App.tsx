/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { ThemeProvider } from 'styled-components/native'
import theme from '@/themes/theme'
import { NavigationContainer } from '@react-navigation/native'
import RoutesApp from '@/routes/RoutesApp'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/services/query_client'
import 'react-native-devsettings'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RoutesApp />
        </NavigationContainer>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
