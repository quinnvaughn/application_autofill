import styled from "styled-components"
import { theme } from "../../theme/theme"

const StyledFieldset = styled.fieldset`
  border-radius: 8px;
  border: 1px solid ${theme.border};
  margin-bottom: 8px;
`

const StyledLegend = styled.legend`
  font-style: italic;
  padding: 0px 12px;
`

export { StyledFieldset, StyledLegend }
