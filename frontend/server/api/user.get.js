import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	const query = useQuery(event);
	// const body = await useBody(event);

	const newUser = await prisma.user.create({
		data: {
			email: `test${Math.floor(Math.random() * 1000)}@gmail.com`,
			password: "ly92140CLM",
			Server: "Louisoix",
			name: "Yacine"
		},
		select: {
			id: true,
			name: true
		}
	});

	const users = await prisma.user.findMany();

	return users;
});
