import api from './api'
import { MoviesModel } from '@/models/movies_model'
import { SeriesModel } from '@/models/series_model'
import { useQuery } from '@tanstack/react-query'
import { Contants } from '@/utils/contants'
import { useRef, useState } from 'react'

export async function fetchSearchSeries(word: string) {
  const response = await api.get(
    `https://api.themoviedb.org/3/search/tv?query=${word}&include_adult=false&language=pt-BR`
  )
  return response.data as SeriesModel
}

interface IUseSearchSeries {
  setNewWord: (word: string) => void
  data: SeriesModel
  isLoading: boolean
  refetch: () => void
}

export default function useSearchSeriesClient(): IUseSearchSeries {
  const word = useRef('')

  const setNewWord = (newWord: string) => (word.current = newWord)

  const {
    data = {} as SeriesModel,
    isLoading,
    refetch,
  } = useQuery([Contants.keyReactQuerySearchSerie], () =>
    fetchSearchSeries(word.current)
  )

  return {
    data,
    setNewWord,
    isLoading,
    refetch,
  }
}
