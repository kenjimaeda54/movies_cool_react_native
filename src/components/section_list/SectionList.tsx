import { View } from "react-native"
import * as Styles from "./section_list.styles"
import { ReactNode } from "react"
import { DiscoverModel } from "@/models/discover_model"
import IndicatorSeriesPopular from "@/components/indicator_series_popular/IndicatorSeriesPopular"


interface ISectionList {
  children: ReactNode
  data: DiscoverModel
  titleSection: string
  activeIndex: number
  handleScroolOffset: (index: number) => void
}

export default function SectionList({ children, data, titleSection, activeIndex, handleScroolOffset }: ISectionList) {
  return (
    <Styles.container>
      <Styles.titleSection>{titleSection}</Styles.titleSection>
      {children}
      <Styles.wrappListIndicator>
        {data.results && data.results.map((it, index) => <IndicatorSeriesPopular accessibilityRole={"button"} key={it.id} activeIndex={activeIndex} index={index} onPress={() => handleScroolOffset(index)} />)}
      </Styles.wrappListIndicator>
    </Styles.container>
  )

}