import { renderHook } from '@testing-library/react-hooks'
import useSearchMoviesClient from '../search_movies_client'
import { mockMovies, mockSeries } from '@/mock/mock_data'
import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/services/query_client'
import { act } from 'react-test-renderer'

describe('SearchMoviesClient', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  it('should return date of type movieModel', async () => {
    const { result, waitFor } = renderHook(
      () => useSearchMoviesClient(),
      { wrapper }
    )

    await waitFor(() => {
      return result.current.isSuccess
    })

    act(() => {
      result.current.fetchSearchMovie('fastx')
    })

    //estou mocando o retorno da api usando msw
    //no arquivo handles tu pode ver mesma url e o retorno do  fetchSearchMovie mocado
    expect(result.current.data).toEqual(mockMovies)
  })

  it('should set the correct word as typed in the input', () => {
    const { result, waitFor } = renderHook(
      () => useSearchMoviesClient(),
      { wrapper }
    )

    act(() => {
      result.current.setNewWord('fast')
    })

    expect(result.current.word.current).toEqual('fast')
  })
})
