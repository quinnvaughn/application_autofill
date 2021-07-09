export function findSelects(label: string, value: string) {
  // Create a regex from the label.
  const selectRegex = new RegExp(label.toLowerCase(), "i")
  // Create a regex from the specific value on the select.
  const valueRegex = new RegExp(value.toLowerCase(), "i")
  for (const select of Array.from(document.querySelectorAll("select"))) {
    if (selectRegex.test(select.name) || selectRegex.test(select.id)) {
      if (
        select.parentElement &&
        select.parentElement.style.display === "none"
      ) {
        select.parentElement.style.display = "block"
      }

      for (let i = 0; i < select.options.length; i++) {
        if (valueRegex.test(select.options[i].text)) {
          select.selectedIndex = i
          select.click()
          select.blur()
          break
        }
      }
    }
  }
}
