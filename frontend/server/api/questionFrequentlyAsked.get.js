import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
	const frenquentlyAskedQuestions =
		await prisma.questionFrequentlyAsked.findMany();

	return frenquentlyAskedQuestions;
});
