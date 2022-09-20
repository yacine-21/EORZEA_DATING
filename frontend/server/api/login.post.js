import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export default defineEventHandler(async e => {
	const body = await useBody(e);
	let { email, password } = body;
	let user = await prisma.user.findUnique({
		where: {
			email
		},
		select: {
			id: true,
			email: true,
			createdAt: true,
			updatedAt: true,
			password: true
		}
	});

	const passwordVerify = await bcrypt.compare(password, user.password);
	if (!user) return "WRONG CREDENTIALS PLEASE RETRY !";
	if (!passwordVerify) return "WRONG CREDENTIALS PLEASE RETRY !";
	return { user };
});
