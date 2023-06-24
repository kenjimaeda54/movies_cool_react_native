import { DiscoverModel } from "@/models/discover_model";
import api from "@/services/api";
import { Contants } from "@/utils/contants";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { Dispatch, useState } from "react";




export interface IUseMoviesClient {
  isLoadingSeries: boolean
  dataSeries: InfiniteData<DiscoverModel>
  hasNextPage: boolean
  isFetchingSeries: boolean
  handleMoreDataMovie: () => void
}

let currentPage = 1

async function fetchSeries() {
  const response = await api.get(`/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPage}&sort_by=popularity.desc`)
  return response.data as DiscoverModel
}


export default function useMoviesClient(): IUseMoviesClient {


  function fetchPage(discover: DiscoverModel) {
    if (currentPage <= 7) {
      return `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPage}&sort_by=popularity.desc`
    }

    return discover

  }

  const { isLoading: isLoadingSeries, data: dataSeries = {} as InfiniteData<DiscoverModel>, hasNextPage = false, fetchNextPage, isFetching: isFetchingSeries } = useInfiniteQuery([Contants.keyReactQueryMovie], fetchSeries, {
    getNextPageParam: fetchPage
  })


  function handleMoreDataMovie() {
    if (hasNextPage) {
      currentPage += 1
      fetchNextPage()
    }

  }


  return {
    isFetchingSeries,
    isLoadingSeries,
    dataSeries,
    hasNextPage,
    handleMoreDataMovie
  }


}