import Image from "next/image"

import { SITE_NAME } from "@/constants/seo.constants"

export function LikeIcon({ status, size }: { status?: boolean; size?: number }) {
  const imageSrc = status ? "/images/heart-fill.svg" : "/images/heart-empty.svg"
  const imageSize = status ? (size ? size : 26) : 20

  return <Image src={imageSrc} alt={SITE_NAME} width={imageSize} height={imageSize} />
}
