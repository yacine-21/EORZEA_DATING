import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async e => {
	const body = await useBody(e);
	let { question, answer } = body;

	const frenquentlyAskedQuestion = await prisma.questionFrequentlyAsked.create({
		data: {
			answer: answer,
			title: question
		}
	});

	return frenquentlyAskedQuestion;
});
