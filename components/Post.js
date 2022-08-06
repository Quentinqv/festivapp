/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { ReadMore } from "./global";
import moment from 'moment';
import 'moment/locale/fr';
import { useState } from "react";

moment.locale('fr');

const PostStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: solid 1px #362679;
  border-radius: 5px;
  background-color: #2C1F61;
  margin: 10px 0
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
    text-align: right;
  }
`

export default function Post(props) {
  const [like, setLike] = useState(props.post.likes.length > 0 ? true : false)
  const [nblike, setNblike] = useState(props.post.nblike === null ? 0 : props.post.nblike.nb)

  const handleLike = async () => {
    const likeHeart = document.querySelector(`#post${props.post.id} .like`)
    likeHeart.classList.add("likeBeat")
    setTimeout(() => {
      likeHeart.classList.remove("likeBeat")
    }, 300);

    setLike(!like)
    const res = await fetch(`/api/posts/${props.post.id}`, {
      method: "PATCH",
    }).then(res => res.json())
    .then(data => {
      setNblike(data.nb)
    })
  }

  return (
    <PostStyled id={`post${props.post.id}`}>
      <Header>
        <img src={props.post.users.avatar} alt="avatar" />
        <span className="username">{props.post.users.username}</span>
      </Header>
      <Image>
        {props.post.content.url.map((image, index) => {
          return <img key={index} src={image} alt="post" />
        })}
      </Image>
      <Actions like={like}>
        <FontAwesomeIcon icon={faHeart} size="2x" className="like" onClick={handleLike}/>
        <p className="nblike">{nblike.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} like{nblike > 1 && 's'}</p>
      </Actions>
      <Description>
        <p className="description">
          <span className="username">{props.post.users.username}</span>
          <ReadMore text={props.post.description} />
        </p>
        <p className="date">{moment(props.post.createdAt).fromNow()}</p>
      </Description>
    </PostStyled>
  )
}
