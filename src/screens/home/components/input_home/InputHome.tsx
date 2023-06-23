import { useTheme } from "styled-components/native"
import Evillcons from "react-native-vector-icons/EvilIcons"
import React from "react"
import { TextInputProps } from "react-native"
import * as Styles from "./input_home_styles"
import { Contants } from "@/utils/contants"


interface IInputHomeProops extends TextInputProps {
  height: number
}

export default function InputHome({ height, ...rest }: IInputHomeProops) {
  const { color } = useTheme()
  return (
    <Styles.viewInput>
      <Styles.viewOffsetHeight testID={Contants.testIdWrapperInputWithIcon} height={height}>
        <Styles.prefix testID={Contants.testIdIconInputHome} height={height} >
          <Evillcons name="search" size={23} color={color.grayLight} />
        </Styles.prefix>
        <Styles.input
          height={height}
          {...rest}
          multiline
          returnKeyType="search"
          accessibilityRole="search"
          placeholderTextColor={color.grayLight}
        />
      </Styles.viewOffsetHeight>
    </Styles.viewInput>
  )

}