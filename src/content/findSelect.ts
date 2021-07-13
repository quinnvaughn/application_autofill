import { createRegex } from "../utils/createRegex"
import { querySelectorArray } from "../utils/querySelectorArray"

const setSelectedIndex = (index: number) => (select: HTMLSelectElement) =>
  (select.selectedIndex = index)

const clickSelect = (select: HTMLSelectElement) => select.click()

const blurSelect = (select: HTMLSelectElement) => select.blur()

const displayParentContainer = (select: HTMLSelectElement) =>
  select.parentElement && select.parentElement.style.display === "none"
    ? (select.parentElement.style.display = "block")
    : "none"

export const findSelects = (label: string, value: string) => {
  // Create a regex from the label.
  const selectRegex = createRegex(label)
  // Create a regex from the specific value on the select.
  const valueRegex = createRegex(value)

  const allSelects = querySelectorArray("select")
  allSelects.some((select) => {
    // If webpage is using select2, remove it and replace it with a normal
    // select.
    if (
      select.classList.contains("select2-offscreen") &&
      selectRegex.test(select.parentElement!.textContent as string)
    ) {
      const parent = select.parentElement

      if (parent) {
        // remove children with classname.
        Array.from(parent.children).forEach(
          (child) =>
            child.classList.contains("select2-container") && child.remove()
        )
      }

      // remove class so select is visible.
      select.classList.remove("select2-offscreen")
      Array.from(select.options).some((option, i) =>
        valueRegex.test(option.text)
          ? (setSelectedIndex(i)(select),
            clickSelect(select),
            blurSelect(select),
            true)
          : false
      )
      return true
    }
    if (selectRegex.test(select.name) || selectRegex.test(select.id)) {
      displayParentContainer(select)

      Array.from(select.options).some((option, i) =>
        valueRegex.test(option.text)
          ? (setSelectedIndex(i)(select),
            clickSelect(select),
            blurSelect(select),
            true)
          : false
      )
      return true
    }
    return false
  })
}
