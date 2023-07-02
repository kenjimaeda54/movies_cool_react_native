import { SeriesModel } from '@/models/series_model'
import api from '@/services/api'
import { Contants } from '@/utils/contants'
import {
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { MutableRefObject, useRef } from 'react'

export interface IUseSeriesClient {
  dataSeries: InfiniteData<SeriesModel>
  isFetchingSeries: boolean
  handleMoreDataSeries: () => void
  isSucessSeries: boolean
  fetchPageSeries: (discover: SeriesModel) => void
  currentPageSeries: MutableRefObject<number>
  fetchNextPageSeries: () => Promise<
    InfiniteQueryObserverResult<SeriesModel, unknown>
  >
}


export async function fetchSeries(currentPage: number) {
  const response = await api.get(
    `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPage}&sort_by=popularity.desc`
  )
  return response.data as SeriesModel
}

export default function useSeriesClient(): IUseSeriesClient {
  let currentPageSeries = useRef(1)



  function fetchPageSeries(discover: SeriesModel) {
    if (currentPageSeries.current <= 5) {
      return `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPageSeries.current}&sort_by=popularity.desc`
    }

    return discover
  }

  const {
    data: dataSeries = {} as InfiniteData<SeriesModel>,
    hasNextPage = true,
    fetchNextPage: fetchNextPageSeries,
    isFetching: isFetchingSeries,
    isSuccess: isSucessSeries,
  } = useInfiniteQuery([Contants.keyReactQueryMovie],()  => fetchSeries(currentPageSeries.current), {
    getNextPageParam: fetchPageSeries,
  })

  function handleMoreDataSeries() {
    if (hasNextPage && currentPageSeries.current <= 5) {
      currentPageSeries.current += 1
      fetchNextPageSeries()
    }
  }

  return {
    isFetchingSeries,
    dataSeries,
    handleMoreDataSeries,
    isSucessSeries,
    fetchPageSeries,
    currentPageSeries,
    fetchNextPageSeries,
  }
}
