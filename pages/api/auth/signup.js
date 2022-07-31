import { PrismaClient, Prisma } from "@prisma/client"
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

export default async function Signup(req, res) {
  // for request POST
  if (req.method === "POST") {
    // save the user
    const saltRounds = 10
    
    req.body = JSON.parse(req.body)
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        try {
          const user = await prisma.users.create({
            data: {
              username: req.body.username,
              email: req.body.email,
              password: hash,
              role: req.body.role,
              categories: req.body.categories ? [...req.body.categories] : [],
            },
          })

          res.status(200).json(user)
        } catch (e) {
          // throw e
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
              res.status(500).send({ error: `${e.meta.target} is already in use.` })
            }
          } else {
            res.status(500).send({ error: e })
          }
        }
      })
  } else {
    res.status(405).send("Method not allowed")
  }
}
