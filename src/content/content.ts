import { MessageType, VeteranStatus } from "../types"
import { createGenericInfo } from "../utils/createGenericInfo"
import { findLabels } from "./findLabels"
import { findSelects } from "./findSelect"
/***
 *
 * Find labels on what you assume will be select inputs. These
 * have different functionality than an input.
 ***/

chrome.runtime.sendMessage({ type: "REQ_APPLICATION_INFO" })

let info = createGenericInfo()

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
      findLabels("First name", info.firstName)
      findLabels("Last name", info.lastName)
      findLabels("Full name", info.firstName + " " + info.lastName)
      findLabels("Email", info.email)
      findLabels("Phone", info.phoneNumber)
    }
    default: {
      info = info
      break
    }
  }
})
