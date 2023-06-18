/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { ThemeProvider } from "styled-components/native";
import theme from "@/themes/theme";
import HomeScreen from "@/screens/home/Home";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomeScreen />
    </ThemeProvider>
  )
}
