/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  faHeart,
  faPlusCircle,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { ReadMore, PageLoader } from "./global"
import moment from "moment"
import "moment/locale/fr"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

moment.locale("fr")

const PostStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // border: solid 1px #362679;
  border-radius: 5px;
  // background-color: #2C1F61;
  margin: 10px 0;

  .customDescription {
    outline: none;
    border: none;
    background-color: transparent;
    width: 100%;
    border-bottom: solid 1px #c4c4c4;
    padding: 10px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 10px;

  .username {
    font-family: "Gilroy", sans-serif;
  }

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`

const Image = styled.div`
  overflow: hidden;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 80vh;

  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    min-height: 200px;
    object-fit: cover;
  }
`

const Actions = styled.div.attrs((props) => {
  return {
    like: props.like ? "red" : "#C4C4C4",
  }
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 10px 20px;

  .like {
    color: ${(props) => props.like};
  }

  .nblike {
    font-family: "Gilroy", sans-serif;
  }

  .likeBeat {
    animation: heartBeat 0.3s 1;
  }

  @keyframes heartBeat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
`

const Description = styled.div`
  padding: 0 20px 10px 20px;

  .description {
    font-size: 14px;
    margin-top: 0px;
  }

  .username {
    font-size: initial;
    font-family: "Gilroy", sans-serif;
    padding-right: 5px;
  }

  .date {
    text-transform: uppercase;
    font-size: 12px;
    // text-align: right;
  }
`

const InputFiles = styled.div`
  .containerInput {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #000;
    width: 100vw;
    aspect-ratio: 1;
    padding: 0px;
  }

  .containerImage {
    margin-bottom: -4px;
  }

  .inputFiles {
    display: none;
  }
`

const Comments = styled.div`
  .noComments {
    padding: 0px 20px;
  }
`

const CommentsList = styled.div``

const CommentsForm = styled.form`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  textarea {
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: solid 1px #c4c4c4;
    padding: 5px;
    font-size: 14px;
    outline: none;
    box-sizing: border-box;
    resize: none;

    &:focus {
      transition: border-bottom 0.3s ease-in-out;
      outline: none;
      border-bottom: 1px solid var(--color-tertiary);
    }
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: var(--color-font-primary);
  }
`

const Comment = styled.div`
  padding: 0px 20px;
  display: flex;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  span {
    font-size: initial;
    font-family: "Gilroy", sans-serif;
    padding-right: 5px;
  }

  & > div > p:first-child {
    margin: 0px;
  }

  & > div > p:last-child {
    margin-top: 0px;
  }
`

export default function Post(props) {
  const { data: session, status } = useSession()
  const [post, setPost] = useState({
    id: 0,
    likes: [],
    nblike: 0,
    users: {
      avatar: "avatars/default",
    },
    content: {
      url: [],
    },
    nblike: {
      nb: 0,
    },
    description: "",
    user_has_comment: [],
  })
  const [like, setLike] = useState()
  const [nblike, setNblike] = useState(false)
  const [adding, setAdding] = useState(false)
  const [srcPreview, setSrcPreview] = useState("")

  const handleLike = async () => {
    const likeHeart = document.querySelector(`#post${post.id} .like`)
    likeHeart.classList.add("likeBeat")
    setTimeout(() => {
      likeHeart.classList.remove("likeBeat")
    }, 300)

    setLike(!like)
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        setNblike(data.nb)
      })
  }

  const handleAddImage = async (e) => {
    const input = document.querySelector(`#post${post.id} .inputFiles`)
    input.click()
  }

  const handleChange = async (event) => {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0])
      setSrcPreview(src)
    }
  }

  const handleComment = (e) => {
    let scroll_height = e.target.scrollHeight
    e.target.style.height = `${scroll_height}px`

    if (e.target.value === "") {
      e.target.style.height = "initial"
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()

    const comment = e.target.comment.value

    const res = await fetch(`/api/posts/comments/${post.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPost({
          ...post,
          user_has_comment: [
            ...post.user_has_comment,
            {
              users: {
                id: session.user.id,
                avatar: session.user.avatar,
                username: session.user.username,
              },
              comments: data,
            },
          ],
        })
        e.target.comment.value = ""
      })
  }

  useEffect(() => {
    if (session) {
      if (props.post) {
        setPost(props.post)
        setAdding(props.adding === undefined ? false : props.adding)
        setLike(post.likes.length > 0 ? true : false)
        setNblike(post.nblike === null ? 0 : post.nblike.nb)
      }
    }
  }, [session, props])

  if (status === "loading") {
    return <PageLoader />
  }

  if (status === "unauthenticated") {
    signIn()
    return <PageLoader />
  }

  return (
    <PostStyled id={`post${post.id}`}>
      <Header>
        <img
          src={`https://res.cloudinary.com/drbc8fw3u/image/upload/v1659792735/${post.users.avatar}`}
          alt="avatar"
        />
        <Link href={`/profile/${post.users.id}`}>
          <span className="username">{post.users.username}</span>
        </Link>
      </Header>
      <Image>
        <InputFiles onClick={handleAddImage}>
          <input
            type="file"
            name="image"
            className="inputFiles"
            accept="image/*"
            onChange={handleChange}
          />
          {adding && srcPreview === "" && (
            <div className="containerInput">
              <p>Ajouter une image</p>
              <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            </div>
          )}
          {adding && srcPreview !== "" && (
            <div className="containerImage">
              <img src={srcPreview} alt="preview" />
            </div>
          )}
        </InputFiles>
        {!adding &&
          post.content.url.map((image, index) => {
            return (
              <img
                key={index}
                src={`https://res.cloudinary.com/drbc8fw3u/image/upload/v1659792404/${image}`}
                alt="post"
              />
            )
          })}
      </Image>
      {!adding && (
        <Actions like={like}>
          <FontAwesomeIcon
            icon={faHeart}
            size="2x"
            className="like"
            onClick={handleLike}
          />
          <p className="nblike">
            {nblike.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} like
            {nblike > 1 && "s"}
          </p>
        </Actions>
      )}
      <Description>
        {!adding && (
          <>
            <p className="description">
              <Link href={`/profile/${post.users.id}`}>
                <span className="username">{post.users.username}</span>
              </Link>
              <ReadMore text={post.description} />
            </p>
            <p className="date">{moment(post.createdAt).fromNow()}</p>
          </>
        )}
        {adding && (
          <textarea
            className="customDescription"
            placeholder="Ajouter une description..."
            onChange={(element) => {
              element.target.style.height = "5px";
              element.target.style.height = (element.target.scrollHeight)+"px";
            }}
          ></textarea>
        )}
      </Description>
      {!adding &&
      <Comments>
        {post.user_has_comment.length > 0 && (
          <CommentsList>
            {post.user_has_comment.map((comment, index) => {
              return (
                <Comment key={index}>
                  <img
                    src={`https://res.cloudinary.com/drbc8fw3u/image/upload/v1659792735/${comment.users.avatar}`}
                  ></img>
                  <div>
                    <p>
                      <span>
                        <Link href={`/profile/${comment.users.id}`}>
                          {comment.users.username}
                        </Link>
                      </span>
                    </p>
                    <p>{comment.comments.content}</p>
                  </div>
                </Comment>
              )
            })}
          </CommentsList>
        )}
        {post.user_has_comment.length === 0 && (
          <p className="noComments">Aucun commentaire</p>
        )}
        <CommentsForm onSubmit={handleSubmitComment}>
          <textarea
            type="text"
            placeholder="Ajouter un commentaire..."
            name="comment"
            onChange={handleComment}
            rows="1"
          ></textarea>
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} size="xl" />
          </button>
        </CommentsForm>
      </Comments>}
    </PostStyled>
  )
}
