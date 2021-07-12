export function findCheckboxesAndRadios(label: string, value: string) {
  const labelRegex = new RegExp(label.toLowerCase(), "i")

  const valueRegex = new RegExp(value.toLocaleUpperCase(), "i")

  // if empty string.
  if (value.length === 0) return

  for (const label of Array.from(document.querySelectorAll("label"))) {
    if (labelRegex.test(label.innerText)) {
      const inputs = label.getElementsByTagName("input")

      if (inputs.length === 0) {
        break
      }

      for (const input of Array.from(inputs)) {
        valueRegex.test(input.value) ? (input.checked = true) : input
      }
    }
  }
}
