import NextAuth from "next-auth"
import prisma from "@ddbb/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, _) {
        const { phoneNumber, password } = credentials as {
          phoneNumber: string;
          password: string;
        };

        if (!phoneNumber || !password) {
          throw new Error("No se encuentra el numero de telefono o la contraseña");
        }

        const user = await prisma.users.findUnique({
          where: {
             phoneNumber,
          },
        });

        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }

        return user;
      }
    })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
