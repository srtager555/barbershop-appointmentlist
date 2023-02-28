import { PrismaClient } from "@prisma/client";

declare global {
	var Prisma: PrismaClient | undefined;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const Prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: ["query"],
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = Prisma;
