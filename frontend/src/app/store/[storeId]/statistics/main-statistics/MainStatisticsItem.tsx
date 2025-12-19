import CountUp from "react-countup"

import { getIcon } from "./statisctics.util"
import { formatPrice } from "@/utils/string/format-price"
import { IMainStatistics } from "@/shared/types/statistics.interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

interface MainStatisticsItemProps {
  item: IMainStatistics
}

export function MainStatisticsItem({ item }: MainStatisticsItemProps) {
  const Icon = getIcon(item.id)

  return (
    <Card className="drop-shadow-sm">
      <CardHeader className="p-4 flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{item.name}</CardTitle>

        <Icon className="size-5" />
      </CardHeader>

      <CardContent className="px-4 py-2">
        <h2 className="text-2xl font-bold">
          {item.id !== 1 ? <CountUp end={item.value} /> : <CountUp end={item.value} formattingFn={formatPrice} />}
        </h2>
      </CardContent>
    </Card>
  )
}
