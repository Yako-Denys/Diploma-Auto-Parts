"use client"

import { Trash } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/Button"
import { Heading } from "@/components/ui/Heading"
import { Textarea } from "@/components/ui/Textarea"
import { Input } from "@/components/ui/form-elements/Input"
import { IStoreEdit } from "@/shared/types/store.interface"
import { ConfirmModal } from "@/components/ui/modals/ConfirmModal"
import { useDeleteStore } from "@/hooks/queries/stores/useDeleteStore"
import { useUpdateStore } from "@/hooks/queries/stores/useUpdateStore"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form-elements/Form"

export function Settings() {
  const { store, updateStore, isLoadingUpdate } = useUpdateStore()
  const { deleteStore, isLoadingDelete } = useDeleteStore()

  const form = useForm<IStoreEdit>({
    mode: "onChange",
    values: {
      title: store?.title || "",
      description: store?.description || "",
    },
  })

  const onSubmit: SubmitHandler<IStoreEdit> = (data) => {
    updateStore(data)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Heading title="Налаштування" description="Управління налаштуваннями магазина" />

        <ConfirmModal handleClick={() => deleteStore()}>
          <Button size="icon" variant="primary" disabled={isLoadingDelete}>
            <Trash className="size-4" />
          </Button>
        </ConfirmModal>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-full">
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Назва є обов'язковою" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва</FormLabel>
                  <FormControl>
                    <Input placeholder="Назва магазина" disabled={isLoadingUpdate} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Опис</FormLabel>
                <FormControl>
                  <Textarea placeholder="Опис магазина" disabled={isLoadingUpdate} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="primary" disabled={isLoadingUpdate}>
            Зберегти
          </Button>
        </form>
      </Form>
    </div>
  )
}
