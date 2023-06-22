import { mock } from "@/mock/mock_data";
import { DiscoverModel, DiscoverResults } from "@/models/discover_model";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { FlatList, NativeSyntheticEvent, TextInputContentSizeChangeEventData } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "styled-components/native";

interface IHomeViewModel {
  series: DiscoverModel,
  returnQuantityIconsRatings: (ratings: number) => ReactNode[]
  activeIndexSeries: number,
  handleCurrentIndex: (index: number) => void
  refSeries: RefObject<FlatList<DiscoverResults>>
  handleScroolOffset: (index: number) => void
  handleHeightInput: (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => void
  inputHeight: number
}



export default function useHomeViewModel(): IHomeViewModel {
  const [series, setSeries] = useState<DiscoverModel>({} as DiscoverModel)
  const [activeIndexSeries, setActiveIndexSeries] = useState(0)
  const refSeries = useRef<FlatList<DiscoverResults>>(null)
  const [inputHeight, setInputHeight] = useState(20)

  const { color } = useTheme()

  useEffect(() => {
    setSeries(mock)
  }, [])


  function handleScroolOffset(index: number) {
    refSeries.current?.scrollToOffset({
      offset: 165 * index,
      animated: true
    })


  }

  const handleHeightInput = (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => setInputHeight(e.nativeEvent.contentSize.height + 7)


  const handleCurrentIndex = (index: number) => setActiveIndexSeries(index)


  function getFullStars(count: number): ReactNode[] {
    return Array.from({ length: count }, (_, i) => (
      <FontAwesome key={i} size={20} name="star" color={color.yellow} />
    ));
  }

  function getHalfStar(): ReactNode[] {
    return [<FontAwesome size={20} name="star-half-empty" color={color.yellow} />];
  }

  function getEmptyStars(count: number): ReactNode[] {
    return Array.from({ length: count }, (_, i) => (
      <FontAwesome key={i} size={20} name="star-o" color={color.yellow} />
    ));
  }

  function returnQuantityIconsRatings(ratings: number): ReactNode[] {
    const total = 5;
    const fullCount = Math.floor(ratings);
    const emptyCount = total - fullCount;
    const hasHalfStar = ratings % 1 !== 0;
    if (hasHalfStar) {
      return [...getFullStars(fullCount), ...getHalfStar(), ...getEmptyStars(emptyCount - 1)];
    } else {
      return [...getFullStars(fullCount), ...getEmptyStars(emptyCount)];
    }
  }



  return {
    series,
    returnQuantityIconsRatings,
    activeIndexSeries,
    handleCurrentIndex,
    refSeries,
    handleScroolOffset,
    inputHeight,
    handleHeightInput
  }
}

