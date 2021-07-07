import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { Gender, MessageType, Race, VeteranStatus } from "./types"

const FormContainer = styled.div`
  width: 350px;
  height: 500px;
  display: flex;
  flex-direction: column;
`

const ButtonContainer = styled.div`
  margin: 0 16px 16px;
`

const CustomButton = styled.button`
  height: 40px;
  outline: none;
  cursor: pointer;
  padding: 0 16px;
  box-shadow: none;
  background-color: green;
  text-shadow: none;
  border: none;
  border-radius: 3px;
  width: 100%;
  color: white;
`

export const Form = () => {
  const [race, setRace] = useState<Race>("")
  const [hispanic, setHispanic] = useState<boolean | null>(null)
  const [gender, setGender] = useState<Gender>("")
  const [status, setStatus] = useState<VeteranStatus>("")

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
      applicationInfo: { race, hispanic, gender, veteranStatus: status },
    })
  }

  return (
    <FormContainer>
      <select
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
      </select>
      <fieldset>
        <legend>Hispanic or Latino?</legend>
        <label>
          Yes
          <input
            type="radio"
            value="true"
            checked={hispanic === true}
            onChange={() => setHispanic(true)}
          />
        </label>
        <label>
          No
          <input
            type="radio"
            value="false"
            checked={hispanic === false}
            onChange={() => setHispanic(false)}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Gender</legend>
        <label>
          Male
          <input
            type="radio"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value as Gender)}
          />
        </label>
        <label>
          Female
          <input
            type="radio"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value as Gender)}
          />
        </label>
        <label>
          Prefer not to answer
          <input
            type="radio"
            value="Decline"
            checked={gender === "Decline"}
            onChange={(e) => setGender(e.target.value as Gender)}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Veteran Status</legend>
        <label>
          Yes
          <input
            type="radio"
            value="Yes"
            checked={status === "Yes"}
            onChange={(e) => setStatus(e.target.value as VeteranStatus)}
          />
        </label>
        <label>
          No
          <input
            type="radio"
            value="No"
            checked={status === "No"}
            onChange={(e) => setStatus(e.target.value as VeteranStatus)}
          />
        </label>
        <label>
          Prefer to not answer
          <input
            type="radio"
            value="Decline"
            checked={status === "Decline"}
            onChange={(e) => setStatus(e.target.value as VeteranStatus)}
          />
        </label>
      </fieldset>
      <ButtonContainer>
        <CustomButton onClick={onSubmit}>Save</CustomButton>
      </ButtonContainer>
    </FormContainer>
  )
}
