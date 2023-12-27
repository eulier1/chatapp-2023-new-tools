import { prisma } from "../utils/db";

export const getAllMessage = () => prisma.message.findMany()
export const postMessage = (message) => prisma.message.create({data: message})
export const updateMessage = () => prisma.message.findMany()
export const getMessage = (id) => prisma.message.findUnique({
    where: {
      id,
    },
})
export const deleteMessage = (id) => prisma.message.delete({
    where: {
      id,
    }
})