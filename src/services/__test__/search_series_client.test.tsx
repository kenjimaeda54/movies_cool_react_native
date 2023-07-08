import { renderHook } from '@testing-library/react-hooks'
import { mockSeries } from '@/mock/mock_data'
import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/services/query_client'
import { act } from 'react-test-renderer'
import useSearchSeriesClient from '@/services/search_series_client'

describe('SearchSeriesClient', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  it('should return date of type movieModel', async () => {
    const { result, waitFor } = renderHook(
      () => useSearchSeriesClient(),
      { wrapper }
    )

    await waitFor(() => {
      return result.current.isSuccess
    })

    act(() => {
      result.current.fetchSearchSeries('Amor Perfeito')
    })


    expect(result.current.data).toEqual(mockSeries)
  })

  it('should set the correct word as typed in the input', () => {
    const { result } = renderHook(() => useSearchSeriesClient(), {
      wrapper,
    })

    act(() => {
      result.current.setNewWord('Amor Perfeito')
    })

    expect(result.current.word.current).toEqual('Amor Perfeito')
  })
})
