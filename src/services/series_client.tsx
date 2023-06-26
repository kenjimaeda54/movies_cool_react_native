import { SeriesModel } from "@/models/series_model";
import api from "@/services/api";
import { Contants } from "@/utils/contants";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";





export interface IUseSeriesClient {
  dataSeries: InfiniteData<SeriesModel>
  isFetchingSeries: boolean
  handleMoreDataSeries: () => void
}

let currentPage = 1

async function fetchSeries() {
  const response = await api.get(`/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPage}&sort_by=popularity.desc`)
  return response.data as SeriesModel
}


export default function useSeriesClient(): IUseSeriesClient {


  function fetchPage(discover: SeriesModel) {
    if (currentPage <= 10) {
      return `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPage}&sort_by=popularity.desc`
    }

    return discover

  }

  const { data: dataSeries = {} as InfiniteData<SeriesModel>, hasNextPage = false, fetchNextPage, isFetching: isFetchingSeries } = useInfiniteQuery([Contants.keyReactQueryMovie], fetchSeries, {
    getNextPageParam: fetchPage
  })


  function handleMoreDataMovie() {
    if (hasNextPage && currentPage <= 10) {
      currentPage += 1
      fetchNextPage()
    }

  }


  return {
    isFetchingSeries,
    dataSeries,
    handleMoreDataSeries: handleMoreDataMovie
  }


}