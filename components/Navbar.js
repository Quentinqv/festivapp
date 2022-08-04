import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./Navbar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faMagnifyingGlass, faMapLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const { data: session, loading } = useSession()

  return (
    // <>
    //   <nav>
    //     <ul className={`${!session && loading ? 'loading' : 'loaded'}`}>
    //       <li>
    //         <Link href="/">
    //           <a>Home</a>
    //         </Link>
    //       </li>
    //       {/* Signin */}
    //       {!loading && !session && (
    //         <li>
    //           <Link href="#">
    //             <a
    //               onClick={(e) => {
    //                 e.preventDefault()
    //                 signIn()
    //               }}
    //             >
    //               Sign in
    //             </a>
    //           </Link>
    //         </li>
    //       )}
    //       {/* Signout */}
    //       {session && (
    //         <li>
    //           <Link href="#">
    //             <a
    //               onClick={(e) => {
    //                 e.preventDefault()
    //                 signOut()
    //               }}
    //             >
    //               Sign out
    //             </a>
    //           </Link>
    //         </li>
    //       )}
    //     </ul>
    //   </nav>
    // </>

    <nav className={styles.nav}>
      <div className={styles.add}><FontAwesomeIcon icon={faPlus} size="2x"/></div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">
            <a className={styles.navLink}><FontAwesomeIcon icon={faHouse} size="xl"/></a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/search">
            <a className={styles.navLink}><FontAwesomeIcon icon={faMagnifyingGlass} size="xl"/></a>
          </Link>
        </li>
        <li></li>
        <li className={styles.navItem}>
          <Link href="/map">
            <a className={styles.navLink}><FontAwesomeIcon icon={faMapLocationDot} size="xl"/></a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/profile">
            <a className={styles.navLink}><FontAwesomeIcon icon={faUser} size="xl"/></a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
