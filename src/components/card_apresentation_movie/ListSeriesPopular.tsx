import { FlatList, Text } from "react-native";
import * as Styles from "./cardPresentation.styles";
import { SeriesResults } from "@/models/series_model";
import { Contants } from "@/utils/contants";


function EmptyCompoent() {
  return <Text>Não tem nada de novo aqui</Text>
}


function renderItem({ item }: { item: SeriesResults }) {
  return (
    <Styles.viewItem testID={Contants.testIdSeriesItem} >
      <Styles.image testID={Contants.testIdImageSeriesPopular} source={{ uri: `${Contants.baseUrlImage}/${item.backdrop_path}` }} resizeMode="stretch" resizeMethod="resize" />
      <Styles.textItem>{item.name}</Styles.textItem>
      <Styles.textItem>{item.vote_average}</Styles.textItem>
    </Styles.viewItem>
  )
}

export default function ListSereisPopular({ data }: { data: Array<SeriesResults> }) {
  return (
    <Styles.container>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<EmptyCompoent />}
        testID={Contants.testIdSeriesPopular}
        renderItem={renderItem}
        horizontal
      />
    </Styles.container>
  )

}