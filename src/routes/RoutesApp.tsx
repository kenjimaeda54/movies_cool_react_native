import DetailsScreen from '@/screens/details/Details'
import HomeScreen from '@/screens/home/Home'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { NavigationUtils } from '@/utils/navigation_utils'
import { Easing } from 'react-native'

const { Navigator, Screen } = createSharedElementStackNavigator()

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
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 500,
                easing: Easing.inOut(Easing.ease),
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 500,
                easing: Easing.inOut(Easing.ease),
              },
            },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            }
          },
        })}
      />
    </Navigator>
  )
}
