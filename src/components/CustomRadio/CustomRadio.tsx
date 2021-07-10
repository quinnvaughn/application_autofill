import React, { InputHTMLAttributes } from "react"
import {
  StyledRadio,
  RadioControl,
  RadioLabelContainer,
  RadioLabel,
  RadioContainer,
} from "./CustomRadio.styles"

type Props = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export const CustomRadio: React.FC<Props> = ({ label, ...rest }) => {
  return (
    <RadioLabelContainer>
      <RadioContainer>
        <StyledRadio type="radio" {...rest} />
        <RadioControl />
      </RadioContainer>
      <RadioLabel>{label}</RadioLabel>
    </RadioLabelContainer>
  )
}
