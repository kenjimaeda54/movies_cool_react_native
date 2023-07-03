import { mockMovies, mockSeries } from '@/mock/mock_data'
import { Contants } from '@/utils/contants'
import { rest } from 'msw'

export const handlers = [
  rest.get(
    `${Contants.baseURLApi}/discover/movie`,
    (_, resp, ctx) => {
      return resp(ctx.status(200), ctx.json(mockMovies))
    }
  ),

  //os parametros opcionais ou seja query paramets podem ser acessados por req.url.searchParams se desejar
  //para nos o importante e que retorne o mock desse json é não qual a pagina,se esta ordenado ou não,filtrado e por ai vai 
  rest.get(
   `${Contants.baseURLApi}/discover/tv`,
    (_, resp, ctx) => {
      return resp(ctx.status(200), ctx.json(mockSeries))
    }
  ),
]
