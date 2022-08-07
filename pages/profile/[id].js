/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components"
import Post from "../../components/Post"
import { getSession, signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { PageLoader, Button } from "../../components/global"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faSadCry } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useRouter } from "next/router"

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 20px;
  border-bottom: 1px solid #e6e6e6;
`

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
`

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`

const InfosUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  p {
    text-align: center;
    margin: 0;
  }

  p:last-child {
    font-size: 12px;
  }
`

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  margin-top: 40px;
`

const PostContainer = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  background-color: #fafafa;
`

const PostPreview = styled.img`
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`

const NoPosts = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  text-align: center;
`

export default function Profile(props) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { id } = router.query
  const [myProfile, setMyProfile] = useState(false)
  const [posts, setPosts] = useState(props.posts)
  const [infosUser, setInfosUser] = useState(props.user)
  const [idUser, setIdUser] = useState(id)

  useEffect(() => {
    if (session) {
      if (id === undefined || session.user.id === parseInt(id)) {
        setMyProfile(true)
        setIdUser(session.user.id)
      }
    }
  }, [id, session])

  if (status === "loading") {
    return <PageLoader />
  }

  if (status === "unauthenticated") {
    signIn()
    return <PageLoader />
  }

  return (
    <>
      <Header>
        <h1>{infosUser.username}</h1>
        {myProfile && <FontAwesomeIcon icon={faEdit} size="xl" />}
        {!myProfile && <Button text="Suivre" width="40%"></Button>}
      </Header>
      <Infos>
        <Avatar
          src={`https://res.cloudinary.com/drbc8fw3u/image/upload/v1659792735/${infosUser.avatar}`}
        />
        <InfosUser>
          <div>
            <p>{infosUser._count.posts}</p>
            <p>Publications</p>
          </div>
          <div>
            <p>{infosUser._count.followers}</p>
            <p>Abonnés</p>
          </div>
          <div>
            <p>{infosUser._count.following}</p>
            <p>Aonnements</p>
          </div>
        </InfosUser>
      </Infos>
      {posts.length === 0 && (
        <NoPosts>
          <FontAwesomeIcon icon={faSadCry} size="4x" />
          <p>Aucune publication</p>
          <p>La fête n'a pas encore commencé</p>
        </NoPosts>
      )}
      {posts.length > 0 && (
        <Posts>
          {posts.map((post) => (
            <PostContainer key={post.id}>
              <Link href={`/post/${post.id}`}>
                <PostPreview
                  src={`https://res.cloudinary.com/drbc8fw3u/image/upload/v1659792404/${post.content.url[0]}`}
                />
              </Link>
            </PostContainer>
          ))}
        </Posts>
      )}
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_URL}users`)
  const users = await res.json()
  const paths = users.map((user) => ({ params: { id: `${user.id}` } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const props = {}

  await fetch(`${process.env.API_URL}users/${params.id}`)
    .then((res) => res.json())
    .then((res) => {
      props.user = res
    })

  await fetch(`${process.env.API_URL}posts/user/${params.id}`)
    .then((res) => res.json())
    .then((res) => {
      props.posts = res
    })

  return {
    props: props,
  }
}
