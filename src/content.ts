import { ApplicationInfo, MessageType, VeteranStatus } from "./types"
/***
 *
 * Find labels on what you assume will be select inputs. These
 * have different functionality than an input.
 ***/
function findSelects(label: string, value: string) {
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

chrome.runtime.sendMessage({ type: "REQ_APPLICATION_INFO" })

let info: ApplicationInfo = {
  gender: "",
  hispanic: null,
  race: "",
  veteranStatus: "",
}

function hispanicValue(value: boolean | null) {
  return value === null ? "" : value === true ? "Yes" : "No"
}

function veteranValue(status: VeteranStatus) {
  return status === "Yes"
    ? "identify"
    : status === "No"
    ? "not"
    : status === "Decline"
    ? "answer"
    : ""
}

chrome.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case "APPLICATION_INFO_STATUS": {
      info = { ...message.applicationInfo }
      findSelects("Gender", info.gender)
      findSelects("Hispanic", hispanicValue(info.hispanic))
      findSelects("Race", info.race)
      findSelects("Veteran", veteranValue(info.veteranStatus))
    }
    default: {
      info = info
      break
    }
  }
})
