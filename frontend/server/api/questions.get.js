import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
	let questions = await prisma.question.findMany({
		include: {
			author: true
		}
	});

	return questions;
});
