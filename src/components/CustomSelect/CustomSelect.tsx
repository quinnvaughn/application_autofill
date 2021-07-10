import React, { SelectHTMLAttributes } from "react"
import { StyledSelect } from "./CustomSelect.styles"

type Props = SelectHTMLAttributes<HTMLSelectElement>

export const CustomSelect: React.FC<Props> = ({ children, ...rest }) => {
  return <StyledSelect {...rest}>{children}</StyledSelect>
}
