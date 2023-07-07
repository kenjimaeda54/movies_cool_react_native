import { mockSeries } from '@/mock/mock_data'
import { GenericMovieSeriesModel } from '@/models/generic_movie_series_model'
import { MoviesResults } from '@/models/movies_model'
import { SeriesResults } from '@/models/series_model'
import useMoviesClient, {
  IUseMoviesClient,
} from '@/services/movies_client'
import useSeriesClient, {
  IUseSeriesClient,
} from '@/services/series_client'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'

//esses montes de omit ocorreram porque precisava usar para test porem na vieww não ira representar
type OmitValues =
  | 'currentPageSeries'
  | 'fetchPageSeries'
  | 'fetchPageMovies'
  | 'currentPageMovies'
  | 'fetchNextPageMovies'
  | 'fetchNextPageSeries'
  | 'fetchMovies'

export interface IHomeViewModel extends Omit<Clients, OmitValues> {
  handleHeightInput: (height: number) => void
  inputHeight: number
  handleNavigationMovies: (item: MoviesResults, title: string) => void
  handleNavigationSeries: (item: SeriesResults, title: string) => void
  handleSearchTypeMovie: () => void
  handleSearchTypeSeries: () => void
  genericMovieSeries: GenericMovieSeriesModel[]
  returnCapitalize: (value: string) => string
  typeSearchApi: ISearchMoviesSeries
  handleOnChangeTextSearchMoviesSeries: (value: string) => void
  setTypeSearchApi: (value: ISearchMoviesSeries) => void
}

export interface ISearchMoviesSeries {
  typeSearchSelected: string
  typeSearchApi: string
  value: string
}

type Clients = IUseSeriesClient & IUseMoviesClient

export default function useHomeViewModel(): IHomeViewModel {
  const {
    isFetchingSeries,
    dataSeries,
    handleMoreDataSeries,
    isSucessSeries,
  } = useSeriesClient()

  const {
    isFetchingMovies,
    dataMovies,
    handleMoreDataMovies,
    isSuccessMovies,
  } = useMoviesClient()

  const { navigate } = useNavigation()

  const [inputHeight, setInputHeight] = useState(20)
  const [typeSearchApi, setTypeSearchApi] =
    useState<ISearchMoviesSeries>({
      typeSearchApi: '',
      value: '',
      typeSearchSelected: 'filmes',
    } as ISearchMoviesSeries)
  const [genericMovieSeries, setGenericMovieSeries] = useState<
    GenericMovieSeriesModel[]
  >([])

  useEffect(() => {
    const genericMoviesSeries: GenericMovieSeriesModel[] =
      mockSeries.results.map((it) => {
        return {
          title: it.original_name,
          photo: it.backdrop_path,
          overview: it.overview,
        }
      })
    setGenericMovieSeries(genericMoviesSeries)
  }, [])

  const handleSearchTypeMovie = () =>
    setTypeSearchApi({
      typeSearchApi: '',
      typeSearchSelected: 'filmes',
      value: '',
    })

  const handleSearchTypeSeries = () =>
    setTypeSearchApi({
      typeSearchApi: '',
      typeSearchSelected: 'series',
      value: '',
    })

  const returnCapitalize = (value: string): string =>
    value.charAt(0).toUpperCase() + value.slice(1)

  const handleNavigationMovies = (
    item: MoviesResults,
    title: string
  ) => navigate('details', { item, title })

  const handleNavigationSeries = (
    item: SeriesResults,
    title: string
  ) => navigate('details', { item, title })

  const handleHeightInput = (height: number) =>
    setInputHeight(height + 7)

  function handleOnChangeTextSearchMoviesSeries(value: string) {
    setTypeSearchApi({
      typeSearchSelected: typeSearchApi.typeSearchSelected,
      typeSearchApi: typeSearchApi.typeSearchSelected,
      value,
    })

    if (
      typeSearchApi.value.length > 1 &&
      typeSearchApi.value.length % 4 === 0
    ) {
    }
  }

  return {
    inputHeight,
    handleHeightInput,
    isFetchingSeries,
    dataSeries,
    handleMoreDataSeries,
    isFetchingMovies,
    dataMovies,
    handleMoreDataMovies,
    isSuccessMovies,
    isSucessSeries,
    handleNavigationMovies,
    handleNavigationSeries,
    handleSearchTypeMovie,
    handleSearchTypeSeries,
    genericMovieSeries,
    returnCapitalize,
    typeSearchApi,
    handleOnChangeTextSearchMoviesSeries,
    setTypeSearchApi,
  }
}
