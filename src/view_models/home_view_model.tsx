import { mock } from "@/mock/mock_data";
import { DiscoverModel, DiscoverResults } from "@/models/discover_model";
import useMoviesClient, { IUseMoviesClient } from "@/services/movies_client";
import { ReactNode, RefObject, useRef, useState } from "react";
import { FlatList } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "styled-components/native";

export interface IHomeViewModel extends IUseMoviesClient {
  handleHeightInput: (height: number) => void
  inputHeight: number
  setSearchMovieOrSerie: (search: string) => void
  searchMovieOrSerie: string
}



export default function useHomeViewModel(): IHomeViewModel {
  const { isFetchingSeries, isLoadingSeries, hasNextPage, dataSeries, handleMoreDataMovie } = useMoviesClient()
  const [inputHeight, setInputHeight] = useState(20)
  const [searchMovieOrSerie, setSearchMovieOrSerie] = useState("")
  const { color } = useTheme()





  const handleHeightInput = (height: number) => setInputHeight(height + 7)



  return {
    inputHeight,
    handleHeightInput,
    setSearchMovieOrSerie,
    searchMovieOrSerie,
    isFetchingSeries,
    isLoadingSeries,
    hasNextPage,
    dataSeries,
    handleMoreDataMovie,
  }
}

