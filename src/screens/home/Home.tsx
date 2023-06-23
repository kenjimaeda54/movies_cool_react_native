import ListDiscovers from "@/components/list_discovers/ListDiscovers";
import useHomeViewModel from "@/view_models/home_view_model";
import Evillcons from "react-native-vector-icons/EvilIcons"
import * as Styles from "./home.styles"
import { Contants } from "@/utils/contants";
import SectionList from "@/components/section_list/SectionList";
import { NativeSyntheticEvent, ScrollView, TextInputContentSizeChangeEventData, View } from "react-native";
import { useTheme } from "styled-components/native";
import InputHome from "@/screens/home/components/input_home/InputHome";


export default function HomeScreen() {
  const { series, activeIndexSeries, handleCurrentIndex, handleHeightInput, setSearchMovieOrSerie, searchMovieOrSerie, inputHeight, refSeries, handleScroolOffset } = useHomeViewModel()
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
          <InputHome
            height={inputHeight}
            accessibilityRole="search"
            onContentSizeChange={(e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => handleHeightInput(e.nativeEvent.contentSize.height)}
            onChangeText={setSearchMovieOrSerie}
            placeholder="Pesquise series ou filmes"
          />
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