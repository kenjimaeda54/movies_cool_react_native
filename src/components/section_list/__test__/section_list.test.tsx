import { fireEvent, render } from '@/utils/test-utils'
import SectionList from '@/components/section_list/SectionList'
import { Text } from 'react-native'
import { mockSeries } from '@/mock/mock_data'
import { SeriesResults } from '@/models/series_model'
import { Contants } from '@/utils/contants'

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
  }

  //estamos usando flashlist ele renderiza apenas o primeiro item o restante são lazy
  //para garantir renderizar oo restante precisamos estimar o estimatedListSize
  //uma possibilidade é fazer um triger no onLayout envent
  //https://shopify.github.io/flash-list/docs/testing
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

  it('should show the  section title correctly', () => {
    const { getByText } = render(
      <SectionList
        isSuccess={true}
        data={mockSeries.results}
        titleSection={'Series'}
        renderDetails={renderDetails}
      />
    )
    const text = getByText('Series')
    expect(text).toBeTruthy()
  })

  it('should render empty component when data length equal 0', () => {
    const { getByText } = render(
      <SectionList
        isSuccess={true}
        data={[]}
        titleSection={'Series'}
        renderDetails={renderDetails}
      />
    )
    const text = getByText('Não tem nada de novo aqui')
    expect(text).toBeTruthy()
  })
})
