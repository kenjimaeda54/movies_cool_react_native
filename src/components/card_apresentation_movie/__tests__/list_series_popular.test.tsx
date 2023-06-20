import { mock } from "@/mock/mock_data"
import ListSereisPopular from "../ListSeriesPopular";
import { Contants } from "@/utils/contants";
import { render } from "@/utils/test-utils";





const item = {
  backdrop_path: "https://plus.unsplash.com/premium_photo-1682965455471-07caac97f1ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80", // backdrop_path precisa exister como um item da nossa arvore ou seja precisa ser igual ao series_models
  name: "Love and passion",
  vote_average: 5,
}


describe('ListSeriesPopular', () => {


  it('should renders a FlatList with the correct data', () => {
    const { getByTestId, getAllByTestId } = render(<ListSereisPopular data={mock.results} />)
    const element = getByTestId(Contants.testIdSeriesPopular)
    const items = getAllByTestId(Contants.testIdSeriesItem);
    expect(element.props.data).toEqual(mock.results)
    expect(items.length).toEqual(mock.results.length)
  });

  it('should render EmptyCompoent when dont have data', () => {
    const { getByText } = render(<ListSereisPopular data={[]} />) // aqui estou testando ListEmptyComponent
    const text = getByText(/Não tem nada de novo aqui/i)
    expect(text).toBeTruthy()


  });



  it('should renders the correct name,img', () => {
    const { getByTestId } = render(<ListSereisPopular data={mock.results} />)
    const itemId = getByTestId(Contants.testIdSeriesPopular)

    const { getByText, getByTestId: getByTestIdItem } = render(itemId.props.renderItem({ item }))
    const name = getByText(/Love and passion/i) //love em passion sera inserido dentro do renderItem da nossa flatlist,assim não me preocupo com que de fato esta renderizando la , so com nossa abstração
    //se dentro de item não possuir Love and passion ira dar erro
    const image = getByTestIdItem(Contants.testIdImageSeriesPopular)
    expect(name).toBeTruthy()
    expect(image.props.source.uri).toEqual(`${Contants.baseUrlImage}/${item.backdrop_path}`)

  });



})
