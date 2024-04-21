//! JUST FOR REGISTER

import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
	const body = await request.json();

	const { email, name, password } = body;

	try {
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prisma.user.create({
			data: {
				email,
				emailVerified: null,
				name,
				hashedPassword
			}
		});

		return NextResponse.json(user);
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	}
}
