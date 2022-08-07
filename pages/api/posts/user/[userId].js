import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default function handler(req, res) {
  if (req.method === "GET") {
    // get post by userId
    const { userId } = req.query

    if (userId) {
      // get all posts
      prisma.posts.findMany({
        where: {
          userId: parseInt(userId),
        },
      }).then((posts) => {
        res.status(200).send(posts)
      }
      ).catch((err) => {
        res.status(500).send(err)
      })
    } else {
      res.status(400).send("Missing userId")
    }
  } else {
    res.status(405).send("Method not allowed")
  }
}