import ListSereisPopular from "@/components/card_apresentation_movie/ListSeriesPopular";
import useHomeViewModel from "@/view_models/home_view_model";
import * as Styles from "./home.styles"
import { Contants } from "@/utils/contants";

export default function HomeScreen() {
  const { series } = useHomeViewModel()

  return (
    <Styles.container >
      <Styles.body>
        <Styles.imgTop testID={Contants.testIdImageTopHomeScreen} resizeMode="stretch" source={{ uri: 'https://images.unsplash.com/photo-1473830394358-91588751b241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60' }} />
        <Styles.wrapperList>
          <Styles.titleSection>Popular Series</Styles.titleSection>
          <ListSereisPopular data={series.results} />
        </Styles.wrapperList>
      </Styles.body>
    </Styles.container>
  )
}