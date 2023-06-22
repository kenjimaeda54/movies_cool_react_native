import { FlatList, Text, View, } from "react-native";
import * as Styles from "./cardPresentation.styles";
import { DiscoverResults } from "@/models/discover_model";
import { Contants } from "@/utils/contants";
import { ForwardRefRenderFunction, forwardRef } from "react";
import Ratings from "@/components/ratings/Ratings";



interface IListSeriesPopular {
  data: Array<DiscoverResults>
  handleActiveIndex: (index: number) => void

}



function EmptyCompoent() {
  return <Text>Não tem nada de novo aqui</Text>
}


function renderItem({ item }: { item: DiscoverResults }) {


  return (
    <Styles.viewItem testID={Contants.testIdSeriesItem} >
      <Styles.image testID={Contants.testIdImageSeriesPopular} source={{ uri: `${Contants.baseUrlImage}/${item.backdrop_path}` }} resizeMode="stretch" />
      {/*overflow usa numberOfline*/}
      <Styles.textItem numberOfLines={1}  >{item.name}</Styles.textItem>
      <Styles.wrapIcons>
        <Ratings average={item.vote_average} />
      </Styles.wrapIcons>
    </Styles.viewItem>
  )
}

const ListDiscovers: ForwardRefRenderFunction<FlatList<DiscoverResults>, IListSeriesPopular> = ({ data, handleActiveIndex }, ref) => {



  return (

    <FlatList
      ref={ref}
      data={data}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={<EmptyCompoent />}
      testID={Contants.testIdSeriesPopular}
      keyExtractor={(it) => it.id.toString()}
      contentContainerStyle={{
        paddingRight: 50
      }}
      snapToInterval={150}
      decelerationRate="fast"
      renderItem={(item) => renderItem(item)}
      onMomentumScrollEnd={e => handleActiveIndex(Math.round(e.nativeEvent.contentOffset.x / 158))}
      horizontal
    />


  )

}

export default forwardRef(ListDiscovers)