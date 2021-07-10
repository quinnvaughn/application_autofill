import React, { ButtonHTMLAttributes } from "react"
import { ButtonContainer, StyledButton } from "./CustomButton.style"

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const CustomButton: React.FC<Props> = (props) => {
  return (
    <ButtonContainer>
      <StyledButton {...props} />
    </ButtonContainer>
  )
}
