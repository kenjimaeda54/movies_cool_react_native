import useHomeViewModel from '@/view_models/home_view_model'
import { FlashList } from '@shopify/flash-list'
import * as Styles from './home.styles'
import { Contants } from '@/utils/contants'
import SectionList from '@/components/section_list/SectionList'
import {
  ActivityIndicator,
  Dimensions,
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
import { GenericMovieSeriesModel } from '@/models/generic_movie_series_model'
import { returnOverview } from '@/utils/return_overview_utils'
import { ReactNode } from 'react'

const { width } = Dimensions.get('screen')
interface IRenderSectionOrList {
  conditional: boolean
  children: ReactNode
  returnCapitalize: (value: string) => string
  titleMoviesOrSeries: string
  genericMovieSeries: GenericMovieSeriesModel[]
  isLoadingMovies: boolean
  isLoadingSeries: boolean
  handleNavigationGenericMovies: (
    item: GenericMovieSeriesModel,
    title: string
  ) => void
}

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

export const RenderItemSearchMovieOrSerie = ({
  item,
  handleNavigationGenericMovies,
}: {
  item: GenericMovieSeriesModel
  handleNavigationGenericMovies: (
    item: GenericMovieSeriesModel,
    title: string
  ) => void
}) => {
  return (
    <Styles.containerItemSearchMovieSeries
      onPress={() => handleNavigationGenericMovies(item, item.title)}
      testID={Contants.testIdItemSearchSeriesOrMovie}>
      <Styles.imageItemCover
        testID={Contants.testIdImageItemSearchSeriesOrMovie}
        source={{
          uri: `${Contants.baseUrlImage}/${item.photo}`,
          priority: FastImage.priority.high,
          cache: 'immutable',
        }}
        resizeMode={FastImage.resizeMode.cover}
        defaultSource={require('assets/images/image_not_found.png')}
      />
      <Styles.titleMovieSerie>{item.title}</Styles.titleMovieSerie>
      <Styles.overviewMovieSerie numberOfLines={3}>
        {returnOverview(item.overview)}
      </Styles.overviewMovieSerie>
    </Styles.containerItemSearchMovieSeries>
  )
}

export function RenderSectionOrList({
  conditional,
  children,
  returnCapitalize,
  titleMoviesOrSeries,
  genericMovieSeries,
  isLoadingMovies,
  isLoadingSeries,
  handleNavigationGenericMovies,
}: IRenderSectionOrList) {
  return conditional ? (
    isLoadingMovies || isLoadingSeries ? (
      <ActivityIndicator
        testID={Contants.testIdLoadingIndicatorComponentListSearch}
        size={20}
      />
    ) : (
      <View
        style={{ width: width }}
        testID={Contants.testIdViewContainerRenderItemSearchOrMovie}>
        <Styles.wrapTitleGenericMovieSeries>
          {returnCapitalize(titleMoviesOrSeries)}
        </Styles.wrapTitleGenericMovieSeries>
        <FlashList
          data={genericMovieSeries}
          testID={Contants.testIdListGenericsMoviesAndSeries}
          contentContainerStyle={{
            paddingRight: 50,
          }}
          estimatedItemSize={470}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RenderItemSearchMovieOrSerie
              handleNavigationGenericMovies={
                handleNavigationGenericMovies
              }
              item={item}
            />
          )}
        />
      </View>
    )
  ) : (
    children
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
    inputHeight,
    handleNavigationMovies,
    handleNavigationSeries,
    handleSearchTypeMovie,
    handleSearchTypeSeries,
    dataGenericMoviesSeries,
    returnCapitalize,
    typeSearchApi,
    handleOnChangeTextSearchMoviesSeries,
    isLoadingSearchMovies,
    isLoadingSearchSeries,
    handleNavigationGenericMovies,
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
            value={typeSearchApi.value}
            onContentSizeChange={(
              e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
            ) => handleHeightInput(e.nativeEvent.contentSize.height)}
            onChangeText={handleOnChangeTextSearchMoviesSeries}
            placeholder={`Pesquise por ${typeSearchApi.typeSearchSelected}`}
          />

          <Styles.containerButtonSearch>
            <ButtonSearchMoviesSeries
              isSelected={
                typeSearchApi.typeSearchSelected === 'filmes'
              }
              textButton='Filmes'
              onPress={handleSearchTypeMovie}
            />
            <View style={{ marginHorizontal: 10 }} />
            <ButtonSearchMoviesSeries
              isSelected={
                typeSearchApi.typeSearchSelected === 'series'
              }
              textButton='Series'
              onPress={handleSearchTypeSeries}
            />
          </Styles.containerButtonSearch>
          <RenderSectionOrList
            conditional={typeSearchApi.value?.length > 4}
            returnCapitalize={returnCapitalize}
            genericMovieSeries={dataGenericMoviesSeries}
            isLoadingMovies={isLoadingSearchMovies}
            isLoadingSeries={isLoadingSearchSeries}
            handleNavigationGenericMovies={
              handleNavigationGenericMovies
            }
            titleMoviesOrSeries={typeSearchApi.typeSearchApi}>
            <>
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
            </>
          </RenderSectionOrList>
        </Styles.body>
      </ScrollView>
    </Styles.container>
  )
}
