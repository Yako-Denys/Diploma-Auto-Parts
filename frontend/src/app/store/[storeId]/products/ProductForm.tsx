"use client"

import z from "zod"
import { useMemo, useState } from "react"
import { Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Heading } from "@/components/ui/Heading"
import FormInput from "@/components/ui/FormInput"
import allCategories from "@/data/categories.json"
import { Textarea } from "@/components/ui/Textarea"
import manufacturesData from "@/data/manufactures.json"
import { Input } from "@/components/ui/form-elements/Input"
import { IProduct } from "@/shared/types/product.interface"
import { ICategory } from "@/shared/types/category.interface"
import { MultiDropdown } from "@/components/ui/MultiDropdown"
import { useFetchCarModels } from "@/hooks/useFetchCarModels"
import { IManufacture } from "@/shared/types/filter.interface"
import FormError from "@/components/ui/form-elements/FormError"
import { ConfirmModal } from "@/components/ui/modals/ConfirmModal"
import { AutocompleteDropdown } from "@/components/ui/AutocompleteDropdown"
import { useCreateProduct } from "@/hooks/queries/products/useCreateProduct"
import { useDeleteProduct } from "@/hooks/queries/products/useDeleteProduct"
import { useUpdateProduct } from "@/hooks/queries/products/useUpdateProduct"
import { ImageUpload } from "@/components/ui/form-elements/image-upload/ImageUpload"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"

const defaultFormValues = {
  photo: "",
  title: "",
  price: 0,
  subcategoryId: "",
  subcategoryName: "",
  description: "",
  compatibleCars: [] as string[],
  attributes: [] as { key: string; value: string }[],
}

const formSchema = z.object({
  photo: z.string({ message: "Це поле обов'язкове" }).nonempty("Це поле обов'язкове"),
  title: z.string({ message: "Це поле обов'язкове" }).min(3, { message: "Мінімальна довжина - 3 символа" }),
  price: z.number({ message: "Це поле обов'язкове" }).min(1, "Це поле обов'язкове"),
  subcategoryId: z.string({ message: "Це поле обов'язкове" }).nonempty("Це поле обов'язкове"),
  subcategoryName: z.string({ message: "Це поле обов'язкове" }).nonempty("Це поле обов'язкове"),
  description: z.string({ message: "Це поле обов'язкове" }).nonempty("Це поле обов'язкове"),
  compatibleCars: z.array(z.string()).nonempty("Це поле обов'язкове"),
  attributes: z.array(z.object({ key: z.string(), value: z.string() })).nonempty("Це поле обов'язкове"),
})

export type FormType = z.infer<typeof formSchema>

interface ProductFormProps {
  product?: IProduct
  categories: ICategory[]
}

type CategoryNode = {
  text: string
  children: Record<string, CategoryNode> | []
}

type FlatCategory = {
  id: string
  name: string
}

function flattenCategories(categories: Record<string, CategoryNode>): FlatCategory[] {
  const result: FlatCategory[] = []

  function traverse(nodes: Record<string, CategoryNode>) {
    for (const [id, node] of Object.entries(nodes)) {
      result.push({ id, name: node.text })
      if (node.children && typeof node.children === "object" && !Array.isArray(node.children)) {
        traverse(node.children)
      }
    }
  }

  traverse(categories)

  return result
}

const categories = flattenCategories(allCategories.type_1.categories as any)

export function ProductForm({ product }: ProductFormProps) {
  const { createProduct, isLoadingCreate } = useCreateProduct()
  const { updateProduct, isLoadingUpdate } = useUpdateProduct()
  const { deleteProduct, isLoadingDelete } = useDeleteProduct()

  const [newAttribute, setNewAttribute] = useState({ key: "", value: "" })
  const [selectedManufacture, setSelectedManufacture] = useState<IManufacture | null>(null)

  const models = useFetchCarModels(selectedManufacture)
  const carModels = useMemo(
    () => (models || []).map((model) => ({ id: String(model.modelId), name: model.modelName })),
    [models],
  )

  const [isPending, setIsPanding] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [userFormData, setUserFormData] = useState<Partial<FormType>>({})

  let productFormData

  if (product) {
    const { reviews, ...rest } = product
    productFormData = rest
  }

  const formData = {
    ...defaultFormValues,
    ...((productFormData ? productFormData : {}) as typeof defaultFormValues),
    ...userFormData,
  }

  const validate = () => {
    const res = formSchema.safeParse(formData)
    if (res.success) return
    return res.error.format()
  }

  const errors = showErrors ? validate() : undefined

  const title = product ? "Змінити дані" : "Новий товар"
  const description = product ? "Змінити дані про товар" : "Додати новий товар в магазин"
  const action = product ? "Зберегти зміни" : "Додати"

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsPanding(true)
      const errors = validate()
      if (errors) {
        setShowErrors(true)
        return
      }

      if (product) {
        updateProduct(formData)
        return
      }

      createProduct(formData)
    } finally {
      setIsPanding(false)
    }
  }

  const onChangeFormValue = (key: keyof FormType, value: number | string) => {
    setUserFormData((prev) => ({ ...prev, [key]: value }))
  }

  const onAddNewAttribute = () => {
    setUserFormData((prev) => {
      if (Array.isArray(prev.attributes)) {
        return { ...prev, attributes: [...prev.attributes, newAttribute] }
      }
      const attributes = formData.attributes.map((att) => ({
        key: att.key,
        value: att.value,
      })) as FormType["attributes"]
      return { ...prev, attributes: [...attributes, newAttribute] }
    })
    setNewAttribute({ key: "", value: "" })
  }

  const onDeleteAttribute = (key: string) => {
    // @ts-ignore
    setUserFormData((prev) => {
      if (Array.isArray(prev.attributes)) {
        const newAttributes = prev.attributes.filter((a) => a.key !== key)
        return { ...prev, attributes: newAttributes }
      }

      const newAttributes = formData.attributes.filter((a) => a.key !== key)
      return { ...prev, attributes: newAttributes }
    })
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {product && (
          <ConfirmModal handleClick={() => deleteProduct()}>
            <Button size="icon" variant="primary" disabled={isLoadingDelete}>
              <Trash className="size-4" />
            </Button>
          </ConfirmModal>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <label className="text-sm font-medium mb-2">Фото</label>
          <ImageUpload
            isDisabled={isLoadingCreate || isLoadingUpdate}
            onChange={(photo) => {
              console.log("photo", photo)
              setUserFormData((prev) => ({ ...prev, photo }))
            }}
            value={formData.photo}
          />
          <p className="text-destructive text-sm mt-1">
            {typeof errors?.photo === "object" &&
              "_errors" in (errors.photo ?? {}) &&
              (errors.photo as unknown as { _errors: string[] })._errors.join(", ")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <FormInput
            label="Назва"
            errors={errors}
            inputKey="title"
            value={formData.title}
            placeholder="Назва товара"
            disabled={isLoadingCreate || isLoadingUpdate}
            onChange={(e: any) => onChangeFormValue("title", e.target.value)}
          />

          <FormInput
            label="Ціна"
            type="number"
            errors={errors}
            inputKey="price"
            value={formData.price}
            placeholder="Ціна товара"
            disabled={isLoadingCreate || isLoadingUpdate}
            onChange={(e: any) => onChangeFormValue("price", +e.target.value)}
          />

          <div>
            <label className="text-sm font-medium mb-2">Категорія</label>
            <AutocompleteDropdown
              placeholder="Категорія"
              options={categories.slice(0, 200)}
              defaultValue={userFormData.subcategoryId}
              onChange={(data) =>
                setUserFormData((prev) => ({ ...prev, subcategoryId: data.id, subcategoryName: data.name }))
              }
            />
            <FormError errors={errors} inputKey="subcategoryId" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2">Опис</label>
          <Textarea
            placeholder="Опис товара"
            value={formData.description}
            disabled={isLoadingCreate || isLoadingUpdate}
            onChange={(e: any) => onChangeFormValue("description", e.target.value)}
          />
          <FormError errors={errors} inputKey="description" />
        </div>

        <div className="">
          <h4 className="text-sm font-medium mb-1">Підходить для</h4>

          <div className="flex items-start gap-4">
            <Select
              onValueChange={(brand) => {
                const manufacture = manufacturesData.manufacturers.find((el) => el.brand === brand)
                if (manufacture) setSelectedManufacture(manufacture)
              }}
            >
              <SelectTrigger className="!flex-1">
                <SelectValue placeholder="Марка автомобіля" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {manufacturesData.manufacturers.map((manufacture) => (
                    <SelectItem key={manufacture.manufacturerId} value={manufacture.brand}>
                      {manufacture.brand}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex-1">
              <MultiDropdown
                data={carModels}
                disabled={!carModels.length}
                value={formData.compatibleCars}
                defaultValue={formData.compatibleCars}
                placeholder="Введіть текст для пошуку моделі автомобіля"
                onValueChange={(data) => {
                  console.log("selected cars", data)
                  setUserFormData((prev) => ({ ...prev, compatibleCars: data as any }))
                }}
              />
              <FormError errors={errors} inputKey="compatibleCars" />
            </div>
          </div>
        </div>

        <div className="!mb-8">
          <h4 className="text-sm font-medium mb-1">Характеристики товару</h4>

          {!!formData.attributes.length && (
            <div className="mb-4 max-w-[500px]">
              {formData.attributes.map((el) => (
                <div key={el.key} className="flex items-center gap-2 mb-2">
                  <div className="w-[226px]">{el.key}</div>
                  <div className="w-[210px]">{el.value}</div>
                  <Button type="button" variant="outline" onClick={() => onDeleteAttribute(el.key)}>
                    <Trash size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Input
              className="w-30"
              value={newAttribute.key}
              placeholder="Характеристика"
              onChange={(e) => setNewAttribute((prev) => ({ ...prev, key: e.target.value }))}
            />
            <Input
              className="w-30"
              placeholder="Значення"
              value={newAttribute.value}
              onChange={(e) => setNewAttribute((prev) => ({ ...prev, value: e.target.value }))}
            />
            <Button
              type="button"
              variant="outline"
              onClick={onAddNewAttribute}
              disabled={!newAttribute.key || !newAttribute.value}
            >
              <Plus size={18} />
            </Button>
          </div>
          <FormError errors={errors} inputKey="attributes" />
        </div>

        <Button variant="primary" disabled={isLoadingCreate || isLoadingUpdate || !!errors}>
          {action}
        </Button>
      </form>
    </div>
  )
}
