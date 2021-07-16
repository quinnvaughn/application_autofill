import { DisabilityStatus, MessageType, VeteranStatus } from "../types"
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
  return value === null ? null : value === true ? "Yes" : "No"
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

const disabilityValue = (disability: DisabilityStatus) => {
  return disability === "Yes"
    ? "Yes"
    : disability === "No"
    ? "No"
    : disability === "Decline"
    ? "answer"
    : ""
}

chrome.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case "APPLICATION_INFO_STATUS": {
      info = { ...message.applicationInfo }
      findSelects("Gender", info.gender)
      findSelects("Hispanic", booleanValue(info.hispanic))
      // This may be race or ethnicity, so check for both.
      findSelects("Race", info.race)
      findSelects("Ethnicity", info.race)
      findSelects("Veteran", veteranValue(info.veteranStatus))
      findSelects("Veteran", otherVeteranValue(info.veteranStatus))
      findSelects("Legally authorized", booleanValue(info.authorized))
      findSelects("Work visa", booleanValue(info.workVisa))
      findSelects("Sponsorship", booleanValue(info.workVisa))
      findSelects("Disability", disabilityValue(info.disability))
      findLabels("First name", info.firstName)
      findLabels("Last name", info.lastName)
      findLabels("Full name", info.firstName + " " + info.lastName)
      findLabels("Email", info.email)
      findLabels("Phone", info.phoneNumber)
      findLabels("LinkedIn", info.linkedIn)
      findLabels("Github", info.github)
      findLabels("Portfolio", info.portfolio)
      findLabels("Other", info.other)
      // A lot of websites use the word website instead of portfolio.
      // This makes sure that other website isn't included, as that is what
      // other is looking for. They might be the same thing, but we don't
      // want to assume.
      findLabels("Website", info.portfolio, "Other")
      findLabels("Twitter", info.twitter)
      findLabels("Current company", info.currentCompany)
      findCheckboxesAndRadios("Based in", booleanValue(info.basedIn))
      findCheckboxesAndRadios("Gender", info.gender)
    }
    default: {
      info = info
      break
    }
  }
})
