import { Contants } from "@/utils/contants"
import * as Styles from "./indicator_series_popular_styles"
import { TouchableOpacityProps } from "react-native"


export interface IIndicatorSeriesPopular extends TouchableOpacityProps {
  activeIndex: number
  index: number
}

export default function IndicatorSeriesPopular({ activeIndex, index, ...rest }: IIndicatorSeriesPopular) {
  const testId = `${Contants.testIdIndicatorsSeriesPopular}-${index}`
  return <Styles.indicator accessibilityRole={"button"} {...rest} activeIndex={activeIndex} index={index} testID={testId} />
}