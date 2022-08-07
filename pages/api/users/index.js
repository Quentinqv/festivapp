import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default function handler(req, res) {

  // get all users id
  prisma.users.findMany({
    select: {
      id: true,
    },
  }).then((users) => {
    res.status(200).send(users)
  }).catch((err) => {
    res.status(500).send(err)
  })

}