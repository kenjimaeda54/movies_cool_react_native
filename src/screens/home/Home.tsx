import ListDiscovers from "@/components/card_apresentation_movie/ListDiscovers";
import useHomeViewModel from "@/view_models/home_view_model";
import Evillcons from "react-native-vector-icons/EvilIcons"
import * as Styles from "./home.styles"
import { Contants } from "@/utils/contants";
import SectionList from "@/components/section_list/SectionList";
import { ScrollView, View } from "react-native";
import { useTheme } from "styled-components";


export default function HomeScreen() {
  const { series, activeIndexSeries, handleCurrentIndex, handleHeightInput, inputHeight, refSeries, handleScroolOffset } = useHomeViewModel()
  const { color } = useTheme()

  return (
    <Styles.container>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          paddingBottom: 120
        }} >
        <Styles.body>
          <Styles.imgTop testID={Contants.testIdImageTopHomeScreen} resizeMode="stretch" source={{ uri: 'https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60' }} />
          <Styles.viewInput>
            <Styles.viewOffsetHeight height={inputHeight}>
              <Styles.prefix height={inputHeight} >
                <Evillcons name="search" size={23} color={color.grayLight} />
              </Styles.prefix>
              <Styles.input
                height={inputHeight}
                onContentSizeChange={handleHeightInput}
                multiline
                scrollEnabled={false}
                placeholderTextColor={color.grayLight}
                placeholder="Pesquise seu filme ou serie" />
            </Styles.viewOffsetHeight>
          </Styles.viewInput>
          <SectionList data={series} titleSection="Series" activeIndex={activeIndexSeries} handleScroolOffset={handleScroolOffset} >
            <ListDiscovers ref={refSeries}
              data={series.results}
              handleActiveIndex={handleCurrentIndex} />
          </SectionList>
          <View style={{ margin: 30 }} />
          <SectionList data={series} titleSection="Movies" activeIndex={activeIndexSeries} handleScroolOffset={handleScroolOffset} >
            <ListDiscovers ref={refSeries} data={series.results} handleActiveIndex={handleCurrentIndex} />
          </SectionList>
        </Styles.body>
      </ScrollView>
    </Styles.container >
  )
}