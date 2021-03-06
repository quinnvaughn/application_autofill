import React, { useEffect } from "react"
import { useSetState } from "react-use"
import { CustomFieldset } from "../CustomFieldset/CustomFieldset"
import { CustomInput } from "../CustomInput/CustomInput"
import { CustomRadio } from "../CustomRadio/CustomRadio"
import { CustomSelect } from "../CustomSelect/CustomSelect"
import { Section } from "../Section/Section"
import {
  DisabilityStatus,
  Gender,
  MessageType,
  Race,
  VeteranStatus,
} from "../../types"
import { FormContainer, FormContent } from "./Form.styles"
import { CustomButton } from "../CustomButton/CustomButton"
import { createGenericInfo } from "../../utils/createGenericInfo"

let defaultState = createGenericInfo()

export const Form = () => {
  // const [state, dispatch] = useReducer(reducer, defaultState)
  const [state, setState] = useSetState({ ...defaultState })

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "REQ_APPLICATION_INFO" })
  }, [])

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: MessageType) => {
      switch (message.type) {
        case "APPLICATION_INFO_STATUS": {
          setState({ ...message.applicationInfo })
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
      applicationInfo: state,
    })
  }

  return (
    <FormContainer>
      <FormContent>
        <Section title="Basic info">
          <CustomInput
            for="firstName"
            label="First name"
            value={state.firstName}
            onChange={(e) => setState({ firstName: e.target.value })}
          />
          <CustomInput
            for="lastName"
            label="Last name"
            value={state.lastName}
            onChange={(e) => setState({ lastName: e.target.value })}
          />
          <CustomInput
            for="email"
            label="Email"
            value={state.email}
            onChange={(e) => setState({ email: e.target.value })}
          />
          <CustomInput
            for="phoneNumber"
            label="Phone"
            value={state.phoneNumber}
            onChange={(e) => setState({ phoneNumber: e.target.value })}
          />
          <CustomInput
            for="currentCompany"
            label="Current Company"
            value={state.currentCompany}
            onChange={(e) => setState({ currentCompany: e.target.value })}
          />
        </Section>
        <Section title="Links">
          <CustomInput
            for="linkedIn"
            label="LinkedIn"
            value={state.linkedIn}
            onChange={(e) => setState({ linkedIn: e.target.value })}
          />
          <CustomInput
            for="twitter"
            label="Twitter"
            value={state.twitter}
            onChange={(e) => setState({ twitter: e.target.value })}
          />
          <CustomInput
            for="github"
            label="Github"
            value={state.github}
            onChange={(e) => setState({ github: e.target.value })}
          />
          <CustomInput
            for="portfolio"
            label="Portfolio"
            value={state.portfolio}
            onChange={(e) => setState({ portfolio: e.target.value })}
          />
          <CustomInput
            for="otherWebsite"
            label="Other Website"
            value={state.other}
            onChange={(e) => setState({ other: e.target.value })}
          />
        </Section>
        <Section title="Demographic Info">
          <CustomFieldset legend="Currently based in the US?">
            <CustomRadio
              label="Yes"
              value="true"
              name="basedIn"
              checked={state.basedIn === true}
              onChange={() => setState({ basedIn: true })}
            />
            <CustomRadio
              label="No"
              value="false"
              name="basedIn"
              checked={state.basedIn === false}
              onChange={() => setState({ basedIn: false })}
            />
          </CustomFieldset>
          <CustomSelect
            label="Race"
            defaultValue="Please Select"
            value={state.race}
            onChange={(e) => setState({ race: e.target.value as Race })}
          >
            <option disabled={state.race.length > 0} value="Please Select">
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
              checked={state.hispanic === true}
              onChange={() => setState({ hispanic: true })}
            />
            <CustomRadio
              label="No"
              value="false"
              name="hispanic"
              checked={state.hispanic === false}
              onChange={() => setState({ hispanic: false })}
            />
          </CustomFieldset>
          <CustomFieldset legend="Gender">
            <CustomRadio
              label="Male"
              value="Male"
              name="gender"
              checked={state.gender === "Male"}
              onChange={(e) => setState({ gender: e.target.value as Gender })}
            />
            <CustomRadio
              label="Female"
              value="Female"
              name="gender"
              checked={state.gender === "Female"}
              onChange={(e) => setState({ gender: e.target.value as Gender })}
            />
            <CustomRadio
              label="Prefer not to answer"
              value="Decline"
              name="gender"
              checked={state.gender === "Decline"}
              onChange={(e) => setState({ gender: e.target.value as Gender })}
            />
          </CustomFieldset>
          <CustomFieldset legend="Veteran Status">
            <CustomRadio
              label="Yes"
              value="Yes"
              name="veteran"
              checked={state.veteranStatus === "Yes"}
              onChange={(e) =>
                setState({ veteranStatus: e.target.value as VeteranStatus })
              }
            />
            <CustomRadio
              label="No"
              value="No"
              name="veteran"
              checked={state.veteranStatus === "No"}
              onChange={(e) =>
                setState({ veteranStatus: e.target.value as VeteranStatus })
              }
            />
            <CustomRadio
              label="Prefer to not answer"
              value="Decline"
              name="veteran"
              checked={state.veteranStatus === "Decline"}
              onChange={(e) =>
                setState({ veteranStatus: e.target.value as VeteranStatus })
              }
            />
          </CustomFieldset>
          <CustomFieldset legend="Disabled?">
            <CustomRadio
              label="Yes"
              value="Yes"
              name="disability"
              checked={state.disability === "Yes"}
              onChange={(e) =>
                setState({ disability: e.target.value as DisabilityStatus })
              }
            />
            <CustomRadio
              label="No"
              value="No"
              name="disability"
              checked={state.disability === "No"}
              onChange={(e) =>
                setState({ disability: e.target.value as DisabilityStatus })
              }
            />
            <CustomRadio
              label="Prefer to not answer"
              value="Decline"
              name="disability"
              checked={state.disability === "Decline"}
              onChange={(e) =>
                setState({ disability: e.target.value as DisabilityStatus })
              }
            />
          </CustomFieldset>
        </Section>
        <Section title="Additional Info">
          <CustomFieldset legend="Are you legally authorized to work in the United States?">
            <CustomRadio
              label="Yes"
              value="true"
              name="authorized"
              checked={state.authorized === true}
              onChange={() => setState({ authorized: true })}
            />
            <CustomRadio
              label="No"
              value="false"
              name="authorized"
              checked={state.authorized === false}
              onChange={() => setState({ authorized: false })}
            />
          </CustomFieldset>
          <CustomFieldset legend="Will you require a visa sponsorship now or in the future?">
            <CustomRadio
              label="Yes"
              value="true"
              name="workVisa"
              checked={state.workVisa === true}
              onChange={() => setState({ workVisa: true })}
            />
            <CustomRadio
              label="No"
              value="false"
              name="workVisa"
              checked={state.workVisa === false}
              onChange={() => setState({ workVisa: false })}
            />
          </CustomFieldset>
        </Section>
      </FormContent>
      <CustomButton onClick={onSubmit}>Submit</CustomButton>
    </FormContainer>
  )
}
