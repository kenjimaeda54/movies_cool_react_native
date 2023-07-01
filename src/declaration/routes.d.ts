import { NavigationModel } from '@/models/navigation_model'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationModel {}
  }
}
