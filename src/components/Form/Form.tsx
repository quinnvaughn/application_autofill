import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { CustomFieldset } from "../CustomFieldset/CustomFieldset"
import { CustomInput } from "../CustomInput/CustomInput"
import { CustomRadio } from "../CustomRadio/CustomRadio"
import { CustomSelect } from "../CustomSelect/CustomSelect"
import { Section } from "../Section/Section"
import { Gender, MessageType, Race, VeteranStatus } from "../../types"
import { FormContainer } from "./Form.styles"
import { CustomButton } from "../CustomButton/CustomButton"

export const Form = () => {
  const [race, setRace] = useState<Race>("")
  const [hispanic, setHispanic] = useState<boolean | null>(null)
  const [gender, setGender] = useState<Gender>("")
  const [status, setStatus] = useState<VeteranStatus>("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [github, setGithub] = useState("")
  const [portfolio, setPortfolio] = useState("")

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "REQ_APPLICATION_INFO" })
  }, [])

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: MessageType) => {
      switch (message.type) {
        case "APPLICATION_INFO_STATUS": {
          setRace(message.applicationInfo.race)
          setHispanic(message.applicationInfo.hispanic)
          setGender(message.applicationInfo.gender)
          setStatus(message.applicationInfo.veteranStatus)
          setFirstName(message.applicationInfo.firstName)
          setLastName(message.applicationInfo.lastName)
          setEmail(message.applicationInfo.email)
          setPhoneNumber(message.applicationInfo.phoneNumber)
          setLinkedIn(message.applicationInfo.linkedIn)
          setGithub(message.applicationInfo.github)
          setPortfolio(message.applicationInfo.portfolio)
        }
        default: {
          break
        }
      }
    })
  }, [])

  const onSubmit = () => {
    chrome.runtime.sendMessage({
      type: "SET_APPLICATION_INFO",
      applicationInfo: {
        race,
        hispanic,
        gender,
        veteranStatus: status,
        firstName,
        lastName,
        email,
        phoneNumber,
        linkedIn,
        portfolio,
        github,
      },
    })
  }

  return (
    <FormContainer>
      <Section title="Basic info">
        <CustomInput
          for="firstName"
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <CustomInput
          for="lastName"
          label="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <CustomInput
          for="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomInput
          for="phoneNumber"
          label="Phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Section>
      <Section title="Links">
        <CustomInput
          for="linkedIn"
          label="LinkedIn"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
        />
        <CustomInput
          for="github"
          label="Github"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
        <CustomInput
          for="portfolio"
          label="Portfolio"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
        />
      </Section>
      <Section title="Demographic Info">
        <CustomSelect
          defaultValue="Please Select"
          value={race}
          onChange={(e) => setRace(e.target.value as Race)}
        >
          <option disabled={race.length > 0} value="Please Select">
            Please Select
          </option>
          <option value="American Indian">
            American Indian or Alaskan Native
          </option>
          <option value="Asian">Asian</option>
          <option value="Black">Black or African American</option>
          <option value="Hispanic">Hispanic or Latino</option>
          <option value="White">White</option>
          <option value="Hawaiian">
            Native Hawaiian or Other Pacific Islander
          </option>
          <option value="Two">Two or more races</option>
          <option value="Decline">Decline to self indentify</option>
        </CustomSelect>
        <CustomFieldset legend="Hispanic or Latino?">
          <CustomRadio
            label="Yes"
            value="true"
            name="hispanic"
            checked={hispanic === true}
            onChange={() => setHispanic(true)}
          />
          <CustomRadio
            label="No"
            value="false"
            name="hispanic"
            checked={hispanic === false}
            onChange={() => setHispanic(false)}
          />
        </CustomFieldset>
        <CustomFieldset legend="Gender">
          <CustomRadio
            label="Male"
            value="Male"
            name="gender"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value as Gender)}
          />
          <CustomRadio
            label="Female"
            value="Female"
            name="gender"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value as Gender)}
          />
          <CustomRadio
            label="Prefer not to answer"
            value="Decline"
            name="gender"
            checked={gender === "Decline"}
            onChange={(e) => setGender(e.target.value as Gender)}
          />
        </CustomFieldset>
        <CustomFieldset legend="Veteran Status">
          <CustomRadio
            label="Yes"
            value="Yes"
            name="veteran"
            checked={status === "Yes"}
            onChange={(e) => setStatus(e.target.value as VeteranStatus)}
          />
          <CustomRadio
            label="No"
            value="No"
            name="veteran"
            checked={status === "No"}
            onChange={(e) => setStatus(e.target.value as VeteranStatus)}
          />
          <CustomRadio
            label="Prefer to not answer"
            value="Decline"
            name="veteran"
            checked={status === "Decline"}
            onChange={(e) => setStatus(e.target.value as VeteranStatus)}
          />
        </CustomFieldset>
      </Section>
      <CustomButton onClick={onSubmit}>Submit</CustomButton>
    </FormContainer>
  )
}
