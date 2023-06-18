import { Contants } from "@/utils/contants";
import HomeScreen from "../home/Home"
import { render } from "@testing-library/react-native";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components/native"; // precisa ser native pra wraper funcionar 
import themes from "@/themes/theme";


function wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={themes}>
    {children}
  </ThemeProvider>
}

describe('HomeScreen', () => {

  it('should show the app home screen', () => {
    expect(render(<HomeScreen />)).toBeTruthy
  })



  it('should render image on top', () => {
    const { getByTestId } = render(<HomeScreen />, { wrapper })
    const element = getByTestId(Contants.testIdImageTopHomeScreen)

    expect(element.props.source.uri).toEqual("https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60")

  })

})
