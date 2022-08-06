import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })
  const id = parseInt(req.query.id)

  if (req.method === "PATCH") {
    const like = await prisma.likes.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: id,
        }
      }
    })

    if (like) {
      await prisma.likes.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId: id,
          }
        }
      })

      const newNbLike = await prisma.nblike.upsert({
        where: {
          postId: id,
        },
        update: {
          nb: {
            decrement: 1,
          },
        },
        create: {
          nb: 1,
          postId: id,
        }
      })
      
      res.status(200).json(newNbLike)
    } else {
      await prisma.likes.create({
        data: {
          userId: session.user.id,
          postId: id,
        }
      })

      const newNbLike = await prisma.nblike.upsert({
        where: {
          postId: id,
        },
        update: {
          nb: {
            increment: 1,
          },
        },
        create: {
          nb: 1,
          postId: id,
        }
      })

      res.status(200).json(newNbLike)
    }

  } else {
    res.status(405).send("Method not allowed")
  }
}