import api from './api'
import { MoviesModel } from '@/models/movies_model'
import { useQuery } from '@tanstack/react-query'
import { Contants } from '@/utils/contants'
import { useRef, useState } from 'react'

export async function fetchSearchMovie(word: string) {
  const response = await api.get(
    `https://api.themoviedb.org/3/search/movie?query=${word}&include_adult=false&language=pt-BR`
  )
  return response.data as MoviesModel
}

interface IUseSearchMovies {
  setNewWord: (word: string) => void
  data: MoviesModel
  isLoading: boolean
  refetch: () => void
}

export default function useSearchMoviesClient(): IUseSearchMovies {
  const word = useRef('')

  const setNewWord = (newWord: string) => (word.current = newWord)

  const {
    data = {} as MoviesModel,
    isLoading,
    refetch,
  } = useQuery([Contants.keyReactQuerySearchMovie], () =>
    fetchSearchMovie(word.current)
  )

  return {
    data,
    setNewWord,
    isLoading,
    refetch,
  }
}
