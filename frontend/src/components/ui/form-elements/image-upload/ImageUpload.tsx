import Image from "next/image"
import { ImagePlus } from "lucide-react"

import { cn } from "@/utils/clsx"
import { Button } from "../../Button"
import { useUpload } from "./useUpload"

interface ImageUploadProps {
  isDisabled: boolean
  onChange: (value: string) => void
  value: string
}

export function ImageUpload({ isDisabled, onChange, value }: ImageUploadProps) {
  const { handleButtonClick, isUploading, fileInputRef, handleFileChange } = useUpload(onChange)

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {value && (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <Image src={value} alt="Картинка" className="object-cover" fill />
          </div>
        )}
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={handleButtonClick}
        disabled={isDisabled || isUploading}
        className={cn({ "mt-4": value.length })}
      >
        <ImagePlus className="size-4 mr-2" />
        Завантажити фото
      </Button>
      <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} disabled={isDisabled} />
    </div>
  )
}
