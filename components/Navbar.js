import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./Navbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHouse,
  faUser,
  faMagnifyingGlass,
  faMapLocationDot,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className={styles.nav}>
      <div className={styles.add}>
        <Link href="/add">
          <a>
            <FontAwesomeIcon icon={faPlus} size="2x" />
          </a>
        </Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">
            <a className={styles.navLink}>
              <FontAwesomeIcon icon={faHouse} size="xl" />
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/search">
            <a className={styles.navLink}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </a>
          </Link>
        </li>
        <li></li>
        <li className={styles.navItem}>
          <Link href="/map">
            <a className={styles.navLink}>
              <FontAwesomeIcon
                icon={faMapLocationDot}
                size="xl"
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              />
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href={`/profile/${session && session.user.id}`}>
            <a className={styles.navLink}>
              <FontAwesomeIcon icon={faUser} size="xl" />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
