import React from "react"
import { StyledFieldset, StyledLegend } from "./CustomFieldset.styles"

type Props = {
  legend: string
}

export const CustomFieldset: React.FC<Props> = ({ legend, children }) => {
  return (
    <StyledFieldset>
      <StyledLegend>{legend}</StyledLegend>
      {children}
    </StyledFieldset>
  )
}
