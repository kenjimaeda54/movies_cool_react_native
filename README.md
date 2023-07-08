# Filmes é Series
Com este aplicativo a pessoa pode consultar filmes é series, na tela inicial possui uma lista fornecidada pelo API,porém e possivel pesquisar por qualquer um que deseja</br>
Na tela de detalhes consegue visualizar a quantidade de likes,overview


## Feature
_ Trabalhei com testes para reforçar uma defiencia minha, precisei usar [msw](https://mswjs.io/docs/) para mocar minhas requisições e [render hooks](https://react-hooks-testing-library.com/reference/api) para lidar com meus hooks customizados
- Usei bastante hooks customizados pois arquitetura foi MVVM, então havia camadas de useViewModel e para requisiçõesõ camadas de useClient
- Abaxio um bolerplate como usar msw
- Para configuração abaixo funcionar precisei fazer umas alterações la na configuração do packjson pra teste
- No packsjon declarei em setupFilesAfterEnv o arquivo correpondente a nossa configuração
- SetupFilesAfterEnv ele roda sempre antes de subir nossas env para teste
- Usei o react query pra as camadas services, tive um pequena dificuldade pode consultar por [aqui](//https://tanstack.com/query/v4/docs/react/guides/testing)
- Detalhei eu não usei nock como esta no exemplo da documentação

```typescript

// crio minha camada de handlers
// não prequiso passar as query parametros nas url,pois e considerado redudante

// arquivo handlers
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
  rest.get(`${Contants.baseURLApi}/discover/tv`, (_, resp, ctx) => {
    return resp(ctx.status(200), ctx.json(mockSeries))
  }),

  rest.get(`${Contants.baseURLApi}/discover/tv`, (_, resp, ctx) => {
    return resp(ctx.status(200), ctx.json(mockSeries))
  }),

  rest.get(`${Contants.baseURLApi}/search/movie`, (_, resp, ctx) => {
    return resp(ctx.status(200), ctx.json(mockMovies))
  }),

  rest.get(`${Contants.baseURLApi}/search/tv`, (_, resp, ctx) => {
    return resp(ctx.status(200), ctx.json(mockSeries))
  }),
]

// faço o setup

//arquivo server 
import { setupServer } from 'msw/node'
import {handlers} from '@/test/server/handlers'
 


 export const server = setupServer(...handlers)


//faço o listener para meus setup
import { server } from './server/server'

 
beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())


// packjson
 "jest": {
    "preset": "react-native",
    "collectCoverage": true,
    "testEnvironment": "node",
    "setupFiles": [
      "./jestSetupFile.js"
    ],
    "globals": {
      "ts-jest": {
        "isolatedModules": false
      }
    },
    "collectCoverageFrom": [
      "./src/screens/**",
      "./src/components/**",
      "./src/services/**"
    ],
    "moduleDirectories": [
      "node_modules"
    ],
    "modulePathIgnorePatterns": [
      "mocks"
    ],
    "transformIgnorePatterns": [
      "node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)"
    ],
    "coverageReporters": [
      "html"
    ],
    "setupFilesAfterEnv": [
      "@testing-library/jest-native/extend-expect",
      "./src/test/setup-env.js"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }




// depois de mocado simplemente chama sua requisição normalmente, retorno sera o declarado no handles


// usando

// no arquivos de services


 it('should perfom request on the correct url if the current page is less or equal than 5', async () => {
    const { result, waitFor } = renderHook(() => useMoviesClient(), {
      wrapper,
    })

    await waitFor(() => {
      result.current.isSuccessMovies
    })

    act(() => {
      result.current.currentPageMovies.current = 3
      result.current.fetchPageMovies(mockMovies)
    })

    expect(result.current.fetchPageMovies(mockMovies)).toEqual(
      `/discover/movie?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${result.current.currentPageMovies.current}&sort_by=popularity.desc`
    )
  })

  // eu sei que o retorno de fetchPageMovies sera mockMovies porque esta declarado no arquivo de handlers
  // quando faço meu fetch ocorre internamente um mock pelo msw
  it('should return old object if current  page is greater than 5', async () => {
    const { result, waitFor } = renderHook(() => useMoviesClient(), {
      wrapper,
    })

    await waitFor(() => {
      result.current.isSuccessMovies
    })

    act(() => {
      result.current.currentPageMovies.current = 11
      result.current.fetchPageMovies(mockMovies)
    })

    expect(result.current.fetchPageMovies(mockMovies)).toEqual(
      mockMovies
    )
  })


```

##
- Para gerar o cover de nossos testes usei html, então precisei declarar na configuração do jest dentro de coverageReporters
- Tambem precisei delcasr em collectCoverasgeFrom os arquivos que desejo que gere o cover, todos os teste front end, estamos preocupados em testar a inteiração do usario , não metodos de implmentaçãop, então o cover sera apenasa de screens,componentes,services
- A camada View Model e apenas uma layer que trabalha entre a view e a model, ela mode futuramente houver varias mudanças sem impactar a view em si, então não me preocupei com o cover neste caso
- Se discorda da minha visão não e um problema,mas leia antes este [artigo](https://kentcdodds.com/blog/testing-implementation-details)
- E possivel na configuração do jest pedir para ignorar certos paternes eu coloquei o mocks, que são arquivos que vou gerar para  simular retonro da API


 ``` json
{
"jest": {
    "preset": "react-native",
    "collectCoverage": true,
    "testEnvironment": "node",
    "setupFiles": [
      "./jestSetupFile.js"
    ],
    "globals": {
      "ts-jest": {
        "isolatedModules": false
      }
    },
    "collectCoverageFrom": [
      "./src/screens/**",
      "./src/components/**",
      "./src/services/**"
    ],
    "moduleDirectories": [
      "node_modules"
    ],
    "modulePathIgnorePatterns": [
      "mocks"
    ],
    "transformIgnorePatterns": [
      "node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)"
    ],
    "coverageReporters": [
      "html"
    ],
    "setupFilesAfterEnv": [
      "@testing-library/jest-native/extend-expect",
      "./src/test/setup-env.js"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }
}
```

## 
- Para criar listas infitas usando react query com react native e muito simples abaixo uma logica que implmentei e diminui muito o bolerplate
- Reapara que pra paginar usei o useRef e não useState e o hasNext do react query esta na propria implementaçãoã da service isso ajuda muito na performance


```typescript
// na camada service crio uma logica pra saber a pagina atual e fazer mais requisição

import { MoviesModel } from '@/models/movies_model'
import api from '@/services/api'
import { Contants } from '@/utils/contants'
import {
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { MutableRefObject, useRef, useState } from 'react'

export interface IUseMoviesClient {
  dataMovies: InfiniteData<MoviesModel>
  isFetchingMovies: boolean
  handleMoreDataMovies: () => void
  isSuccessMovies: boolean
  currentPageMovies: MutableRefObject<number>
  fetchPageMovies: (discover: MoviesModel) => void
  fetchMovies: (currentPage: number) => Promise<MoviesModel>
}

export async function fetchMovies(currentPage: number) {
  const response = await api.get(
    `/discover/movie?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPage}&sort_by=popularity.desc`
  )
  return response.data as MoviesModel
}

export default function useMoviesClient(): IUseMoviesClient {
  let currentPageMovies = useRef(1)

  function fetchPageMovies(discover: MoviesModel) {
    if (currentPageMovies.current <= 5) {
      return `/discover/movie?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${currentPageMovies.current}&sort_by=popularity.desc`
    }

    return discover
  }

  const {
    data: dataMovies = {} as InfiniteData<MoviesModel>,
    hasNextPage = true,
    isFetching: isFetchingMovies,
    isSuccess: isSuccessMovies,
    fetchNextPage: fetchPagesMovies,
  } = useInfiniteQuery(
    [Contants.keyReactQuerySerie],
    () => fetchMovies(currentPageMovies.current),
    {
      getNextPageParam: fetchPageMovies,
    }
  )

  function handleMoreDataMovies() {
    if (hasNextPage && currentPageMovies.current <= 5) {
      currentPageMovies.current += 1
      fetchPagesMovies()
    }
  }

  return {
    isFetchingMovies,
    dataMovies,
    handleMoreDataMovies,
    isSuccessMovies,
    fetchPageMovies,
    currentPageMovies,
    fetchMovies,
  }
}


//a camada view foi apenas uma layer de abstração poderia colocar direto na view , mas não e aconselhavel usando MVVM


//no arquivo useHomeViewModel
export default function useHomeViewModel(): IHomeViewModel {

 const {
    isFetchingSeries,
    dataSeries,
    handleMoreDataSeries,
    isSucessSeries,
  } = useSeriesClient()


  return {
    isFetchingSeries,
    dataSeries,
    handleMoreDataSeries,
    isSucessSeries
  }

}

// na view e bem simples
   <SectionList
       isSuccess={isSucessSeries}
       testID={Contants.testIdSectionListSeriesMovies}
       titleSection='Series'
       renderDetails={({ item }) => (
            <RenderItemSeries
                    item={item}
                    handleNavigationSeries={handleNavigationSeries}
                  />
              )}
        data={dataSeries.pages
                  ?.map((page) => page.results)
                  .flat()}
        onEndReached={handleMoreDataSeries}
        ListFooterComponent={
                  <FooterComponent showComponent={isFetchingMovies} />
                }
    />



```

##

- Eu estou usando a FlahsList do react native que eu m pacote que otimiza a flatlist, para testar ela precisamo mocar o layout
- Os itens são renderizados de forma lazy e assim o teste pode falahar , [consulte aqui para mais detalhes](https://shopify.github.io/flash-list/docs/testing)
- Abaixo tem dois exemplos com uso do fireEvent um e para simular o layout e o outro o evento onContentSizeChange
- onContentSizeChange e um evento que uso pra deixar o campo do input de forma dinamica, gerando assim uma sensação melhor para usaurio

``` typescript
describe('SectionList', () => {
 const renderDetails = ({ item }: { item: SeriesResults }) => {
    return <Text>{item.name}</Text>
  }

  const mockEvent = {
    nativeEvent: {
      layout: {
        width: 1000,
        height: 350,
      },
    },


   it('SectionList should render items with data', () => {
    const { getByText, getByTestId } = render(
      <SectionList
        isSuccess={true}
        data={mockSeries.results}
        titleSection={''}
        renderDetails={renderDetails}
      />
    )
    const element = getByTestId(Contants.testIdSeriesMoviesItem)
    fireEvent(element, 'layout', mockEvent)
    expect(getByText('Voltes')).toBeTruthy()
    expect(getByText('Voltes V')).toBeTruthy()
  })

}


// outro exemplo de uso do fireEvent
// repara que o tamanho sera 57, porque para jest saber o tamanho do contentSize precisei mocar e coloquei 50

  const mockHandleHeightInput = jest.fn()

    const mockEventContentSize = {
    nativeEvent: { contentSize: { height: 50 } },
  }

  it('should set the height of the input field correctly', () => {
    const { getByRole } = render(
      <InputHome
        height={20}
        onContentSizeChange={(e) =>
          mockHandleHeightInput(e.nativeEvent.contentSize.height + 7)
        }
      />
    )
    const element = getByRole('search')
    fireEvent(element, 'onContentSizeChange', mockEventContentSize)
    expect(mockHandleHeightInput).toBeCalledWith(57)
  })


```

### 

- Dicas simples qeu salava muiot, para quebrar linhas em texto podemos usar numberOfLines={1}
- Se preciso que um texto tenha 3 linhas e so colcar numberOfLines={3} e qquadno não ouver mais espaço ficara 3 dots
- Para realizar o input de forma danamica todo o estilo fica na vieww, o input fica apenas o estilo de texto e altura
- Padding altura dinamica fica tudo na view



```typescript

// view de input dinamico

export default function InputHome({
  height,
  ...rest
}: IInputHomeProops) {
  const { color } = useTheme()
  return (
    <Styles.viewInput>
      <Styles.viewOffsetHeight
        testID={Contants.testIdWrapperInputWithIcon}
        height={height}>
        <Styles.prefix
          testID={Contants.testIdIconInputHome}
          height={height}>
          <Evillcons
            name='search'
            size={23}
            color={color.grayLight}
          />
        </Styles.prefix>
        <Styles.input
          height={height}
          {...rest}
          multiline
          returnKeyType='search'
          accessibilityRole='search'
          placeholderTextColor={color.grayLight}
        />
      </Styles.viewOffsetHeight>
    </Styles.viewInput>
  )
}


//estilo 
export const viewOffsetHeight = styled.View<IVieOffeset>`
  height: ${({ height }) => height}px;
  position: relative;
  padding: 20px 0px;
  justify-content: center;
  padding-left: 55px;
  padding-right: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.grayLight};
  border-radius: 20px;
`

export const input = styled.TextInput<IVieOffeset>`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 17px;
  line-height: 21px;
  color: ${({ theme }) => theme.color.grayLight};
`





```




  

 
