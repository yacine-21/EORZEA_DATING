import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	// const query = useQuery(event);
	const body = useBody(event);

	const saltRounds = 10;
	let { email, password, name } = body;
	let hashedPassword = bcrypt.hash(password, saltRounds);

	bcrypt.hash(password, saltRounds, async (err, hash) => {
		// store the hash in the db
	});

	const newUser = await prisma.user.create({
		data: { email: email, password: hashedPassword, name: name, Server: "" },
		select: { id: true, name: true }
	});

	return { newUser };
});
