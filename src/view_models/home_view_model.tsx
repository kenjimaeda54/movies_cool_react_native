import { mock } from "@/mock/mock_data";
import { SeriesModel } from "@/models/series_model";
import { ReactNode, useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "styled-components/native";

interface IHomeViewModel {
  series: SeriesModel,
  returnQuantityIconsRatings: (ratings: number) => ReactNode[]
}

export default function useHomeViewModel(): IHomeViewModel {
  const [series, setSeries] = useState<SeriesModel>({} as SeriesModel)
  const { color } = useTheme()

  useEffect(() => {
    setSeries(mock)
  }, [])


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
  }
}

