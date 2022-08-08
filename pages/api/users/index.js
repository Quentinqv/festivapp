import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { getSession } from "next-auth/react"
const bcrypt = require("bcrypt")
import crypto from "crypto"

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (req.method === "GET") {
    // get all users id
    prisma.users
      .findMany({
        select: {
          id: true,
        },
      })
      .then((users) => {
        res.status(200).send(users)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  } else if (req.method === "PATCH") {
    const { id, username, email, role, password, avatar, old_avatar } = req.body
    const saltRounds = 10

    // check if user is authenticated
    if (!session.user) {
      res.status(401).send({ error: "Unauthorized" })
    }

    // check if user is authorized to update this user
    if (session.user.id !== parseInt(id)) {
      res.status(403).send({ error: "Forbidden" })
    }

    if (password) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        prisma.users.update({
          where: {
            id,
          },
          data: {
            password: hash,
          },
        })
      })
    }

    if (old_avatar != "avatars/default") {
      const timestamp = Date.now()
      const hash = crypto.createHash("sha1")
      hash.update(`public_id=${old_avatar}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
      const signature = hash.digest("hex")
  
      fetch(`https://api.cloudinary.com/v1_1/drbc8fw3u/image/destroy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: old_avatar,
          signature,
          timestamp,
          api_key: process.env.CLOUDINARY_API_KEY,
        }),
      })
    }

    // update user
    prisma.users
      .update({
        where: {
          id,
        },
        data: {
          username,
          email,
          role,
          avatar,
        },
      })
      .then((user) => {
        delete user.password
        res.status(200).send(user)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  } else {
    res.status(405).send("Method not allowed")
  }
}
