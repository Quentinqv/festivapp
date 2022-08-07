/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Image from 'next/image'
import Post from '../components/Post'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { Loader } from '../components/global'
import { signIn, useSession } from 'next-auth/react' 

export default function Home() {
  const { session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })

  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const res = await fetch(`/api/posts`)
    const data = await res.json()
    setPosts(data)
  }
  useEffect(() => {
    fetchPosts()
  } , [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Festiv'App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.length == 0 && // if posts is empty, we display the loading animation
          <Loader />
        }
        {posts.map((post, index) => <Post key={index} post={post}/>)}
      </main>
    </div>
  )
}
