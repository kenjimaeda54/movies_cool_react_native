import { mock } from "@/mock/mock_data";
import { DiscoverModel, SeriesResults } from "@/models/movies_model";
import useMoviesClient, { IUseMoviesClient } from "@/services/movies_client";
import useSeriesClient, { IUseSeriesClient } from "@/services/series_client";
import { useState } from "react";
import { useTheme } from "styled-components/native";

export interface IHomeViewModel extends Clients {
  handleHeightInput: (height: number) => void
  inputHeight: number
  setSearchMovieOrSerie: (search: string) => void
  searchMovieOrSerie: string
}

type Clients = IUseSeriesClient & IUseMoviesClient


export default function useHomeViewModel(): IHomeViewModel {
  const { isFetchingSeries, dataSeries, handleMoreDataSeries } = useSeriesClient()
  const { isFetchingMovies, dataMovies, handleMoreDataMovies } = useMoviesClient()
  const [inputHeight, setInputHeight] = useState(20)
  const [searchMovieOrSerie, setSearchMovieOrSerie] = useState("")



  const handleHeightInput = (height: number) => setInputHeight(height + 7)



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
  }
}

