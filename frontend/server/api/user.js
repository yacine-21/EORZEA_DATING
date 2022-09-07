import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	const query = useQuery(event);
	const body = await useBody(event);

	console.log(body);

	const newUser = await prisma.user.create({
		data: {
			email: "yacine098@gmail.com",
			password: "ly92140CLM",
			Server: "Louisoix",
			name: "Yacine"
		}
		// select: {
		// 	id: true,
		// 	name: true
		// }
	});

	const users = await prisma.user.findMany();

	return users;
});
