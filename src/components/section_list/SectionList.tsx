import { FC } from 'react'
import { FlashList, FlashListProps } from '@shopify/flash-list'
import { Text, View } from 'react-native'
import { Contants } from '@/utils/contants'
import * as Styles from './section_list.styles'

interface ISectionList<T>
  extends Omit<FlashListProps<T>, 'renderItem'> {
  data: T[]
  titleSection: string
  renderDetails: FC<{ item: T }>
  isSuccess: boolean
}

export function EmptyCompoent() {
  return <Text>Não tem nada de novo aqui</Text>
}

// TODO: - transformar em generico
// https://xebia.com/blog/generic-listitem-in-react-native-using-typescript/
export default function SectionList<T>({
  data,
  isSuccess,
  titleSection,
  renderDetails: RenderDetails,
  ...rest
}: ISectionList<T>) {
  if (!isSuccess) {
    return null
  }

  function renderItem({ item }: { item: T }) {
    return (
      <Styles.viewItem testID={Contants.testIdSeriesMoviesItem}>
        <RenderDetails item={item} />
      </Styles.viewItem>
    )
  }

  return (
    <Styles.container>
      <Styles.titleSection>{titleSection}</Styles.titleSection>
      <View
        style={{
          height: '100%',
        }}>
        <FlashList
          data={data}
          {...rest}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<EmptyCompoent />}
          testID={Contants.testIdSectionListSeriesMovies}
          contentContainerStyle={{
            paddingRight: 50,
          }}
          estimatedItemSize={470}
          renderItem={renderItem}
          horizontal
        />
      </View>
    </Styles.container>
  )
}
