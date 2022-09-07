import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	const newUser = await prisma.user.create({
		data: {
			email: "yacinelyoubi2@gmail.com",
			password: "ly92140CLM",
			Server: "Louisoix",
			name: "Yacine"
		},
		select: {
			id: true,
			name: true
		}
	});

	const data = await prisma.user.findMany();

	console.log("====================================");
	console.log(data);
	console.log("====================================");

	return {
		newUser
	};
});
