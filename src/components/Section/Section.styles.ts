import styled from "styled-components"
import { theme } from "../../theme/theme"

const SectionContainer = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid ${theme.border};
  &:nth-child(4) {
    border-bottom: none;
  }
`

const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 18px;
  margin: 8px 0px;
`

export { SectionContainer, SectionTitle }
