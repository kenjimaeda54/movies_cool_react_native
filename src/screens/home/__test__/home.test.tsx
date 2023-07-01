import { Contants } from '@/utils/contants'
import HomeScreen, {
  FooterComponent,
  renderItemMovies,
  renderItemSeries,
} from '@/screens/home/Home'
import { fireEvent, render } from '@/utils/test-utils'
import InputHome from '@/screens/home/components/input_home/InputHome'
import SectionList from '@/components/section_list/SectionList'
import { Text } from 'react-native'
import { SeriesModel, SeriesResults } from '@/models/series_model'
import { MoviesResults } from '@/models/movies_model'
import { renderHook } from '@testing-library/react-hooks'
import { ReactNode } from 'react'
import {
  InfiniteData,
  QueryClientProvider,
} from '@tanstack/react-query'
import { queryClient } from '@/services/query_client'
import useSeriesClient from '@/services/series_client'
import nock from 'nock'
import { resultsDataSeries } from '@/mock/mock_implementation_data_series'

describe('HomeScreen', () => {
  const mockEventContentSize = {
    nativeEvent: { contentSize: { height: 50 } },
  }
  const mockHandleHeightInput = jest.fn()
  let isFetchingSeries = false
  let handleMoreDataSeries = jest.fn()

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
          isFetchingSeries ? <FooterComponent /> : null
        }
      />
    )
    const element = getByTestId(Contants.testIdSeriesMoviesItem)
    fireEvent(element, 'layout', mockEventLayout)
    expect(getByText('Series 1')).toBeTruthy()
    expect(getByText('Series 110')).toBeTruthy()
  })

  it('should render FooterComponent when isFetchingSeries is true', () => {
    isFetchingSeries = true
    const { getByTestId } = render(
      <SectionList
        titleSection='Series'
        isSuccess={true}
        renderDetails={({ item }) => (
          <Text accessibilityRole='text'>{item.name}</Text>
        )}
        data={dataSeries.pages?.map((page) => page.results).flat()}
        onEndReached={handleMoreDataSeries}
        ListFooterComponent={
          isFetchingSeries ? <FooterComponent /> : null
        }
      />
    )
    const element = getByTestId(
      Contants.testIdSectionListSeriesMovies
    )
    expect(element.props.ListFooterComponent).not.toBeNull()
  })

  it('should not render FooterComponent when isFetchingSeries is false', () => {
    isFetchingSeries = false
    const { getByTestId } = render(
      <SectionList
        titleSection='Series'
        isSuccess={true}
        renderDetails={({ item }) => (
          <Text accessibilityRole='text'>{item.name}</Text>
        )}
        data={dataSeries.pages?.map((page) => page.results).flat()}
        onEndReached={handleMoreDataSeries}
        ListFooterComponent={
          isFetchingSeries ? <FooterComponent /> : null
        }
      />
    )
    const element = getByTestId(
      Contants.testIdSectionListSeriesMovies
    )
    expect(element.props.ListFooterComponent).toBeNull()
  })

  it('should render the movie image and title correctly', () => {
    const item = {
      backdrop_path:
        'https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=365&q=80',
      original_title: 'Fast X',
    } as MoviesResults
    const { getByTestId, getByText } = render(
      renderItemMovies({ item })
    )
    const imageId = getByTestId(Contants.testIdImageMoviesHome)
    expect(imageId.props.source.uri).toBe(
      `${Contants.baseUrlImage}/https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=365&q=80`
    )
    expect(getByText('Fast X')).toBeTruthy()
  })

  it('should render the series image and title correctly', () => {
    const item = {
      backdrop_path:
        'https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=365&q=80',
      name: 'Simpsons',
    } as SeriesResults
    const { getByTestId, getByText } = render(
      renderItemSeries({ item })
    )
    const imageId = getByTestId(Contants.testIdImageSeriesHome)
    expect(imageId.props.source.uri).toBe(
      `${Contants.baseUrlImage}/https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=365&q=80`
    )
    expect(getByText('Simpsons')).toBeTruthy()
  })

  it('should does not render series section wwhen data is null', () => {
    const dataSeries = {
      pages: null,
    } as unknown as InfiniteData<SeriesModel>
    const { debug } = render(
      <SectionList
        titleSection='Series'
        isSuccess={true}
        renderDetails={({ item }) => (
          <Text accessibilityRole='text'>{item.name}</Text>
        )}
        data={dataSeries.pages?.map((page) => page.results).flat()}
        onEndReached={handleMoreDataSeries}
        ListFooterComponent={
          isFetchingSeries ? <FooterComponent /> : null
        }
      />
    )
  })
})
