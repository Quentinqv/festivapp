import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session, loading } = useSession()

  return (
    <>
      <nav>
        <ul className={`${!session && loading ? 'loading' : 'loaded'}`}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {/* Signin */}
          {!loading && !session && (
            <li>
              <Link href="#">
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    signIn()
                  }}
                >
                  Sign in
                </a>
              </Link>
            </li>
          )}
          {/* Signout */}
          {session && (
            <li>
              <Link href="#">
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    signOut()
                  }}
                >
                  Sign out
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}
