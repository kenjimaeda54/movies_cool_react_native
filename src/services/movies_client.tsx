import { MoviesModel } from '@/models/movies_model'
import api from '@/services/api'
import { Contants } from '@/utils/contants'
import {
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { MutableRefObject, useRef, useState } from 'react'

export interface IUseMoviesClient {
  dataMovies: InfiniteData<MoviesModel>
  isFetchingMovies: boolean
  handleMoreDataMovies: () => void
  isSuccessMovies: boolean
  currentPageMovies: MutableRefObject<number>
  fetchPageMovies: (discover: MoviesModel) => void
  fetchMovies: (currentPage: number) => Promise<MoviesModel>
}

export async function fetchMovies(currentPage: number) {
  const response = await api.get(
    `/discover/movie?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPage}&sort_by=popularity.desc`
  )
  return response.data as MoviesModel
}

export default function useMoviesClient(): IUseMoviesClient {
  let currentPageMovies = useRef(1)

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
    fetchNextPage: fetchPagesMovies,
  } = useInfiniteQuery(
    [Contants.keyReactQuerySerie],
    () => fetchMovies(currentPageMovies.current),
    {
      getNextPageParam: fetchPageMovies,
    }
  )

  function handleMoreDataMovies() {
    if (hasNextPage && currentPageMovies.current <= 5) {
      currentPageMovies.current += 1
      fetchPagesMovies()
    }
  }

  return {
    isFetchingMovies,
    dataMovies,
    handleMoreDataMovies,
    isSuccessMovies,
    fetchPageMovies, //essa logica e para testes não sera usando na view
    currentPageMovies, //essa logica e para testes não sera usando na view
    fetchMovies, //essa logica e para testes não sera usando na view
  }
}
