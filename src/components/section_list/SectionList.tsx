import * as Styles from "./section_list.styles"
import { FC } from "react"

import { FlashList, FlashListProps } from "@shopify/flash-list"
import { Dimensions, Text, View } from "react-native"
import { Contants } from "@/utils/contants"


interface ISectionList<T> extends Omit<FlashListProps<T>, "renderItem"> {
  data: T[]
  titleSection: string
  renderDetails: FC<{ item: T }>
}




function EmptyCompoent() {
  return <Text>Não tem nada de novo aqui</Text>
}


//TODO: - transformar em generico
//https://xebia.com/blog/generic-listitem-in-react-native-using-typescript/
export default function SectionList<T>({ data, titleSection, renderDetails: RenderDetails, ...rest }: ISectionList<T>) {


  function renderItem({ item }: { item: T }) {


    return (
      <Styles.viewItem testID={Contants.testIdSeriesItem} >
        <RenderDetails item={item} />
      </Styles.viewItem>
    )
  }


  return (
    <Styles.container>
      <Styles.titleSection>{titleSection}</Styles.titleSection>
      <View style={{
        height: "100%",
      }}>
        <FlashList
          data={data}
          {...rest}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<EmptyCompoent />}
          testID={Contants.testIdSeriesPopular}
          contentContainerStyle={{
            paddingRight: 50,
          }}
          estimatedItemSize={470}
          renderItem={(item) => renderItem(item)}
          horizontal
        />
      </View>
    </Styles.container>
  )

}