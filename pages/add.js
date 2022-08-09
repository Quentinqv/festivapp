/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components"
import Post from "../components/Post"
import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { PageLoader, Button } from "../components/global"
import Head from "next/head"
import Header from "../components/Header"

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 20px;
`

export default function AddPost() {
  const { data: session, status } = useSession()
  const [post, setPost] = useState({
    userId: 0,
    content: {
      url: [],
    },
    description: "",
    users: {
      username: "",
      avatar: "avatars/default",
    },
    nblike: null,
    likes: [],
  })

  useEffect(() => {
    if (session) {
      setPost({
        userId: session.user.id,
        content: {
          url: [],
        },
        description: "",
        users: session.user,
        nblike: null,
        likes: [],
      })
    }
  }, [session])

  if (status === "loading") {
    return <PageLoader />
  }

  if (status === "unauthenticated") {
    signIn()
    return <PageLoader />
  }

  const handleAdd = async () => {
    const inputFile = document.querySelector(".inputFiles")

    const formData = new FormData()

    for (const file of inputFile.files) {
      formData.append("file", file)
    }

    formData.append("upload_preset", "festivapp-posts")

    const data = await fetch("https://api.cloudinary.com/v1_1/drbc8fw3u/image/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json())

    post.description = document.querySelector(".customDescription").innerHTML
    post.content.url = [data.public_id]

    // post.content.url = ["posts/test"]

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then((res) => res.json())

    if (res) {
      window.location.href = "/"
    }
  }

  return (
    <>
      <Head>
        <title>Publier • Festiv'app</title>
      </Head>
      <Header />
      <HeaderStyled>
        <h1>Ajouter un post</h1>
        <Button text="Publier" width="30%" onClick={handleAdd}/>
      </HeaderStyled>
      <Post post={post} adding={true} />
    </>
  )
}
