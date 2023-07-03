import { MoviesResults } from '@/models/movies_model'
import { SeriesResults } from '@/models/series_model'
import { useRoute } from '@react-navigation/native'
import { Text } from 'react-native'

interface IParams {
  item: MoviesResults | SeriesResults
}

export default function DetailsScreen() {
  const route = useRoute()

  if (route.params !== null) {
    const {item} = route.params as IParams
    
  }

  return <Text>Ola</Text>
}
