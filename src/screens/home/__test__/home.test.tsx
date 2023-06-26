import { Contants } from "@/utils/contants";
import HomeScreen from "../Home"
import { fireEvent, render } from "@/utils/test-utils";
import InputHome from "@/screens/home/components/input_home/InputHome";


describe('HomeScreen', () => {

  const height = 30
  const mockEvent = { nativeEvent: { contentSize: { height: 50 } } };
  const mockHandleHeightInput = jest.fn();

  it('should show the app home screen', () => {
    expect(render(<HomeScreen />)).toBeTruthy
  })



  it('should render image on top', () => {
    const { getByTestId } = render(<HomeScreen />)
    const element = getByTestId(Contants.testIdImageTopHomeScreen)

    expect(element.props.source.uri).toEqual("https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60")

  })



  it('should set the height of the input field correctly', () => {

    const { getByRole } = render(<InputHome height={20} onContentSizeChange={(e) => mockHandleHeightInput(e.nativeEvent.contentSize.height + 7)} />)
    const element = getByRole('search')
    fireEvent(element, 'onContentSizeChange', mockEvent)
    expect(mockHandleHeightInput).toBeCalledWith(57)

  })

  it('should set the height of the input field correctly', () => {

    const { getByRole } = render(<HomeScreen />)
    const element = getByRole('search')
    fireEvent(element, 'onContentSizeChange', mockEvent)
    expect(mockHandleHeightInput).toBeCalledWith(57)

  })




  it('should icon positioned in the middle of the input', () => {
    const { getByTestId } = render(<InputHome height={height} onContentSizeChange={(e) => mockHandleHeightInput(e.nativeEvent.contentSize.height + 7)} />)
    const element = getByTestId(Contants.testIdIconInputHome)
    expect(element.props.style[0].bottom).toEqual(height / 2 - 5)
    expect(element.props.style[0].top).toEqual(height / 2 - 5)

  })

  it('should the height that surrounds the icon and the input be the size passed to the component', () => {
    const { getByTestId } = render(<InputHome height={height} onContentSizeChange={(e) => mockHandleHeightInput(e.nativeEvent.contentSize.height + 7)} />)
    const element = getByTestId(Contants.testIdWrapperInputWithIcon)
    expect(element.props.style[0].height).toEqual(30)
  })



})
