import styled from "styled-components"
import { theme } from "../../theme/theme"

const StyledSelect = styled.select`
  border: 1px solid ${theme.border};
  border-radius: 3px;
  width: 100%;
  padding: 4px;
  margin-bottom: 8px;
`

const SelectLabel = styled.label`
  display: flex;
  flex-direction: column;
  grid-gap: 4px;
`

const SelectField = styled.span``

export { StyledSelect, SelectField, SelectLabel }
