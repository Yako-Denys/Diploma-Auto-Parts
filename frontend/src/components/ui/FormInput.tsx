import { ChangeEvent, FC } from "react"
import { ZodFormattedError } from "zod"

import { Input } from "./form-elements/Input"
import { FormControl, FormItem, FormLabel } from "./form-elements/Form"
import FormError from "./form-elements/FormError"

interface Props {
  inputKey: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string | number

  label?: string
  disabled?: boolean
  placeholder?: string
  type?: "text" | "number"
  errors?: ZodFormattedError<any>
}

const FormInput: FC<Props> = ({
  value,
  errors,
  onChange,
  inputKey,

  label = "",
  type = "text",
  placeholder = "",
  disabled = false,
}) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2">{label}</label>

      <Input value={value} placeholder={placeholder} disabled={disabled} onChange={onChange} type={type} />

      <FormError errors={errors} inputKey={inputKey} />
    </div>
  )
}

export default FormInput
