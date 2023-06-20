import useHomeViewModel from "@/view_models/home_view_model"
import * as Styles from "./ratings.styles"
import { Contants } from "@/utils/contants"

export default function Ratings({ average }: { average: number }) {
  const { returnQuantityIconsRatings } = useHomeViewModel()

  return returnQuantityIconsRatings(average).map((it, index) => <Styles.container testID={Contants.testIdContainerRatings} key={index}>
    {it}
  </Styles.container>)
}