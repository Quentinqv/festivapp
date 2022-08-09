/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Post from '../components/Post'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { Loader, PageLoader, Button } from '../components/global'
import { signIn, useSession } from 'next-auth/react'
import styled from 'styled-components'
import Image from 'next/image'
import LogoBlanc from '../images/logo_white.svg'
import Deco from '../images/deco.png'
import Link from 'next/link'

const ContainerHome = styled.div`
  height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`

const ContainerLogoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  h1 {
    text-align: center;
  }
`

const ContainerButtons = styled.div`
  width: 100%;

  button {
    margin: 10px 0
  }
`

const ButtonConnect = styled(Button)`
  background-color: #fff;
  color: #000;
`

export default function Home() {
  const { data: session, status } = useSession()

  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const res = await fetch(`/api/posts`)
    const data = await res.json()
    setPosts(data)
  }
  useEffect(() => {
    fetchPosts()
  } , [])

  if (status === "loading") {
    return <PageLoader />
  }

  if (status === "unauthenticated") {
    return (
      <ContainerHome>
        <Image src={LogoBlanc} alt="Logo"></Image>
        <ContainerLogoText>
          <Image src={Deco} alt="Deco"></Image>
          <h1>Rejoins l'aventure et partages tes souvenirs</h1>
        </ContainerLogoText>
        <ContainerButtons>
          <Link href="/signup">
            <Button text="S'inscrire"/>
          </Link>
          <ButtonConnect text="Se connecter" onClick={signIn}/>
        </ContainerButtons>
      </ContainerHome>
    )
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {posts.length == 0 && // if posts is empty, we display the loading animation
          <Loader />
        }
        {posts.map((post, index) => <Post key={index} post={post}/>)}
      </main>
    </div>
  )
}
