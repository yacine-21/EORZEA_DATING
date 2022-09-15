import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	// const query = useQuery(event);
	const body = await useBody(event);
	let { email, password, name } = body;

	const saltRounds = 10;
	let hashedPassword = await bcrypt.hash(password, saltRounds);

	const newUser = await prisma.user.create({
		data: {
			email: email,
			password: hashedPassword,
			Server: "",
			name: name
		},
		select: {
			id: true,
			name: true,
			email: true
		}
	});

	return { newUser };
});
