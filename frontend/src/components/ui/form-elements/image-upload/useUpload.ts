import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { ChangeEvent, useMemo, useRef } from "react"

import { fileService } from "@/services/file.service"

export function useUpload(onChange: (value: string) => void) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { mutate: uploadFiles, isPending: isUploading } = useMutation({
    mutationKey: ["upload photo"],
    mutationFn: (formData: FormData) => fileService.upload(formData),
    onSuccess(data) {
      onChange(data.url)
    },
    onError() {
      toast.error("Помилка під час завантаження файла")
    },
  })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files

    if (selectedFile) {
      const formData = new FormData()
      formData.append("photo", Array.from(selectedFile)[0])

      uploadFiles(formData)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return useMemo(
    () => ({
      handleButtonClick,
      isUploading,
      fileInputRef,
      handleFileChange,
    }),
    [handleButtonClick, isUploading, fileInputRef, handleFileChange],
  )
}
