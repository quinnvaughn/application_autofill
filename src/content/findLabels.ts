export function findLabels(label: string, value: string) {
  const labelRegex = new RegExp(label.toLowerCase(), "i")

  for (const label of Array.from(document.querySelectorAll("label"))) {
    if (labelRegex.test(label.innerText)) {
      // get the first input under a label.
      const input = label.getElementsByTagName("input")[0]
      input.value = value
    }
  }
}
