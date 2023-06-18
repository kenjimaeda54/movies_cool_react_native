import { render } from "@testing-library/react-native"
import CardApresentationMovie from "../ListSeriesPopular"
import { mock } from "@/mock/mock_data"
import ListSereisPopular from "../ListSeriesPopular";
import { FlatList } from "react-native";
import { Contants } from "@/utils/contants";

describe('ListSeriesPopular', () => {


  it('should render all elements', () => {
    const { getByTestId } = render(<ListSereisPopular data={mock.results} />)
    const element = getByTestId(Contants.testIdSeriesPopular)
    expect(element.props.data.length).toEqual(mock.results.length)
  });


})
