import { mockMovies } from '@/mock/mock_data'
import { renderHook, act } from '@testing-library/react-hooks'
import useMoviesClient, { fetchMovies } from '../movies_client'
import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../query_client'
import { Contants } from '@/utils/contants'
import { API_TOKEN } from '@env'


describe('SeriesClient', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

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

  //ver amnha https://jestjs.io/docs/mock-functions
  it('HandleMoreDataMovies should  add one to currentPageMovies variable if value is less than or equal to 5', async () => {
    const { result, waitFor } = renderHook(() => useMoviesClient(), {
      wrapper,
    })

    act(() => {
      result.current.currentPageMovies.current = 3
      result.current.handleMoreDataMovies()
    })

    expect(result.current.currentPageMovies.current).toBe(4)
  })

  it('handleMoreDataMovies should  not add one to currentPageMovies variable if value is more than or equal to 5', async () => {
    const { result } = renderHook(() => useMoviesClient(), {
      wrapper,
    })

    act(() => {
      result.current.currentPageMovies.current = 6
      result.current.handleMoreDataMovies()
    })

    expect(result.current.currentPageMovies.current).toBe(6)
  })

  it('should return correct data when do fetch on api', async () => {
    const data = await fetchMovies(1)
    expect(data).toEqual(mockMovies)
  })
})
