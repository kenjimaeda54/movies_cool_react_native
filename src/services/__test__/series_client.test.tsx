import nock from 'nock'
import { mockSeries } from '@/mock/mock_data'
import { renderHook } from '@testing-library/react-hooks'
import useMoviesClient from '../movies_client'
import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../query_client'
import { act } from 'react-test-renderer'
import useSeriesClient, { fetchSeries } from '../series_client'

describe('SeriesClient', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  beforeAll(() => {
    nock('https://api.themoviedb.org/3', {
      reqheaders: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjAzYmY5NWYyYzA4ZmVlYmIxMWIzYjZmYmMxZTRkOCIsInN1YiI6IjY0ODlhZmY1OTkyNTljMDBlMmY3NjE5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.26KU_696lSCwm-Giq2c7Yo5FqC8tRCZQlioZ8iKx1uM',
      },
    }).get(
      `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc`
    )
  })

  it('should perfom request on the correct url if the current page is less or equal than 5', async () => {
    const { result, waitFor } = renderHook(() => useSeriesClient(), {
      wrapper,
    })

    await waitFor(() => {
      result.current.isSucessSeries
    })

    act(() => {
      result.current.currentPageSeries.current = 3
      result.current.fetchPageSeries(mockSeries)
    })

    expect(result.current.fetchPageSeries(mockSeries)).toEqual(
      `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${result.current.currentPageSeries.current}&sort_by=popularity.desc`
    )
  })

  it('should return old object if current  page is greater than 5', async () => {
    const { result, waitFor } = renderHook(() => useSeriesClient(), {
      wrapper,
    })

    await waitFor(() => {
      result.current.isSucessSeries
    })

    act(() => {
      result.current.currentPageSeries.current = 11
      result.current.fetchPageSeries(mockSeries)
    })

    expect(result.current.fetchPageSeries(mockSeries)).toEqual(
      mockSeries
    )
  })

  it('should handleMoreDataSeries function call fetchNextPageSeries function', async () => {
    const { result } = renderHook(() => useSeriesClient(), {
      wrapper,
    })

    act(() => {
      result.current.handleMoreDataSeries()
    })

    expect(result.current.fetchNextPageSeries()).toBeDefined()
  })

  it('handleMoreDataSeries should  add one to currentPageMovies variable if value is less than or equal to 5', async () => {
    const { result } = renderHook(() => useSeriesClient(), {
      wrapper,
    })

    act(() => {
      result.current.currentPageSeries.current = 3
      result.current.handleMoreDataSeries()
    })

    expect(result.current.currentPageSeries.current).toBe(4)
  })

  it('handleMoreDataSeries should  not add one to currentPageMovies variable if value is more than or equal to 5', async () => {
    const { result } = renderHook(() => useSeriesClient(), {
      wrapper,
    })

    act(() => {
      result.current.currentPageSeries.current = 6
      result.current.handleMoreDataSeries()
    })

    expect(result.current.currentPageSeries.current).toBe(6)
  })

  it('should return correct data when do fetch on api', async () => {
    const data = await fetchSeries(1)
    expect(data).toEqual(mockSeries)
  })
})
