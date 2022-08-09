import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })
  const id = parseInt(req.query.id)

  if (session.user === undefined) {
    res.status(401).json({
      message: "You must be logged in to do this",
    })
  } else {
    if (req.method === "POST") {
      prisma.comments.create({
        data: {
          content: req.body.comment,
        },
      }).then((comment) => {
        prisma.user_has_comment.create({
          data: {
            userId: session.user.id,
            commentId: comment.id,
            postId: id,
          },
        }).then((user_has_comment) => {
          res.status(200).json(comment)
        }).catch((err) => {
          res.status(500).json(err)
        })
      }).catch((err) => {
        res.status(500).json(err)
      })
    } else {
      req.status(405).send("Method not allowed")
    }
  }
}