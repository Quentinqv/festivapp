import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { useRouter } from "next/router"

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
`

const HeaderLeft = styled.div``

export default function Header() {
  const router = useRouter()

  return (
    <HeaderStyled>
      <HeaderLeft>
        <FontAwesomeIcon icon={faArrowLeft} size="xl" onClick={() => router.back()}/>
      </HeaderLeft>
    </HeaderStyled>
  )
}