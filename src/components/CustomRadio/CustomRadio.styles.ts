import styled from "styled-components"
import { theme } from "../../theme/theme"

const RadioLabelContainer = styled.label`
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 4px;
  margin-bottom: 4px;
`

const RadioContainer = styled.span`
  display: flex;
`

const StyledRadio = styled.input`
  ${RadioContainer} & {
    opacity: 0;
    width: 0;
    height: 0;
  }
`

const RadioControl = styled.span`
  display: block;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 0.1em solid ${theme.border};

  transform: translateY(-0.05em);

  ${StyledRadio}:checked + & {
    color: ${theme.primary};
    border-color: ${theme.primary};
    background: radial-gradient(currentColor 50%, rgba(255, 0, 0, 0) 51%);
  }
`

const RadioLabel = styled.label`
  line-height: 1;
`

export {
  RadioLabelContainer,
  RadioContainer,
  StyledRadio,
  RadioControl,
  RadioLabel,
}
