import DetailsScreen, {
  returnOverview,
} from '@/screens/details/Details'
import { Contants } from '@/utils/contants'
import { act, fireEvent, render } from '@/utils/test-utils'
import { mockBackNavigate } from 'jestSetupFile'

describe('DetailsScreen', () => {
  it('should render the title correctly', () => {
    //details screeen vai receber o nosso mock de rotas
    //dessa forma consigo garantir que qualquer valor que chegar na rota via parametro sera correto
    const { getByText } = render(<DetailsScreen />)
    const text = getByText('Resgate 2') // sera o valor mocado em jestSetupFile em useRoute
    expect(text).toBeTruthy()
  })

  it('should handle back button press', () => {
    //details screeen vai receber o nosso mock de rotas
    //dessa forma consigo garantir que qualquer valor que chegar na rota via parametro sera correto
    const { getByTestId } = render(<DetailsScreen />)
    const button = getByTestId(Contants.testIdButtonBackScreenDetails) // sera o valor mocado em jestSetupFile
    fireEvent.press(button)
    expect(mockBackNavigate).toBeCalledTimes(1)
  })

  it('should render the item overview', () => {
    const mockOverview = jest.fn()
    const overView =
      'Depois de escapar da morte por um triz, o mercenário Tyler Rake encara mais uma missão perigosa: resgatar a família de um criminoso implacável.'
    render(<DetailsScreen />)
    mockOverview.mockReturnValueOnce(returnOverview(overView))

    expect(mockOverview()).toBe(
      'Depois de escapar da morte por um triz, o mercenário Tyler Rake encara mais uma missão perigosa: resgatar a família de um criminoso implacável.'
    )
  })

  it('should return a standard message if it does not have an overview', () => {
    const mockOverview = jest.fn()
    const overView = ''
    render(<DetailsScreen />)
    mockOverview.mockReturnValueOnce(returnOverview(overView))

    expect(mockOverview()).toBe(
      'Não existe uma descrição para esta serie ou filme'
    )
  })
})
