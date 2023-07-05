import useHomeViewModel from '@/view_models/home_view_model'
import * as Styles from './home.styles'
import { Contants } from '@/utils/contants'
import SectionList from '@/components/section_list/SectionList'
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  ScrollView,
  TextInputContentSizeChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native'
import InputHome from '@/screens/home/components/input_home/InputHome'
import { MoviesResults } from '@/models/movies_model'
import FastImage from 'react-native-fast-image'
import { SeriesResults } from '@/models/series_model'
import { SharedElement } from 'react-navigation-shared-element'
import ButtonSearchMoviesSeries from '@/components/button_search_movie_series/ButtonSearchMoviesSeries'

export function FooterComponent({
  showComponent,
}: {
  showComponent: boolean
}) {
  return (
    <Styles.wrapperFooterComponent
      testID={Contants.testIdFooterComponentHome}>
      {showComponent && <ActivityIndicator size='small' />}
    </Styles.wrapperFooterComponent>
  )
}

export const RenderItemMovies = ({
  item,
  handleNavigationMovies,
}: {
  item: MoviesResults
  handleNavigationMovies: (item: MoviesResults, title: string) => void
}) => {
  return (
    <TouchableOpacity
      testID={Contants.testIdTouchAbleOpacityRenderItemMovies}
      onPress={() =>
        handleNavigationMovies(item, item.original_title)
      }
      style={{ flex: 1 }}>
      <SharedElement style={{ flex: 1 }} id={`${item.id}.photo`}>
        <Styles.imageItem
          testID={Contants.testIdImageMoviesHome}
          source={{
            uri: `${Contants.baseUrlImage}/${item.backdrop_path}`,
            priority: FastImage.priority.high,
            cache: 'immutable',
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={require('assets/images/image_not_found.png')}
        />
      </SharedElement>
      {/*overflow usa numberOfline*/}
      <Styles.textItem numberOfLines={1}>
        {item.original_title}
      </Styles.textItem>
    </TouchableOpacity>
  )
}

export const RenderItemSeries = ({
  item,
  handleNavigationSeries,
}: {
  item: SeriesResults
  handleNavigationSeries: (item: SeriesResults, title: string) => void
}) => {
  return (
    <TouchableOpacity
      testID={Contants.testIdTouchAbleOpacityRenderItemSeries}
      onPress={() => handleNavigationSeries(item, item.name)}
      style={{ flex: 1 }}>
      <SharedElement style={{ flex: 1 }} id={`${item.id}.photo`}>
        <Styles.imageItem
          testID={Contants.testIdImageSeriesHome}
          source={{
            uri: `${Contants.baseUrlImage}/${item.backdrop_path}`,
            priority: FastImage.priority.high,
            cache: 'immutable',
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={require('assets/images/image_not_found.png')}
        />
      </SharedElement>
      {/*overflow usa numberOfline*/}
      <Styles.textItem numberOfLines={1}>{item.name}</Styles.textItem>
    </TouchableOpacity>
  )
}

export default function HomeScreen() {
  const {
    dataSeries,
    handleMoreDataSeries,
    dataMovies,
    isFetchingMovies,
    handleMoreDataMovies,
    isSuccessMovies,
    isSucessSeries,
    isFetchingSeries,
    handleHeightInput,
    setSearchMovieOrSerie,
    inputHeight,
    handleNavigationMovies,
    handleNavigationSeries,
    typeSearchSelected,
    handleTypeSearchSelected,
  } = useHomeViewModel()

  return (
    <Styles.container>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}>
        <Styles.body testID={Contants.testIdBodyHome}>
          <Styles.imgTop
            testID={Contants.testIdImageTopHomeScreen}
            resizeMode='stretch'
            source={{
              uri: 'https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
            }}
          />

          <InputHome
            height={inputHeight}
            accessibilityRole='search'
            onContentSizeChange={(
              e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
            ) => handleHeightInput(e.nativeEvent.contentSize.height)}
            onChangeText={setSearchMovieOrSerie}
            placeholder={`Pesquise por ${typeSearchSelected}`}
          />
          <Styles.containerButtonSearch>
            <ButtonSearchMoviesSeries
              isSelected={typeSearchSelected === 'filmes'}
              textButton='Filmes'
              onPress={() => handleTypeSearchSelected('filmes')}
            />
            <View style={{ marginHorizontal: 10 }} />
            <ButtonSearchMoviesSeries
              isSelected={typeSearchSelected === 'series'}
              textButton='Series'
              onPress={() => handleTypeSearchSelected('series')}
            />
          </Styles.containerButtonSearch>
          <SectionList
            isSuccess={isSucessSeries}
            testID={Contants.testIdSectionListSeriesMovies}
            titleSection='Series'
            renderDetails={({ item }) => (
              <RenderItemSeries
                item={item}
                handleNavigationSeries={handleNavigationSeries}
              />
            )}
            data={dataSeries.pages
              ?.map((page) => page.results)
              .flat()}
            onEndReached={handleMoreDataSeries}
            ListFooterComponent={
              <FooterComponent showComponent={isFetchingMovies} />
            }
          />
          <View style={{ margin: 30 }} />
          <SectionList
            isSuccess={isSuccessMovies}
            testID={Contants.testIdSectionListSeriesMovies}
            titleSection='Movies'
            renderDetails={({ item }) => (
              <RenderItemMovies
                item={item}
                handleNavigationMovies={handleNavigationMovies}
              />
            )}
            data={dataMovies.pages
              ?.map((page) => page.results)
              .flat()}
            onEndReached={handleMoreDataMovies}
            ListFooterComponent={
              <FooterComponent showComponent={isFetchingSeries} />
            }
          />
        </Styles.body>
      </ScrollView>
    </Styles.container>
  )
}
