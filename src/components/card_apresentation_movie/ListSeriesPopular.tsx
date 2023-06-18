import { FlatList } from "react-native";
import * as Styles from "./cardPresentation.styles";
import { SeriesResults } from "@/models/series_model";
import { Contants } from "@/utils/contants";



function renderItem({ item }: { item: SeriesResults }) {
  return (
    <Styles.viewItem>
      <Styles.image source={{ uri: `${Contants.baseUrlImage}/${item.backdrop_path}` }} resizeMode="stretch" resizeMethod="resize" />
      <Styles.textItem>{item.name}</Styles.textItem>
    </Styles.viewItem>
  )
}

export default function ListSereisPopular({ data }: { data: Array<SeriesResults> }) {
  return (
    <Styles.container>
      <FlatList
        data={data}
        testID={Contants.testIdSeriesPopular}
        renderItem={renderItem}
        horizontal
      />
    </Styles.container>
  )

}