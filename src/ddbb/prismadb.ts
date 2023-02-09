import { PrismaClient } from "@prisma/client"

declare global {
  var Prisma: PrismaClient | undefined
}

const Prisma = globalThis.Prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.Prisma = Prisma

export default Prisma