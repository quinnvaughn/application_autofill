import { MessageType, VeteranStatus } from "../types"
import { createGenericInfo } from "../utils/createGenericInfo"
import { findCheckboxesAndRadios } from "./findCheckboxes"
import { findLabels } from "./findLabels"
import { findSelects } from "./findSelect"
/***
 *
 * Find labels on what you assume will be select inputs. These
 * have different functionality than an input.
 ***/

chrome.runtime.sendMessage({ type: "REQ_APPLICATION_INFO" })

let info = createGenericInfo()

const booleanValue = (value: boolean | null) => {
  return value === null ? "" : value === true ? "Yes" : "No"
}

const veteranValue = (status: VeteranStatus) => {
  return status === "Yes"
    ? "identify"
    : status === "No"
    ? "not"
    : status === "Decline"
    ? "answer"
    : ""
}

// Some will just use the words I am a veteran, I am not a veteran.
// This checks for that.
const otherVeteranValue = (status: VeteranStatus) => {
  return status === "Yes"
    ? "am a"
    : status === "No"
    ? "am not"
    : status === "Decline"
    ? "decline"
    : ""
}

chrome.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case "APPLICATION_INFO_STATUS": {
      info = { ...message.applicationInfo }
      findSelects("Gender", info.gender)
      findSelects("Hispanic", booleanValue(info.hispanic))
      findSelects("Race", info.race)
      findSelects("Veteran", veteranValue(info.veteranStatus))
      findSelects("Veteran", otherVeteranValue(info.veteranStatus))
      findLabels("First name", info.firstName)
      findLabels("Last name", info.lastName)
      findLabels("Full name", info.firstName + " " + info.lastName)
      findLabels("Email", info.email)
      findLabels("Phone", info.phoneNumber)
      findLabels("LinkedIn", info.linkedIn)
      findLabels("Github", info.github)
      findLabels("Portfolio", info.portfolio)
      findLabels("Twitter", info.twitter)
      findLabels("Other", info.other)
      findLabels("Current company", info.currentCompany)
      findCheckboxesAndRadios("Based in", booleanValue(info.basedIn))
    }
    default: {
      info = info
      break
    }
  }
})
