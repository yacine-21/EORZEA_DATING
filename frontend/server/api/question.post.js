import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async e => {
	const body = await useBody(e);
	let { email, title, name } = body;

	let user = await prisma.user.findUnique({
		where: {
			email
		},
		select: {
			id: true
		}
	});

	if (!user)
		createError({
			statusMessage: "WRONG CREDENTIALS PLEASE RETRY !"
		});
	let newQuestion = await prisma.question.create({
		data: {
			title,
			authorId: user.id
		}
	});

	return newQuestion;
});
