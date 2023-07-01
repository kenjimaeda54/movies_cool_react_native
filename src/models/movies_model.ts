export interface MoviesModel {
  page: number
  results: Array<MoviesResults>
}

export interface MoviesResults {
  backdrop_path: string
  genre_ids: Array<number>
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}
