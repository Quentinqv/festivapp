// Check if the column exists in the database:
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (req.method === "POST") {
    const { column, value } = req.body
    const notId = session ? {NOT: {id: session.user.id}} : {}

    prisma.users.findMany({
      where: {
        [column]: value,
        ...notId,
      },
      select: {
        id: true,
        [column]: true,
      }
    }).then((user) => {
      res.status(200).json(user)
    }).catch((err) => {
      res.status(500).send(err)
    })
  } else {
    res.status(405).send("Method not allowed")
  }
}