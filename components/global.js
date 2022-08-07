import { useState } from "react";
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Button
const ButtonStyled = styled.button.attrs((props) => {
  return {
    width: props.width ? props.width : "100%",
  }
})`
  background-color: var(--color-secondary);
  border-radius: 5px;
  padding: 18px;
  color: var(--color-font-primary);
  border: none;
  font-size: 16px;
  width: ${(props) => props.width};
`

export function Button(props) {
  return (
    <ButtonStyled {...props}>
      {props.text}
    </ButtonStyled>
  )
}

// ReadMore
const More = styled.span`
  font-family: "Gilroy", sans-serif;
  font-size: initial;
  margin-left: 10px;
`

export function ReadMore(props) {
  const [text, setText] = useState(props.text.slice(0, props.maxLength || 100));

  return (
    <span>
      {text}{(props.text.length > 100 && text.length <= 103) && "..."}
      {(props.text.length > 100 && text.length <= 103) &&
        <More onClick={() => setText(props.text)}>Plus</More>
      }
    </span>
  )
}

// Loader
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

export function Loader(props) {
  return (
    <div {...props}>
      <FontAwesomeIcon icon={faSpinner} size="xl" spin />
    </div>
  )
}

export function PageLoader(props) {
  return (
    <LoaderContainer {...props}>
      <FontAwesomeIcon icon={faSpinner} size="xl" spin />
    </LoaderContainer>
  )
}