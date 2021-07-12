import styled from "styled-components"
import { theme } from "../../theme/theme"

const StyledButton = styled.button`
  height: 40px;
  outline: none;
  cursor: pointer;
  padding: 0 16px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: none;
  background-color: ${theme.primary};
  text-shadow: none;
  border: none;
  width: 100%;
  color: white;
`

const ButtonContainer = styled.div`
  flex: 0 0 auto;
`

export { StyledButton, ButtonContainer }
