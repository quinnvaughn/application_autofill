export const querySelectorArray = <K extends keyof HTMLElementTagNameMap>(
  selector: K
): HTMLElementTagNameMap[K][] => Array.from(document.querySelectorAll(selector))
