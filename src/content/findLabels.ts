import { createRegex } from "../utils/createRegex"
import { querySelectorArray } from "../utils/querySelectorArray"

const setInputValue = (value: string) => (input: HTMLInputElement) =>
  (input.value = value)

export const findLabels = (label: string, value: string) => {
  const labelRegex = createRegex(label)

  const labelValue = setInputValue(value)

  const allLabels = querySelectorArray("label")

  Array.from(document.querySelectorAll("label"))

  allLabels.some((label) => {
    if (labelRegex.test(label.innerText)) {
      // get the first input under a label.
      const input = label.getElementsByTagName("input")[0]

      // if the label is a sibling or has a for attribute.
      if (!input) {
        // check if the label has a for attribute which will point
        // us to the input.
        if (label.hasAttribute("for")) {
          const htmlFor = label.htmlFor
          const input = document.getElementById(
            htmlFor
          ) as HTMLInputElement | null
          if (input) {
            labelValue(input)
            return true
          }
        }
        return true
      } else {
        labelValue(input)
        return true
      }
    }
    return false
  })
}
