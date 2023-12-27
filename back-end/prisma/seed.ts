import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  const alice = await prisma.user.create({
    data: {
      email : 'alice@prisma.io',
      name: 'Alice',
      userId: "",
    },
  })
  const bob = await prisma.user.create({
    data: {
      email : 'bob@prisma.io',
      name: 'Bob',
      userId: "",
    }
  })
  console.log({ alice, bob })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
