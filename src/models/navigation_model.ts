import {  MoviesResults } from "./movies_model"
import {   SeriesResults } from "./series_model"

export interface NavigationModel {
  home: undefined
  details: {
    item: SeriesResults | MoviesResults
  }
}
