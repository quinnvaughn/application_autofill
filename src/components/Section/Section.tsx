import React from "react"
import { SectionContainer, SectionTitle } from "./Section.styles"

type Props = {
  title: string
}

export const Section: React.FC<Props> = (props) => {
  return (
    <SectionContainer>
      <SectionTitle>{props.title}</SectionTitle>
      {props.children}
    </SectionContainer>
  )
}
