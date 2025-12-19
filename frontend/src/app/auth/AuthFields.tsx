import { UseFormReturn } from "react-hook-form"

import { validEmail } from "@/shared/regex"
import { IAuthForm } from "@/shared/types/auth.interface"
import { Input } from "@/components/ui/form-elements/Input"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form-elements/Form"

interface AuthFieldsProps {
  form: UseFormReturn<IAuthForm, any, undefined>
  isPending: boolean
  isReg?: boolean
}

export function AuthFields({ form, isPending, isReg = false }: AuthFieldsProps) {
  return (
    <>
      {isReg && (
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Ім'я обов'язкове" }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Ім'я" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="email"
        rules={{
          required: "Пошта обов'язкова",
          pattern: { value: validEmail, message: "Введіть валідну пошту" },
        }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="name@examle.com" type="email" disabled={isPending} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        rules={{
          required: "Пароль обов'язковий",
          minLength: { value: 6, message: "Мінімум 6 символів" },
        }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="******" type="password" disabled={isPending} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
