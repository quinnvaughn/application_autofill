export type Race =
  | "White"
  | "Black"
  | "American Indian"
  | "Asian"
  | "Hispanic"
  | "Hawaiian"
  | "Two"
  | "Decline"
  | ""

export type Gender = "Male" | "Female" | "Decline" | ""

export type VeteranStatus = "Yes" | "No" | "Decline" | ""

export type DisabilityStatus = "Yes" | "No" | "Decline" | ""

export interface ApplicationInfo {
  race: Race
  hispanic: boolean | null
  gender: Gender
  veteranStatus: VeteranStatus
  firstName: string
  lastName: string
  email: string
  currentCompany: string
  phoneNumber: string
  linkedIn: string
  github: string
  portfolio: string
  twitter: string
  other: string
  basedIn: boolean | null
  authorized: boolean | null
  workVisa: boolean | null
  disability: DisabilityStatus
}

interface ApplicationInfoRequest {
  type: "REQ_APPLICATION_INFO"
}

interface ApplicationInfoResponse {
  type: "APPLICATION_INFO_STATUS"
  applicationInfo: ApplicationInfo
}

interface SetApplicationInfo {
  type: "SET_APPLICATION_INFO"
  applicationInfo: ApplicationInfo
}

export type MessageType =
  | ApplicationInfoRequest
  | ApplicationInfoResponse
  | SetApplicationInfo
