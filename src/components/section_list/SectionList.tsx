import * as Styles from "./section_list.styles"
import { ReactNode } from "react"
import { DiscoverModel, DiscoverResults } from "@/models/discover_model"
import IndicatorSeriesPopular from "@/components/indicator_series_popular/IndicatorSeriesPopular"
import { FlashList, FlashListProps } from "@shopify/flash-list"
import { Dimensions, Text, View } from "react-native"
import { Contants } from "@/utils/contants"
import { mock } from "@/mock/mock_data"
import FastImage from "react-native-fast-image"


const { width } = Dimensions.get("screen")

interface ISectionList extends Omit<FlashListProps<DiscoverResults>, "renderItem"> {
  data: DiscoverResults[]
  titleSection: string
}




function EmptyCompoent() {
  return <Text>Não tem nada de novo aqui</Text>
}


function renderItem({ item }: { item: DiscoverResults }) {


  return (
    <Styles.viewItem testID={Contants.testIdSeriesItem} >
      <Styles.image
        testID={Contants.testIdImageSeriesPopular}
        source={{
          uri: `${Contants.baseUrlImage}/${item.backdrop_path}`,
          priority: FastImage.priority.high,
          cache: "immutable"
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      {/*overflow usa numberOfline*/}
      <Styles.textItem numberOfLines={1}  >{item.name}</Styles.textItem>
    </Styles.viewItem>
  )
}


export default function SectionList({ data, titleSection, ...rest }: ISectionList) {
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