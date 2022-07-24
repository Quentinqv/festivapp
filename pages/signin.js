/* eslint-disable react/no-unescaped-entities */
import { signIn, getCsrfToken, getProviders } from "next-auth/react"
import Image from "next/image"
import Button from "../components/Button"
import styles from "../styles/Signin.module.css"
import logo_white from "../images/logo_white.svg"
import deco from "../images/deco.png"

const Signin = ({ csrfToken, providers }) => {
  return (
    <div className={styles.container} style={{backgroundImage: `url(${deco.src})`}}>
      <div style={{textAlign: "center"}}>
        <Image src={logo_white} alt="logo" />
      </div>
      <h1 className={styles.title}>Connexion</h1>
      <form method="post" action="/api/auth/callback/credentials" className={styles.form}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Nom d'utilisateur
          <input name="username" type="text" placeholder="Votre nom d'utilisateur" autoComplete="username"/>
        </label>
        <label>
          Mot de passe
          <input name="password" type="password" placeholder="Votre mot de passe" autoComplete="current-password"/>
        </label>
        <Button type="submit" text="Connexion" style={{ fontSize: "18px", fontWeight: "700" }}/>
      </form>
      <hr />
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name} style={{ marginBottom: 0 }}>
            <Button onClick={() => signIn(provider.id)} text={`Sign in with ${provider.name}`} style={{backgroundColor: "var(--color-quaternary)"}} />
          </div>
        ))}
    </div>
  )
}

export default Signin

export async function getServerSideProps(context) {
  const providers = await getProviders()
  // remove the credentials provider
  delete providers.credentials
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      csrfToken,
    },
  }
}
