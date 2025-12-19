import { FC } from "react";

interface Props {
  errors: any;
  inputKey: string;
}

const FormError: FC<Props> = ({ errors, inputKey }) => {
  return (
    <p className="text-destructive text-sm mt-1">
      {typeof errors?.[inputKey] === "object" &&
        "_errors" in (errors[inputKey] ?? {}) &&
        (errors[inputKey] as unknown as { _errors: string[] })._errors.join(", ")}
    </p>
  );
};

export default FormError;
