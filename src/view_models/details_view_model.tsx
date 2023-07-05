import { useNavigation } from '@react-navigation/native'

interface IDetailsViewModel {
  handleBack: () => void
}

export default function useDetailsViewModel(): IDetailsViewModel {
  const { goBack } = useNavigation()

  const handleBack = () => goBack()

  return {
    handleBack,
  }
}
