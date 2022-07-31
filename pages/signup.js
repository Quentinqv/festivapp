/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import styles from "../styles/Signin.module.css"
import Button from "../components/Button"
import logo_white from "../images/logo_white.svg"
import deco from "../images/deco.png"
import { toast } from 'react-toastify';

export default function Signup() {
  const validateForm = (e) => {
    e.preventDefault()

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
  }

  return (
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
    </div>
  )
}
