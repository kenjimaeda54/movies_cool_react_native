import { mock } from "@/mock/mock_data";
import { SeriesModel } from "@/models/series_model";
import { useEffect, useState } from "react";

interface IHomeViewModel {
  series: SeriesModel
}

export default function useHomeViewModel(): IHomeViewModel {
  const [series, setSeries] = useState<SeriesModel>({} as SeriesModel)

  useEffect(() => {
    setSeries(mock)
  }, [])

  return {
    series,
  }

}