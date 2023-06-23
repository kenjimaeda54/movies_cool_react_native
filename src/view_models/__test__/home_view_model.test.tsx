import theme from "@/themes/theme"
import { renderHook } from "@testing-library/react-native"
import { ReactNode } from "react"
import { ThemeProvider } from "styled-components/native"
import useHomeViewModel from "../home_view_model"
import { act } from "react-test-renderer"



describe('useHomeViewModel', () => {


  const wrapper = ({ children }: { children: ReactNode }) => <ThemeProvider theme={theme} >{children}</ThemeProvider>

  it('handleHeightInput function should change height input', () => {
    const { result } = renderHook(() => useHomeViewModel(), { wrapper })


    act(() => {
      result.current.handleHeightInput(7)

    })

    expect(result.current.inputHeight).toBe(14)

  })


  it('handleCurrentIndex function should change index active', () => {
    const { result } = renderHook(() => useHomeViewModel(), { wrapper })


    act(() => {
      result.current.handleCurrentIndex(7)

    })

    expect(result.current.activeIndexSeries).toBe(7)

  })




})