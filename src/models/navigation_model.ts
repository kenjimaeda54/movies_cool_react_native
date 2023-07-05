import { MoviesResults } from './movies_model'
import { SeriesResults } from './series_model'

export interface NavigationModel {
  home: undefined
  details: {
    item: SeriesResults | MoviesResults // com a barra | era mandar apenas oque tem em comum em ambos, assim efita usarmos propriedades quen não são comuns
    title: string // para conseguir o title precisei mandar tambem em rotas, pois acima so ira oque e comum
  }
}
