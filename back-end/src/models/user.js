import { prisma } from "../utils/db";

export const getAllUsers = () => prisma.user.findMany()
export const postUser = (user) => prisma.user.create({data: user})
export const updateUser = ({id, user}) => prisma.message.update({
    where: {
      id
    },
    data : user,
  })
export const getUser = (id) => prisma.user.findUnique({
    where: {
      id,
    },
})
export const deleteMessage = (id) => prisma.user.delete({
    where: {
      id,
    }
})