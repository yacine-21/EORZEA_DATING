import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	const query = useQuery(event);
	const body = await useBody(event);

	console.log(body);
	let { email, password } = body;

	// const updatedPost = await prisma.user.update({
	// 	where: {
	// 		id: 22
	// 	},
	// 	data: {
	// 		Server: "Moogle"
	// 	}
	// });

	// const LoggedUser = await prisma.user.create({
	// 	data: {
	// 		email,
	// 		password
	// 	},
	// 	select: {
	// 		id: true,
	// 		name: true
	// 	}
	// });

	// const users = await prisma.user.findMany();

	return { body };
});
