import { ApplicationInfo } from "../types"

export const createGenericInfo = (): ApplicationInfo => {
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
    authorized: null,
    workVisa: null,
    disability: "",
  }
}
