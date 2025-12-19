"use client"

import Image from "next/image"
import { useState } from "react"

import { AuthFields } from "./AuthFields"
import { useAuthForm } from "./useAuthForm"
import { Button } from "@/components/ui/Button"
import { Form } from "@/components/ui/form-elements/Form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"

export function Auth() {
  const [isReg, setIsReg] = useState(false)

  const { onSubmit, form, isPending } = useAuthForm(isReg)

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/images/auth.svg" alt="AutoParts auth" width={100} height={100} />
      </div>

      <div className="h-full flex flex-col items-center justify-center">
        <Card className="border-none shadow-none p-6 flex flex-col items-center justify-center w-[380px]">
          <CardHeader className="text-center pb-5">
            <CardTitle className="pb-1 text-3xl font-bold">{isReg ? "Створити акаунт" : "Увійти в акаунт"}</CardTitle>

            <CardDescription>Увійдіть або створіть обліковий запис, щоб оформити покупки!</CardDescription>
          </CardHeader>

          <CardContent className="p-0 w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <AuthFields form={form} isPending={isPending} isReg={isReg} />

                <Button disabled={isPending} className="w-full">
                  Продовжити
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="p-0 mt-4 text-sm text-muted-foreground">
            {isReg ? "Вже є акаунт?" : "Ще немає акаунта?"}

            <button onClick={() => setIsReg(!isReg)} className="ml-1 text-sky-600">
              {isReg ? "Увійти" : "Створити"}
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
