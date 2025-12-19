import Image from "next/image"

import { formatPrice } from "@/utils/string/format-price"
import { ILastUsers } from "@/shared/types/statistics.interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

interface LastUsersProps {
  data: ILastUsers[]
}

export function LastUsers({ data }: LastUsersProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-4">
        <CardTitle className="text-xl font-medium tracking-[0.1px] line-clamp-1">Прибуток</CardTitle>
      </CardHeader>

      <CardContent>
        {data.length ? (
          data.map((user) => (
            <div className="flex items-center mt-5">
              <Image src={user.picture} alt={user.name} width={40} height={40} className="rounded-full" />

              <div className="ml-4 space-y-1 text-sm text-muted-foreground">
                <p className="leading-none text-black font-medium">{user.name}</p>
                <p>{user.email}</p>
              </div>

              <div className="ml-auto font-medium">+{formatPrice(user.total)}</div>
            </div>
          ))
        ) : (
          <div>{`В магазина немає покупців`}</div>
        )}
      </CardContent>
    </Card>
  )
}
