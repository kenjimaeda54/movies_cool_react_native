import api from './api'
import { MoviesModel } from '@/models/movies_model'
import { useQuery } from '@tanstack/react-query'
import { Contants } from '@/utils/contants'
import { MutableRefObject, useRef, useState } from 'react'

export async function fetchSearchMovie(word: string) {
  const response = await api.get(
    `/search/movie?query=${word}&include_adult=false&language=pt-BR`
  )

  return response.data as MoviesModel
}

interface IUseSearchMovies {
  setNewWord: (word: string) => void
  data: MoviesModel
  isLoading: boolean
  refetch: () => void
  fetchSearchMovie: (word: string) => Promise<MoviesModel>
  isSuccess: boolean
  word: MutableRefObject<string>
}

export default function useSearchMoviesClient(): IUseSearchMovies {
  const word = useRef('')

  const setNewWord = (newWord: string) => (word.current = newWord)

  const {
    data = {} as MoviesModel,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery([Contants.keyReactQuerySearchMovie, word], () =>
    fetchSearchMovie(word.current)
  )

  return {
    data,
    setNewWord,
    isLoading,
    refetch,
    fetchSearchMovie,
    isSuccess,
    word,
  }
}
