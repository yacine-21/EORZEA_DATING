import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async e => {
	const query = useQuery(e);

	let answerQuestion = await prisma.answerOnQuestion.findMany({
		where: {
			questionId: parseInt(query.idQuestion)
		},
		include: {
			answer: true,
			question: true
		}
	});
	return answerQuestion;
});
