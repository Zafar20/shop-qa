import React from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"

interface CustomInputProps {
  holder: string,
  errors: FieldError | undefined,
  register: UseFormRegisterReturn,
  type: string,
  label: string
}

const CustomInput:React.FC<CustomInputProps> = ({holder,label, errors, register, type}) => {
  return (
    <div className="form_content_item">
      <label>
        <span className="form_content_item_span">{label}</span>
        <input
          placeholder={holder}
          className="form_content_item_input"
          type={type}
          {...register}
        />
      </label>
      <div className="form_content_item_error">
        {errors && (
          <h4> {<>{errors?.message || "Error"}</>} </h4>
        )}
      </div>
    </div>
  )
}

export default CustomInput
