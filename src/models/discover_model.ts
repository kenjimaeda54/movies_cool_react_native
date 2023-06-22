
export interface DiscoverModel {
  page: number
  results: Array<DiscoverResults>
}

export interface DiscoverResults {
  "backdrop_path": string,
  "first_air_date": string,
  "genre_ids": Array<number>,
  "id": number,
  "name": string,
  "origin_country": Array<string>,
  "original_language": string,
  "original_name": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "vote_average": number,
  "vote_count": number
}