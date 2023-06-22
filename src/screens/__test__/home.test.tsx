import { Contants } from "@/utils/contants";
import HomeScreen from "../home/Home"
import { render } from "@/utils/test-utils";
import { mock } from "@/mock/mock_data";
import useHomeViewModel from "@/view_models/home_view_model";
import { act } from "react-test-renderer";


describe('HomeScreen', () => {

  it('should show the app home screen', () => {
    expect(render(<HomeScreen />)).toBeTruthy
  })



  it('should render image on top', () => {
    const { getByTestId } = render(<HomeScreen />)
    const element = getByTestId(Contants.testIdImageTopHomeScreen)

    expect(element.props.source.uri).toEqual("https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60")

  })

  it('should have the title of the section popular series', () => {
    const { getByText } = render(<HomeScreen />)
    const text = getByText(/Series/ig)
    expect(text).toBeTruthy()

  })

  it('should show the number of indicators equal to the number of items section popular series', () => {
    const { getAllByRole } = render(<HomeScreen />)
    const id = getAllByRole('button')
    expect(id).toHaveLength(mock.results.length)

  })





})
