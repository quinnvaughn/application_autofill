import styled from "styled-components"
import { theme } from "../../theme/theme"

const StyledLabel = styled.label`
  width: 100px;
`

const StyledInput = styled.input`
  width: 100%;
  padding: 4px 4px 4px 8px;
  border-radius: 3px;
  box-sizing: border-box;
  border-style: solid;
  border-width: 1px;
  border-color: ${theme.border};
  line-height: 1.4;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
`

export { StyledInput, StyledLabel, InputContainer }
