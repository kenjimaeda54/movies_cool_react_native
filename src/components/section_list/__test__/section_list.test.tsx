import { Text } from "react-native"
import SectionList from "@/components/section_list/SectionList"
import { mock } from "@/mock/mock_data"
import { fireEvent, render } from "@/utils/test-utils"

describe('SectionList', () => {

  const handleScroolOffset = jest.fn()

  it('should render the children prop correctly', () => {
    const children = <Text>Test children</Text>
    const { getByText } = render(<SectionList children={children} data={mock} titleSection="Series" activeIndex={0} handleScroolOffset={handleScroolOffset} />)
    const text = getByText(/Test children/ig)
    expect(text).toBeTruthy()

  })

  it('HandleScroolOffset function should be  called with index correct', () => {
    const children = <Text>Test children</Text>
    const { debug, getAllByRole } = render(<SectionList children={children} data={mock} titleSection="Series" activeIndex={0} handleScroolOffset={() => handleScroolOffset(3)} />)
    const button = getAllByRole("button")
    fireEvent.press(button[0])
    expect(handleScroolOffset).toBeCalledWith(3)

  })


})