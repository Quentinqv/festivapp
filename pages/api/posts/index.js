import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })

  // const session = {
  //   user: {
  //     id: 19,
  //   }
  // }

  if (req.method === "GET") {
    await prisma.posts.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    }).then(posts => {
      res.status(200).send(posts)
    })
  } else if (req.method === "POST") {
    const { content, description } = req.body
    await prisma.posts.create({
      data: {
        content,
        description,
        userId: session.user.id,
      },
    }).then(post => {
      res.status(200).send(post)
    })
  } else {
    res.status(405).send("Method not allowed")
  }
}
