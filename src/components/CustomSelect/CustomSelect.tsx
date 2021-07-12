import React, { SelectHTMLAttributes } from "react"
import { StyledSelect, SelectField, SelectLabel } from "./CustomSelect.styles"

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
}

export const CustomSelect: React.FC<Props> = ({ children, label, ...rest }) => {
  return (
    <SelectLabel>
      <SelectField>{label}</SelectField>
      <StyledSelect {...rest}>{children}</StyledSelect>
    </SelectLabel>
  )
}
