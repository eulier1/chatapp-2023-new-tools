import { prisma } from "../../prisma.js";

export const allMessage = prisma.message.findMany()