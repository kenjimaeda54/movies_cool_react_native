import { MoviesResults } from '@/models/movies_model'
import { useTheme } from 'styled-components/native'
import { SeriesResults } from '@/models/series_model'
import {
  ParamListBase,
  RouteProp,
  useRoute,
} from '@react-navigation/native'
import { Dimensions, Text, View } from 'react-native'
import * as Styles from './details.styles'
import { Contants } from '@/utils/contants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Evillcons from 'react-native-vector-icons/EvilIcons'
import FastImage from 'react-native-fast-image'
import useDetailsViewModel from '@/view_models/details_view_model'

type IParamList = {
  item: MoviesResults | SeriesResults
  title: string
}

export function returnOverview(overview: string): string {
  return overview.length > 0
    ? overview
    : 'Não existe uma descrição para esta serie ou filme'
}

const DetailsScreen = () => {
  const route = useRoute()
  const { color } = useTheme()
  const { item, title } = route.params as IParamList
  const { handleBack } = useDetailsViewModel()

  return (
    <Styles.container bounces={false}>
      <Styles.sharedImg id={`${item.id}.photo`}>
        <Styles.image
          source={{
            uri: `${Contants.baseUrlImage}/${item.backdrop_path}`,
            priority: FastImage.priority.high,
            cache: 'immutable',
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={require('assets/images/image_not_found.png')}
        />
      </Styles.sharedImg>
      <Styles.buttonBack
        testID={Contants.testIdButtonBackScreenDetails}
        onPress={handleBack}>
        <Ionicons
          name='arrow-back'
          size={30}
          color={color.grayLight}
        />
      </Styles.buttonBack>
      <Styles.body>
        <View>
          <Styles.title>{title}</Styles.title>
          <Styles.overView>
            {returnOverview(item.overview)}
          </Styles.overView>
        </View>
        <Styles.viewQuantityLike>
          <Evillcons name='like' size={30} color={color.grayLight} />
          <Styles.quantityLike>
            {item.vote_average}/10
          </Styles.quantityLike>
        </Styles.viewQuantityLike>
      </Styles.body>
    </Styles.container>
  )
}

DetailsScreen.sharedElements = (route: RouteProp<ParamListBase>) => {
  const { item } = route.params as IParamList

  return [{ id: `${item.id}.photo` }]
}

export default DetailsScreen
