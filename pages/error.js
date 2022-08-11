/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components"
import { useRouter } from "next/router"
import { Button } from "../components/global"

const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 150px);
  width: 100vw;
`

export default function Error() {
  const router = useRouter()
  const { message } = router.query

  return (
    <StyledError>
      <h1>Erreur</h1>
      <p>
        {message || "Cette page n'existe pas."}
      </p>
      <Button text="Aller à l'accueil" onClick={() => router.push("/")} width="70%"/>
    </StyledError>
  )
}