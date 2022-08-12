/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import styles from "../styles/Signin.module.css"
import { Button } from "../components/global"
import logo_white from "../images/logo_white.svg"
import deco from "../images/deco.png"
import { toast } from 'react-toastify';
import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"
import { useState } from "react"

const SigninButton = styled(Button)`
  background-color: var(--color-quaternary);
  font-weight: 700;
  font-size: 18px;
`

export default function Signup() {
  const [isUsername, setIsUsername] = useState(false)
  const [isEmail, setIsEmail] = useState(false)

  const validateForm = (e) => {
    e.preventDefault()

    if (isUsername && isEmail) {
      const form = e.target
  
      fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          username: form.username.value,
          email: form.email.value,
          password: form.password.value,
          role: form.role.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            toast.error(res.error, {
              theme: "colored",
            })
          } else {
            window.location.href = "/signin?userCreated=true"
          }
        })
    } else {
      toast.error("Tous les champs ne sont pas remplis correctement", {
        theme: "colored",
      })
    }

  }

  const searchInfo = async (e) => {
    const column = e.target.name
    const value = e.target.value

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
          if (column === "username") {
            setIsUsername(true)
          }
          if (column === "email") {
            setIsEmail(true)
          }
          return true
        } else {
          toast.dismiss()
          toast.error(`${column.charAt(0).toUpperCase() + column.slice(1)} already taken`, {
            theme: "colored",
          })
          if (column === "username") {
            setIsUsername(false)
          }
          if (column === "email") {
            setIsEmail(false)
          }
          return false
        }
      })
  }

  return (
    <>
    <Head>
      <title>Inscription • Festiv'app</title>
    </Head>
    <div className={styles.container} style={{backgroundImage: `url(${deco.src})`}}>
      <div style={{ textAlign: "center" }}>
        <Image src={logo_white} alt="logo" />
      </div>
      <h1 className={styles.title}>Inscription</h1>
      <form className={styles.form} onSubmit={validateForm}>
        <label>
          <span>
            Nom d'utilisateur<sup>*</sup>
          </span>
          <input
            type="text"
            placeholder="Votre nom d'utilisateur"
            autoComplete="username"
            name="username"
            required
            onChange={searchInfo}
          />
        </label>
        <label>
          <span>
            Email<sup>*</sup>
          </span>
          <input
            type="email"
            placeholder="Votre email"
            autoComplete="email"
            name="email"
            required
            onChange={searchInfo}
          />
        </label>
        <label>
          <span>
            Mot de passe<sup>*</sup>
          </span>
          <input
            type="password"
            placeholder="Votre mot de passe"
            autoComplete="current-password"
            name="password"
            required
          />
        </label>
        <label>
          <span>Rôle<sup>*</sup></span>
          <div className={styles.roles}>
            <input type="radio" name="role" value="personnal" id="personnalRole" required/>
            <label className={styles.role} htmlFor="personnalRole">Festivalier</label>
            <input type="radio" name="role" value="professional" id="professionalRole" required/>
            <label className={styles.role} htmlFor="professionalRole">Festival</label>
          </div>
        </label>
        <Button
          type="submit"
          text="Inscription"
          style={{ fontSize: "18px", fontWeight: "700" }}
        />
      </form>
      <hr></hr>
      <Link href="/signin">
        <SigninButton text="Se connecter"></SigninButton>
      </Link>
    </div>
    </>
  )
}
