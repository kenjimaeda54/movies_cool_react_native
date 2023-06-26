
import useHomeViewModel from "@/view_models/home_view_model";
import * as Styles from "./home.styles"
import { Contants } from "@/utils/contants";
import SectionList from "@/components/section_list/SectionList";
import { ActivityIndicator, NativeSyntheticEvent, ScrollView, TextInputContentSizeChangeEventData, View } from "react-native";
import { useTheme } from "styled-components/native";
import InputHome from "@/screens/home/components/input_home/InputHome";
import { MoviesResults } from "@/models/movies_model";
import FastImage from "react-native-fast-image";
import { SeriesResults } from "@/models/series_model";


function FooterComponent() {
  return (
    <Styles.wrapperFooterComponent>
      <ActivityIndicator size="small" />
    </Styles.wrapperFooterComponent>
  )
}


const renderItemMovies = ({ item }: { item: MoviesResults }) => {

  return (
    <>
      <Styles.imageItem
        testID={Contants.testIdImageSeriesPopular}
        source={{
          uri: `${Contants.baseUrlImage}/${item.backdrop_path}`,
          priority: FastImage.priority.high,
          cache: "immutable",
        }}
        resizeMode={FastImage.resizeMode.cover}
        defaultSource={require("assets/images/image_not_found.png")}
      />
      {/*overflow usa numberOfline*/}
      <Styles.textItem numberOfLines={1}  > {item.original_title}</Styles.textItem>
    </>
  )

}

const renderItemSeries = ({ item }: { item: SeriesResults }) => {

  return (
    <>
      <Styles.imageItem
        testID={Contants.testIdImageSeriesPopular}
        source={{
          uri: `${Contants.baseUrlImage}/${item.backdrop_path}`,
          priority: FastImage.priority.high,
          cache: "immutable",
        }}
        resizeMode={FastImage.resizeMode.cover}
        defaultSource={require("assets/images/image_not_found.png")}
      />
      {/*overflow usa numberOfline*/}
      <Styles.textItem numberOfLines={1}  > {item.name}</Styles.textItem>
    </>
  )

}

export default function HomeScreen() {
  const { dataSeries, handleMoreDataSeries, dataMovies, isFetchingMovies, handleMoreDataMovies, isFetchingSeries, handleHeightInput, setSearchMovieOrSerie, searchMovieOrSerie, inputHeight } = useHomeViewModel()


  return (
    <Styles.container>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          paddingBottom: 120,

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
          {dataSeries.pages?.length > 0
            && <SectionList titleSection="Series" renderDetails={renderItemSeries} data={dataSeries.pages?.map(page => page.results).flat()} onEndReached={handleMoreDataSeries} ListFooterComponent={isFetchingSeries ? <FooterComponent /> : null} />
          }
          <View style={{ margin: 30 }} />
          {dataMovies.pages?.length > 0
            && <SectionList titleSection="Movies" renderDetails={renderItemMovies} data={dataMovies.pages?.map(page => page.results).flat()} onEndReached={handleMoreDataMovies} ListFooterComponent={isFetchingMovies ? <FooterComponent /> : null} />
          }
        </Styles.body>
      </ScrollView>
    </Styles.container >
  )
}