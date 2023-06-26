import { MoviesModel } from "@/models/movies_model";
import api from "@/services/api";
import { Contants } from "@/utils/contants";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";



export interface IUseMoviesClient {
  dataMovies: InfiniteData<MoviesModel>
  isFetchingMovies: boolean
  handleMoreDataMovies: () => void
}

let currentPage = 1

async function fetchMovies() {
  const response = await api.get(`/discover/movie?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPage}&sort_by=popularity.desc`)
  return response.data as MoviesModel
}


export default function useMoviesClient(): IUseMoviesClient {


  function fetchPage(discover: MoviesModel) {
    if (currentPage <= 10) {
      return `/discover/movie?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPage}&sort_by=popularity.desc`
    }

    return discover

  }

  const { data: dataMovies = {} as InfiniteData<MoviesModel>, hasNextPage = false, fetchNextPage, isFetching: isFetchingMovies } = useInfiniteQuery([Contants.keyReactQuerySerie], fetchMovies, {
    getNextPageParam: fetchPage
  })


  function handleMoreDataMovies() {
    if (hasNextPage && currentPage <= 10) {
      currentPage += 1
      fetchNextPage()
    }

  }


  return {
    isFetchingMovies,
    dataMovies,
    handleMoreDataMovies
  }


}