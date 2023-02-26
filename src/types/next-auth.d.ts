import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: number;
			phone: string;
			name: string;
			image?: Buffer | null;
			role: string;
		};
	}
}
