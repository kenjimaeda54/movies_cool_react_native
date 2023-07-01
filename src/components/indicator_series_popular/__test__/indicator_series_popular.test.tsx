import IndicatorSeriesPopular from '../IndicatorSeriesPopular'
import { fireEvent, render } from '@/utils/test-utils'
import { Contants } from '@/utils/contants'

describe('IndicatorSeriesPopular', () => {
  it('handleScroolOffest function should be called with index correct', () => {
    const handleScroolOffeset = jest.fn()

    const { getByTestId } = render(
      <IndicatorSeriesPopular
        activeIndex={2}
        index={3}
        onPress={() => handleScroolOffeset(3)}
      />
    )
    const element = getByTestId(
      `${Contants.testIdIndicatorsSeriesPopular}-${3}`
    )
    fireEvent.press(element)
    expect(handleScroolOffeset).toBeCalledWith(3)
  })
})
