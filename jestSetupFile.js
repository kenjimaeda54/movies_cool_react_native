export const mockNavigate = jest.fn()

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => {
      return {
        navigate: mockNavigate,
        goBack: jest.fn(),
      }
    },
  }
})
