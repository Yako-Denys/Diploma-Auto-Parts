import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"

import { DASHBOARD_URL } from "@/config/url.config"
import { IAuthForm } from "@/shared/types/auth.interface"
import { authService } from "@/services/auth/auth.service"

export function useAuthForm(isReg: boolean) {
  const router = useRouter()

  const form = useForm<IAuthForm>({
    mode: "onChange",
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth user"],
    mutationFn: (data: IAuthForm) => authService.main(isReg ? "register" : "login", data),
    onSuccess() {
      form.reset()
      toast.success("Успішна авторизація")
      router.replace(DASHBOARD_URL.home())
    },
    onError(error) {
      if (error.message) {
        toast.error(error.message)
      } else {
        toast.error("Помилка при авторизації")
      }
    },
  })

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data)
  }

  return { onSubmit, form, isPending }
}
