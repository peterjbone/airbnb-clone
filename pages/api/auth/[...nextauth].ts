import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" }
			},
			/**
			 * This function verifies if the user exist
			 * and if their credentials are correct
			 * @param credentials are the input email and password of the user
			 * @returns the user if they exist
			 */
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Invalid credentials");
				}

				// we bring the user from mongoDB
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				});

				// if the user doesnt exit
				if (!user || !user?.hashedPassword) {
					throw new Error("Invalid credentials");
				}

				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				);

				// if the password is incorrect
				if (!isCorrectPassword) {
					throw new Error("Invalid credentials");
				}

				return user;
			}
		})
	],
	pages: {
		signIn: "/"
	},
	debug: process.env.NODE_ENV === "development",
	session: {
		strategy: "jwt"
	},
	secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
