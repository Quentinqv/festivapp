import styled from "styled-components"

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
