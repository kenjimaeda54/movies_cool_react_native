import { Text } from 'react-native'
import { renderHook } from '@testing-library/react-hooks'
import { Contants } from '@/utils/contants'
import HomeScreen, {
  FooterComponent,
  RenderItemMovies,
  RenderItemSearchMovieOrSerie,
  RenderItemSeries,
  RenderSectionOrList,
} from '@/screens/home/Home'
import { cleanup, fireEvent, render } from '@/utils/test-utils'
import InputHome from '@/screens/home/components/input_home/InputHome'
import SectionList from '@/components/section_list/SectionList'
import { SeriesResults } from '@/models/series_model'
import { MoviesResults } from '@/models/movies_model'
import useHomeViewModel, {
  ISearchMoviesSeries,
} from '@/view_models/home_view_model'
import { act } from 'react-test-renderer'
import React, { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/services/query_client'
import { GenericMovieSeriesModel } from '@/models/generic_movie_series_model'
import { returnOverview } from '@/utils/return_overview_utils'

describe('HomeScreen', () => {
  afterEach(cleanup)
  //para resolver este erro
  //ReferenceError: You are trying to `import` a file after the Jest environment has been torn down

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  const mockEventContentSize = {
    nativeEvent: { contentSize: { height: 50 } },
  }

  const mockHandleHeightInput = jest.fn()
  let isFetchingSeries = false
  let handleMoreDataSeries = jest.fn()

  const itemSeries = {
    backdrop_path:
      'https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=365&q=80',
    name: 'Simpsons',
  } as SeriesResults

  const itemMovies = {
    backdrop_path:
      'https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=365&q=80',
    original_title: 'Fast X',
  } as MoviesResults

  const itemGenerics = {
    photo:
      'https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=365&q=80',
    title: 'Fast X',
  } as GenericMovieSeriesModel

  const setNewTypeSearch = {
    typeSearchApi: 'filmes',
    typeSearchSelected: 'filmes',
    value: 'Fastx',
  } as ISearchMoviesSeries

  let dataSeries = {
    pages: [
      {
        results: [
          { id: 1, name: 'Series 1' },
          { id: 2, name: 'Series 110' },
        ],
      },
    ],
  }

  //ja que estamos mokando o tamanho da view pode gerar alguns bugs
  //para renderizar dois elementos em relação a view precisei diminuir width para 100
  //nossa flatslist e horizontal
  const mockEventLayout = {
    nativeEvent: {
      layout: {
        width: 100,
        height: 350,
      },
    },
  }

  it('should show the app home screen', () => {
    expect(render(<HomeScreen />)).toBeTruthy
  })

  it('should render image on top', () => {
    const { getByTestId } = render(<HomeScreen />)
    const element = getByTestId(Contants.testIdImageTopHomeScreen)

    expect(element.props.source.uri).toEqual(
      'https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60'
    )
  })

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

  it('should set the height of the input field correctly', () => {
    const { getByRole } = render(<HomeScreen />)
    const element = getByRole('search')
    fireEvent(element, 'onContentSizeChange', mockEventContentSize)
    expect(mockHandleHeightInput).toBeCalledWith(57)
  })

  //https://dev.to/dvddpl/jest-testing-like-a-pro-tips-and-tricks-4o6f
  it('renders SectionList with data', () => {
    const { getByTestId, getByText } = render(
      <SectionList
        titleSection='Series'
        isSuccess={true}
        renderDetails={({ item }) => (
          <Text accessibilityRole='text'>{item.name}</Text>
        )}
        data={dataSeries.pages?.map((page) => page.results).flat()}
        onEndReached={handleMoreDataSeries}
        ListFooterComponent={
          isFetchingSeries ? (
            <FooterComponent showComponent={false} />
          ) : null
        }
      />
    )
    const element = getByTestId(Contants.testIdSeriesMoviesItem)
    fireEvent(element, 'layout', mockEventLayout)
    expect(getByText('Series 1')).toBeTruthy()
    expect(getByText('Series 110')).toBeTruthy()
  })

  //temos uma condicional para verificar
  it('should view occupy all available space', () => {
    const mockReturnCapitalize = jest.fn()
    const { getByTestId } = render(
      <RenderSectionOrList
        conditional={true}
        returnCapitalize={mockReturnCapitalize}
        titleMoviesOrSeries={''}
        genericMovieSeries={[]}>
        <Text>children</Text>
      </RenderSectionOrList>
    )
    const view = getByTestId(
      Contants.testIdViewContainerRenderItemSearchOrMovie
    )
    expect(view).toBeDefined()
  })

  it('should select series when click series button', () => {
    const { result } = renderHook(() => useHomeViewModel(), {
      wrapper,
    })

    act(() => {
      result.current.handleSearchTypeSeries()
    })

    expect(result.current.typeSearchApi.typeSearchSelected).toBe(
      'series'
    )
  })

  it('should select movies when click movies button', () => {
    const { result } = renderHook(() => useHomeViewModel(), {
      wrapper,
    })

    act(() => {
      result.current.handleSearchTypeMovie()
    })

    expect(result.current.typeSearchApi.typeSearchSelected).toBe(
      'filmes'
    )
  })

  it('should render  children on FooterComponent when isFetchingSeries is true', () => {
    isFetchingSeries = true
    const { getByTestId } = render(
      <FooterComponent showComponent={isFetchingSeries} />
    )
    const element = getByTestId(Contants.testIdFooterComponentHome)
    expect(element.children.length).toBe(1)
  })

  it('should not render children on component FooterComponent when isFetchingSeries is false', async () => {
    isFetchingSeries = false
    const { getByTestId } = render(
      <FooterComponent showComponent={isFetchingSeries} />
    )
    const element = getByTestId(Contants.testIdFooterComponentHome)
    expect(element.children.length).toBe(0) //uma maneira de testar se o container tem filhos
  })

  it('should render the movie image and title correctly', () => {
    const { getByTestId, getByText } = render(
      <RenderItemMovies
        item={itemMovies}
        handleNavigationMovies={() => {}}
      />
    )
    const imageId = getByTestId(Contants.testIdImageMoviesHome)
    expect(imageId.props.source.uri).toBe(
      `${Contants.baseUrlImage}/https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=365&q=80`
    )
    expect(getByText('Fast X')).toBeTruthy()
  })

  it('should render the series image and title correctly', () => {
    const { getByTestId, getByText } = render(
      <RenderItemSeries
        item={itemSeries}
        handleNavigationSeries={() => {}}
      />
    )
    const imageId = getByTestId(Contants.testIdImageSeriesHome)
    expect(imageId.props.source.uri).toBe(
      `${Contants.baseUrlImage}/https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=365&q=80`
    )
    expect(getByText('Simpsons')).toBeTruthy()
  })

  it('should render the search item  image and title correctly', () => {
    const { getByTestId, getByText } = render(
      <RenderItemSearchMovieOrSerie item={itemGenerics} />
    )
    const imageId = getByTestId(
      Contants.testIdImageItemSearchSeriesOrMovie
    )
    expect(imageId.props.source.uri).toBe(
      `${Contants.baseUrlImage}/https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=365&q=80`
    )
    expect(getByText('Fast X')).toBeTruthy()
  })

  it('should render the item overview   component RenderItemSearchMovieOrSerie', () => {
    const mockOverview = jest.fn()
    const overView =
      'Depois de escapar da morte por um triz, o mercenário Tyler Rake encara mais uma missão perigosa: resgatar a família de um criminoso implacável.'
    render(<RenderItemSearchMovieOrSerie item={itemGenerics} />)
    mockOverview.mockReturnValueOnce(returnOverview(overView))

    expect(mockOverview()).toBe(
      'Depois de escapar da morte por um triz, o mercenário Tyler Rake encara mais uma missão perigosa: resgatar a família de um criminoso implacável.'
    )
  })

  it('should return a standard message if it does not have an overview component RenderItemSearchMovieOrSerie', () => {
    const mockOverview = jest.fn()
    const overView = ''
    render(<RenderItemSearchMovieOrSerie item={itemGenerics} />)
    mockOverview.mockReturnValueOnce(returnOverview(overView))

    expect(mockOverview()).toBe(
      'Não existe uma descrição para esta serie ou filme'
    )
  })

  it('should called with itens correct when press handleNavigationMovies', () => {
    const mockHandleNavigation = jest.fn()
    const { getByTestId } = render(
      <RenderItemMovies
        item={itemMovies}
        handleNavigationMovies={mockHandleNavigation}
      />
    )
    const button = getByTestId(
      Contants.testIdTouchAbleOpacityRenderItemMovies
    )
    fireEvent.press(button)
    expect(mockHandleNavigation).toBeCalledTimes(1) //maneira de testar se o botão esta sendo chamado
  })

  it('should called with itens correct when press handleNavigationSeries', () => {
    const mockHandleNavigation = jest.fn()
    const { getByTestId } = render(
      <RenderItemSeries
        item={itemSeries}
        handleNavigationSeries={mockHandleNavigation}
      />
    )
    const button = getByTestId(
      Contants.testIdTouchAbleOpacityRenderItemSeries
    )
    fireEvent.press(button)
    expect(mockHandleNavigation).toBeCalledTimes(1) //maneira de testar se o botão esta sendo chamado
  })
})
