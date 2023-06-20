import { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native"; //precisa ser /native
import theme from "@/themes/theme";

type Options = Parameters<typeof render>[1]


const allTheProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)



const newRender = (ui: ReactElement, options?: Options) => render(ui, { wrapper: allTheProviders, ...options });

export * from "@testing-library/react-native"

export { newRender as render }