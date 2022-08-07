import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default function handler(req, res) {
  if (req.method === "GET") {
    // get user by id
    const { userId } = req.query

    if (userId) {
      // get user
      prisma.users.findUnique({
        where: {
          id: parseInt(userId),
        },
        // get number of posts
        select: {
          username: true,
          avatar: true,
          role: true,
          enabled: true,
          _count: {
            select: { posts: true || 0 },
          },
        },
      }).then((user) => {
        user._count.followers = 0
        user._count.following = 0
        res.status(200).send(user)
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