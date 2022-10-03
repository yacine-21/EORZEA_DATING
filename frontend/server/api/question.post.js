import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async e => {
	const body = await useBody(e);
	let { email, title, name } = body;

	let player = await prisma.player.findUnique({
		where: {
			email
		},
		select: {
			id: true
		}
	});

	if (!player)
		createError({
			statusMessage: "WRONG CREDENTIALS PLEASE RETRY !"
		});
	let newQuestion = await prisma.question.create({
		data: {
			title,
			playerId: player.id,
			answers: {
				create: [
					{
						answer: {
							create: {
								content: "",
								idPlayer: player.id
							}
						}
					}
				]
			}
		}
	});

	return newQuestion;
});
