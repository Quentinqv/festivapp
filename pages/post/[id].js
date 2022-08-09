import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { PageLoader, Button } from "../../components/global"
import { getSession, signIn, signOut, useSession } from "next-auth/react"
import Post from "../../components/Post"
import Header from "../../components/Header"

export default function PostUnique() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState()

  useEffect(() => {
    if (id !== undefined) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setPost(res)
        })
    }
  }, [id])

  if (status === "loading") {
    return <PageLoader />
  }

  if (status === "unauthenticated") {
    signIn()
    return <PageLoader />
  }

  return (
    <>
      <Header />
      <Post post={post}/>
    </>
  )
}