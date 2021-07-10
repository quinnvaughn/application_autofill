import React from "react"
import { InputHTMLAttributes } from "react"
import { StyledLabel, StyledInput, InputContainer } from "./CustomInput.styles"

type Props = {
  label: string
  for?: string | undefined
} & InputHTMLAttributes<HTMLInputElement>

export const CustomInput = ({ label, ...rest }: Props) => {
  return (
    <InputContainer>
      <StyledLabel htmlFor={rest.for}>{label}</StyledLabel>
      <StyledInput id={rest.for} {...rest} />
    </InputContainer>
  )
}
