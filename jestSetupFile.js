import 'react-native-gesture-handler/jestSetup'

export const mockNavigate = jest.fn()
export const mockBackNavigate = jest.fn()

//ao mocar esse item ira aparecer em qualquer tela que eu precisar receber parametro via rota
const itemWithOverView = {
  adult: false,
  backdrop_path: '/fhquRW28vRZHr26orSaFFnhYIA0.jpg',
  genre_ids: [28, 53],
  id: 697843,
  original_language: 'en',
  original_title: 'Extraction 2',
  overview:
    'Depois de escapar da morte por um triz, o mercenário Tyler Rake encara mais uma missão perigosa: resgatar a família de um criminoso implacável.',
  popularity: 2001.538,
  poster_path: '/AfwqKLQwjgPu8bIL1mqhHTlnQv0.jpg',
  release_date: '2023-06-09',
  title: 'Resgate 2',
  video: false,
  vote_average: 7.6,
  vote_count: 983,
}

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => {
      return {
        navigate: mockNavigate,
        goBack: mockBackNavigate,
      }
    },
    useRoute: () => {
      return {
        params: { item: itemWithOverView, title: 'Resgate 2' },
      }
    },
  }
})

jest.mock('react-navigation-shared-element', () => ({
  createSharedElementStackNavigator: jest.fn(),
  SharedElement: ({ children }) => <>{children}</>,
}))
