import { prisma } from "../../db";

export const getAllUsers = () => prisma.user.findMany()