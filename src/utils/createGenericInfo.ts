import { ApplicationInfo } from "../types"

export function createGenericInfo(): ApplicationInfo {
  return {
    email: "",
    firstName: "",
    gender: "",
    github: "",
    hispanic: null,
    lastName: "",
    linkedIn: "",
    phoneNumber: "",
    portfolio: "",
    race: "",
    veteranStatus: "",
    currentCompany: "",
    twitter: "",
    other: "",
    basedIn: null,
  }
}
