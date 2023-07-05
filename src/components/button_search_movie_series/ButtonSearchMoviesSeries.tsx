import { TouchableOpacityProps } from 'react-native'
import * as Styles from './button_search_movie_series.style'

interface IButtonSearchMoviesSeriesProps extends TouchableOpacityProps {
  isSelected: boolean
  textButton: string 
}

export default function ButtonSearchMoviesSeries({isSelected,textButton,...rest}: IButtonSearchMoviesSeriesProps) {
  return (
    <Styles.button {...rest}  isSelected={isSelected}>
      <Styles.text>{textButton}</Styles.text>
    </Styles.button>
  )
}
