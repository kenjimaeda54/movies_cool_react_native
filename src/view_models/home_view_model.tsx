import { mockSeries } from '@/mock/mock_data'
import { GenericMovieSeriesModel } from '@/models/generic_movie_series_model'
import { MoviesModel, MoviesResults } from '@/models/movies_model'
import { SeriesModel, SeriesResults } from '@/models/series_model'
import useMoviesClient, {
  IUseMoviesClient,
} from '@/services/movies_client'
import useSearchMoviesClient from '@/services/search_movies_client'
import useSearchSeriesClient from '@/services/search_series_client'
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
  dataGenericMoviesSeries: GenericMovieSeriesModel[]
  returnCapitalize: (value: string) => string
  typeSearchApi: ISearchMoviesSeries
  handleOnChangeTextSearchMoviesSeries: (value: string) => void
  setTypeSearchApi: (value: ISearchMoviesSeries) => void
  isLoadingSearchMovies: boolean
  isLoadingSearchSeries: boolean
}

export interface ISearchMoviesSeries {
  typeSearchSelected: string
  typeSearchApi: string
  value: string
}

type Clients = IUseSeriesClient & IUseMoviesClient

export default function useHomeViewModel(): IHomeViewModel {
  const {
    data: dataSearchMovies,
    setNewWord: setWordMovies,
    isLoading: isLoadingSearchMovies,
    refetch: refetchSearchMovies,
  } = useSearchMoviesClient()

  const {
    data: dataSearchSeries,
    setNewWord: setWordSeries,
    isLoading: isLoadingSearchSeries,
    refetch: refetchSearchSeries,
  } = useSearchSeriesClient()

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
  let dataGenericMoviesSeries = [] as GenericMovieSeriesModel[]

  if (dataSearchMovies.results?.length > 0) {
    dataGenericMoviesSeries = returnGenericMovie(dataSearchMovies)
  }

  if (dataSearchSeries.results?.length > 0) {
    dataGenericMoviesSeries = returnGenericSerie(dataSearchSeries)
  }

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

  function returnGenericMovie(
    data: MoviesModel
  ): GenericMovieSeriesModel[] {
    return data.results?.map((it) => {
      return {
        title: it.original_title,
        overview: it.overview,
        photo: it.backdrop_path,
      } as GenericMovieSeriesModel
    })
  }

  function returnGenericSerie(
    data: SeriesModel
  ): GenericMovieSeriesModel[] {
    return data.results?.map((it) => {
      return {
        title: it.name,
        overview: it.overview,
        photo: it.backdrop_path,
      } as GenericMovieSeriesModel
    })
  }

  function handleOnChangeTextSearchMoviesSeries(value: string) {
    setTypeSearchApi({
      typeSearchSelected: typeSearchApi.typeSearchSelected,
      typeSearchApi: typeSearchApi.typeSearchSelected,
      value,
    })

    if (value.length > 1 && value.length % 3 === 0) {
      if (typeSearchApi.typeSearchApi === 'filmes') {
        setWordMovies(value)
        refetchSearchMovies()
      } else {
        setWordSeries(value)
        refetchSearchSeries()
      }
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
    dataGenericMoviesSeries,
    returnCapitalize,
    typeSearchApi,
    handleOnChangeTextSearchMoviesSeries,
    setTypeSearchApi,
    isLoadingSearchMovies,
    isLoadingSearchSeries,
  }
}
