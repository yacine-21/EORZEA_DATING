import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async e => {
	const body = await useBody(e);
	let { answer, id } = body;

	let question = await prisma.question.update({
		where: {
			id: id
		},
		data: {
			answer: answer
		},
		select: {
			answer: true,
			author: true,
			authorId: true,
			title: true,
			id: true
		}
	});

	// if (!user) return "WRONG CREDENTIALS PLEASE RETRY !";
	return { question };
});
