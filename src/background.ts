import { ApplicationInfo, MessageType } from "./types"
import { createGenericInfo } from "./utils/createGenericInfo"

const sendApplicationInfo = (info: ApplicationInfo) => {
  const message = { type: "APPLICATION_INFO_STATUS", applicationInfo: info }

  chrome.runtime.sendMessage(message)

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message)
      }
    })
  })
}

let info = createGenericInfo()

chrome.storage.local.get("applicationInfo", (res) => {
  if (res["race"]) {
    info = res as ApplicationInfo
  } else {
    info = info
  }
})

chrome.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case "REQ_APPLICATION_INFO": {
      sendApplicationInfo(info)
      break
    }
    case "SET_APPLICATION_INFO": {
      info = message.applicationInfo
      chrome.storage.local.set({ applicationInfo: info })
      sendApplicationInfo(info)
      break
    }
    default: {
      break
    }
  }
})
