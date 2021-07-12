export const findLabels = (label: string, value: string) => {
  const labelRegex = new RegExp(label.toLowerCase(), "i")

  for (const label of Array.from(document.querySelectorAll("label"))) {
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
            input.value = value
            break
          }
        }
      } else {
        input.value = value
        break
      }
    }
  }
}
