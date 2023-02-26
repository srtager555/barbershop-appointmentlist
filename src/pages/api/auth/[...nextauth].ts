import NextAuth from "next-auth";
import Prisma from "@ddbb/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export default NextAuth({
	adapter: PrismaAdapter(Prisma),
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {},
			// @ts-ignore
			async authorize(credentials, _) {
				const { phone, password } = credentials as {
					phone: string;
					password: string;
				};

				if (!phone || !password) {
					throw new Error("No se encuentra el numero de telefono o la contraseña");
				}

				const user = await Prisma.users.findUnique({
					where: {
						phone,
					},
				});

				// if user doesn't exist or password doesn't match
				if (!user || !(await compare(password, user.password))) {
					throw new Error("Invalid username or password");
				}

				return user;
			},
		}),
		// ...add more providers here
	],
	session: { strategy: "jwt" },
	callbacks: {
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			const user = await Prisma.users.findUnique({
				where: {
					id: Number(token.sub),
				},
			});

			if (!user) return session;

			session.user.id = user?.id;
			session.user.phone = user?.phone;
			session.user.name = user?.name;
			session.user.image = user?.image;
			session.user.role = user?.role;

			return session;
		},
	},
});
