import { createRegex } from "../utils/createRegex"
import { querySelectorArray } from "../utils/querySelectorArray"

const setInputValue = (value: string) => (input: HTMLInputElement) =>
  (input.value = value)

export const findLabels = (label: string, value: string, notLabel?: string) => {
  const labelRegex = createRegex(label)

  const labelValue = setInputValue(value)

  const allLabels = querySelectorArray("label")

  allLabels.some((label) => {
    // if label matches go through rest of logic.
    // if not, return false.
    if (labelRegex.test(label.innerText)) {
      if (notLabel) {
        const notLabelRegex = createRegex(notLabel)
        //check if the label includes the text you don't want it to include.
        // if so, return early.
        if (notLabelRegex.test(label.innerText)) return false
      }
      // Check if label has for, it won't have inner inputs then.
      // if label has for attribute, easy to find input.
      if (label.hasAttribute("for")) {
        const htmlFor = label.htmlFor
        const input = document.getElementById(
          htmlFor
        ) as HTMLInputElement | null
        return input
          ? // if input exists label and return true and exit.
            // If input is null return false
            (labelValue(input), true)
          : false
      }

      const inputs = Array.from(label.getElementsByTagName("input"))
      if (inputs.length === 0) return true

      // if there are inputs, cycle through them.
      inputs.some((input) =>
        // go to next input if input is hidden.
        input.type === "hidden" ? false : (labelValue(input), true)
      )
    }
    return false
  })
}
