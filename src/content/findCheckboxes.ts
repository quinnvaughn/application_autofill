import { createRegex } from "../utils/createRegex"
import { querySelectorArray } from "../utils/querySelectorArray"

const flipChecked = (input: HTMLInputElement) => (input.checked = true)

export const findCheckboxesAndRadios = (
  label: string,
  value: string | null
) => {
  if (!value) return
  const labelRegex = createRegex(label)

  const valueRegex = createRegex(value)

  // if empty string.
  if (value.length === 0) return

  const allLabels = querySelectorArray("label")

  allLabels.some((label) => {
    if (labelRegex.test(label.innerText)) {
      const inputs = label.getElementsByTagName("input")

      if (inputs.length === 0) {
        return true
      }

      Array.from(inputs).some((input) =>
        valueRegex.test(input.value) ? (flipChecked(input), true) : false
      )
      return true
    }
    return false
  })
}
