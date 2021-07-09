import { ApplicationInfo, MessageType, VeteranStatus } from "../types"
import { findLabels } from "./findLabels"
import { findSelects } from "./findSelect"
/***
 *
 * Find labels on what you assume will be select inputs. These
 * have different functionality than an input.
 ***/

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
      findLabels("Full name", "Quinn Vaughn")
      findLabels("Email", "qvaughn3@gmail.com")
      findLabels("Phone", "309-369-9197")
      findLabels(
        "LinkedIn",
        "https://www.linkedin.com/in/quinn-vaughn-19bb2564/"
      )
      findLabels("Github", "https://www.github.com/quinnvaughn")
      findLabels("Portfolio", "https://www.quinnvaughn.com")
    }
    default: {
      info = info
      break
    }
  }
})
