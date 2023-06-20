import { FlatList, Text } from "react-native";
import * as Styles from "./cardPresentation.styles";
import { SeriesResults } from "@/models/series_model";
import { Contants } from "@/utils/contants";
import useHomeViewModel from "@/view_models/home_view_model";
import { ReactNode } from "react";
import Ratings from "@/components/ratings/Ratings";


function EmptyCompoent() {
  return <Text>Não tem nada de novo aqui</Text>
}


function renderItem({ item }: { item: SeriesResults }) {

  return (
    <Styles.viewItem testID={Contants.testIdSeriesItem} >
      <Styles.image testID={Contants.testIdImageSeriesPopular} source={{ uri: `${Contants.baseUrlImage}/${item.backdrop_path}` }} resizeMode="stretch" resizeMethod="resize" />
      {/*overflow usa numberOfline*/}
      <Styles.textItem numberOfLines={1}  >{item.name}</Styles.textItem>
      <Styles.wrapIcons>
        <Ratings average={item.vote_average} />
      </Styles.wrapIcons>
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
        renderItem={(item) => renderItem(item)}
        horizontal
      />
    </Styles.container>
  )

}