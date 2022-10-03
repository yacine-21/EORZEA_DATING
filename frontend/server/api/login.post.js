import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export default defineEventHandler(async event => {
	const body = await useBody(event);
	const { email, password } = body;
	const player = await prisma.player.findUnique({
		where: {
			email: email
		},
		select: {
			password: true
		}
	});

	const passwordVerify = await bcrypt.compare(password, player.password);
	if (!player) return "WRONG CREDENTIALS PLEASE RETRY !";
	if (!passwordVerify) return "WRONG CREDENTIALS PLEASE RETRY !";
	return { player };
});
