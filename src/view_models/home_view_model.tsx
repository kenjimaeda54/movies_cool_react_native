import { mockSeries } from '@/mock/mock_data'
import { MoviesResults } from '@/models/movies_model'
import { SeriesResults } from '@/models/series_model'
import useMoviesClient, {
  IUseMoviesClient,
} from '@/services/movies_client'
import useSeriesClient, {
  IUseSeriesClient,
} from '@/services/series_client'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useTheme } from 'styled-components/native'

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
  setSearchMovieOrSerie: (search: string) => void
  searchMovieOrSerie: string
  handleNavigationMovies: (item: MoviesResults) => void
  handleNavigationSeries: (item: SeriesResults) => void
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
  const [searchMovieOrSerie, setSearchMovieOrSerie] = useState('')

  const handleNavigationMovies = (item: MoviesResults) =>
    navigate('details', { item })

  const handleNavigationSeries = (item: SeriesResults) =>
    navigate('details', { item })

  const handleHeightInput = (height: number) =>
    setInputHeight(height + 7)

  return {
    inputHeight,
    handleHeightInput,
    setSearchMovieOrSerie,
    searchMovieOrSerie,
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
  }
}
