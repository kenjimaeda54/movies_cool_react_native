import { MoviesModel } from '@/models/movies_model'
import api from '@/services/api'
import { Contants } from '@/utils/contants'
import {
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { MutableRefObject, useRef } from 'react'

export interface IUseMoviesClient {
  dataMovies: InfiniteData<MoviesModel>
  isFetchingMovies: boolean
  handleMoreDataMovies: () => void
  isSuccessMovies: boolean
  currentPageMovies: MutableRefObject<number>
  fetchPageMovies: (discover: MoviesModel) => void
}

export default function useMoviesClient(): IUseMoviesClient {
  let currentPageMovies = useRef(1)

  async function fetchMovies() {
    const response = await api.get(
      `/discover/movie?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPageMovies.current}&sort_by=popularity.desc`
    )
    return response.data as MoviesModel
  }

  function fetchPageMovies(discover: MoviesModel) {
    if (currentPageMovies.current <= 5) {
      return `/discover/movie?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPageMovies.current}&sort_by=popularity.desc`
    }

    return discover
  }

  const {
    data: dataMovies = {} as InfiniteData<MoviesModel>,
    hasNextPage = true, // o default precisei deixar como 4 para passar na condiçaõ do hadleMoreDateMovies
    isFetching: isFetchingMovies,
    isSuccess: isSuccessMovies,
  } = useInfiniteQuery([Contants.keyReactQuerySerie], fetchMovies, {
    getNextPageParam: fetchPageMovies,
  })

  function handleMoreDataMovies() {
    if (hasNextPage && currentPageMovies.current <= 5) {
      currentPageMovies.current += 1
    }
  }

  return {
    isFetchingMovies,
    dataMovies,
    handleMoreDataMovies,
    isSuccessMovies,
    fetchPageMovies, //essa logica e para testes não sera usando na view
    currentPageMovies, //essa logica e para testes não sera usando na view
  }
}
