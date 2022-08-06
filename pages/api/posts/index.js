import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  // const session = await getSession({ req })

  const session = {
    user: {
      id: 19,
    }
  }

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
    }).then(posts => {
      res.status(200).json(posts)
    })
  } else {
    res.status(405).send("Method not allowed")
  }

  // res.status(200).json([
  //   {
  //     post: {
  //       like: true,
  //       nblike: 1521,
  //       description:
  //         "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //       timestamp: 1659725905,
  //       images: [
  //         "https://cdn.pixabay.com/photo/2018/09/14/23/28/avatar-3678347_960_720.png",
  //       ],
  //     },
  //     user: {
  //       avatar:
  //         "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
  //       username: "John Doe",
  //     },
  //   },
  // ])
}
