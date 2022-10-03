import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async e => {
	const body = await useBody(e);
	let { answer, id } = body;

	const newAnswer = await prisma.answer.create({
		data: {
			idPlayer: 1,
			content: answer
		}
	});

	if (newAnswer.id) {
		const newQuestionOnReponse = await prisma.answerOnQuestion.create({
			data: {
				answerId: newAnswer.id,
				questionId: id
			},
			include: {
				answer: true,
				question: true
			}
		});
		console.log(newQuestionOnReponse);
	}

	// if (!user) return "WRONG CREDENTIALS PLEASE RETRY !";
	return { newAnswer };
});
