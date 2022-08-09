import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })
  const id = parseInt(req.query.id)

  if (req.method === "GET") {
    if (id !== undefined) {
      prisma.posts.findUnique({
        include: {
          users: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
          nblike: true,
          likes: {
            where: {
              userId: session.user.id,
              postId: prisma.posts.id,
            }
          },
        },
        where: {
          id,
        },
      }).then((post) => {
        res.status(200).json(post)
      }).catch((err) => {
        res.status(500).json(err)
      })
    } else {
      res.status(400).json({
        message: "id is required",
      })
    }
  } else if (req.method === "PATCH") {
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
      
      res.status(200).send(newNbLike)
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

      res.status(200).send(newNbLike)
    }

  } else {
    res.status(405).send("Method not allowed")
  }
}