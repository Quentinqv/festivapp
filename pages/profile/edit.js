/* eslint-disable react/no-unescaped-entities */
import { faCheck, faCross, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import styles from "../../styles/Signin.module.css"
import { Button, PageLoader } from "../../components/global"
import { useSession, signOut, signIn } from "next-auth/react"
import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { toast } from "react-toastify"
import Head from "next/head"

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 20px;
  border-bottom: 1px solid #e6e6e6;

  h2 {
    margin: 0;
  }

  .left {
    display: flex;
    align-items: flex-end;
    gap: 30px;
  }

  svg:not(.left svg) {
    color: var(--color-secondary);
  }
`

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  min-height: 70vh;

  #file {
    display: none;
  }

  #file + label {
    margin-top: 10px;
    color: var(--color-secondary);
    font-size: 18px;
  }
`

const Avatar = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  border-radius: 50%;
  min-width: 50px;
  max-width: 100px;
`

const InfosUser = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  margin-top: 40px;
`

const Champ = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    color: #c4c4c4;
    font-size: 14px;

    span {
      font-size: 12px;
    }
  }

  input {
    padding: 5px 5px 5px 0;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid var(--color-secondary);
    font-size: 18px;

    &:focus {
      transition: border-bottom 0.3s ease-in-out;
      outline: none;
      border-bottom: 1px solid var(--color-tertiary);
    }
  }
`

const Action = styled.div`
  margin-top: auto;
  width: 100%;
  padding: 0 20px;
`

export default function EditProfile() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState({})
  const [passwords, setPasswords] = useState({
    password: "",
    passwordConfirm: "",
  })
  const [currentSearch, setCurrentSearch] = useState({
    column: "",
    value: "",
  })
  const [srcPreview, setSrcPreview] = useState("")

  const handleRole = () => {
    const role = document.querySelector('input[name="role"]:checked').value
    user.role = role
  }

  const searchInfo = useCallback(async (column, value) => {
    column = column !== undefined ? column : currentSearch.column
    value = value !== undefined ? value : currentSearch.value

    await fetch("/api/users/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        column: column,
        value: value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          setUser((u) => ({
            ...u,
            [column]: value,
          }))
          return true
        } else {
          toast.dismiss()
          toast.error(`${column.charAt(0).toUpperCase() + column.slice(1)} already taken`, {
            theme: "colored",
          })
          return false
        }
      })
  }, [currentSearch])

  const handleInfo = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    setCurrentSearch({ column: e.target.name, value: e.target.value })
  }

  const handleAvatar = async (event) => {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0])
      setSrcPreview(src)
    }
  }

  const handleSave = async () => {
    const inputFile = document.querySelector(".inputFiles")

    if (passwords.password !== "" || passwords.passwordConfirm !== "") {
      if (
        !passwords.password.match(
          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
        )
      ) {
        toast.dismiss()
        toast.error(
          "Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
          {
            theme: "colored",
          }
        )
        return false
      } else {
        if (passwords.password !== passwords.passwordConfirm) {
          toast.dismiss()
          toast.error("Les mots de passe ne correspondent pas", {
            theme: "colored",
          })
          return false
        }
      }
    }

    if (!searchInfo("username", user.username)) {
      return false
    }

    if (!searchInfo("email", user.email)) {
      return false
    }

    const { id, username, email, role } = user
    const res = await fetch(`/api/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        username,
        email,
        role,
        password: passwords.password,
      }),
    })

    if (inputFile.files.length > 0) {
      const formData = new FormData()
  
      for (const file of inputFile.files) {
        formData.append("file", file)
      }
  
      formData.append("upload_preset", "festivapp-avatars")
  
      const resImage = await fetch("https://api.cloudinary.com/v1_1/drbc8fw3u/image/upload", {
        method: "POST",
        body: formData,
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.public_id) {
          fetch(`/api/users`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              avatar: res.public_id,
              old_avatar: user.avatar,
            }),
          })
        }
      })
    }

    const data = await res.json()
    if (data.error) {
      toast.error("Une erreur est survenue", {
        theme: "colored",
      })
    } else {
      toast.success("Profil mis à jour", {
        theme: "colored",
      })
      session.user = data
      signOut()
    }
  }

  useEffect(() => {
    if (session) {
      setUser(session.user)
      document.querySelector(
        `input[type="radio"][value="${session.user.role}"]`
      ).checked = true
    }

    if (currentSearch.column !== "" && currentSearch.value !== "") {
      const timer = setTimeout(() => {
        searchInfo()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [session, currentSearch, searchInfo])

  if (status === "loading") {
    return <PageLoader />
  }

  if (status === "unauthenticated") {
    signIn()
    return <PageLoader />
  }

  return (
    <>
      <Head>
        <title>Modifier le profil • Festiv'app</title>
      </Head>
      <Header>
        <div className="left">
          <Link href={`/profile/${user !== {} && user.id}`}>
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </Link>
          <h2>Modifer le profil</h2>
        </div>
        <FontAwesomeIcon icon={faCheck} size="2x" onClick={handleSave} />
      </Header>
      <Infos>
        <Avatar
          src={ srcPreview !== "" ? srcPreview : (`https://res.cloudinary.com/drbc8fw3u/image/upload/v1659792735/${
            user !== {} && user.avatar
          }`)}
        />
        <input type="file" name="file" id="file" className="inputFiles" onChange={handleAvatar}/>
        <label htmlFor="file">Changer ma photo de profil</label>
        <InfosUser>
          <Champ>
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              defaultValue={user.username}
              onChange={handleInfo}
            />
          </Champ>
          <Champ>
            <label>Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              onChange={handleInfo}
            />
          </Champ>
          <Champ>
            <label>Type de compte</label>
            <div className={styles.roles}>
              <input
                type="radio"
                name="role"
                value="personnal"
                id="personnalRole"
                required
                onChange={handleRole}
              />
              <label className={styles.role} htmlFor="personnalRole">
                Festivalier
              </label>
              <input
                type="radio"
                name="role"
                value="professional"
                id="professionalRole"
                required
                onChange={handleRole}
              />
              <label className={styles.role} htmlFor="professionalRole">
                Festival
              </label>
            </div>
          </Champ>
          <Champ>
            <label>
              Mot de passe <span>(Vide pour ignorer)</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) =>
                setPasswords({ ...passwords, password: e.target.value })
              }
            />
          </Champ>
          <Champ>
            <label>Confirmation du mot de passe</label>
            <input
              type="password"
              name="passwordconfirm"
              onChange={(e) =>
                setPasswords({ ...passwords, passwordConfirm: e.target.value })
              }
            />
          </Champ>
        </InfosUser>
        <Action>
          <Button text="Désactiver mon compte" error={true}></Button>
        </Action>
      </Infos>
    </>
  )
}
