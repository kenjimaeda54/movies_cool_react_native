import DetailsScreen from '@/screens/details/Details'
import HomeScreen from '@/screens/home/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationUtils } from '@/utils/navigation_utils'

const { Navigator, Screen } = createNativeStackNavigator()

export default function RoutesApp() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={NavigationUtils.home} component={HomeScreen} />
      <Screen
        name={NavigationUtils.details}
        component={DetailsScreen}
      />
    </Navigator>
  )
}
