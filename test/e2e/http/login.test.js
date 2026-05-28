import axios from "axios";
import bcrypt from "bcrypt";

import mainTest from "../mainTest.js";
import mongodb from "../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief ROTA DE LOGIN
 * @method POST
 * @route /login
*/
describe("POST /login", () => {
	let server;
	let io;

	beforeAll(async () => {
		const config = await mainTest({ mongoDB: true });

		io = config.io;
		server = config.server.listen(3001);

await mongodb.Account.create({
	phone: "5521999999999",
	login: {
		password: await bcrypt.hash("123", 10)
	}
});
	});

	afterAll(async () => {
// await mongodb.Account.deleteOne({
// 	phone: "5521999999999"
// });

		io.close();
		await mongodb.mongodb.connection.close();
		await new Promise((resolve) => {
			server.close(resolve);
		});
	});

	test("200 - login feito corretamente", async () => {
		// const response = await request(app).post("/login").send({
		// 	phone: "5521998869425",
		// 	password: "123"
		// });

		// expect(response.status).toBe(200);
		// expect(response.body).toEqual({
		// 	idPhone: "1",
		// 	token: "token fake"
		// });
		const response = await axios({
			method: "POST",
			url: "http://localhost:3001/login",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				phone: "5521999999999",
				password: "123"
			}
		});

		expect(response.status).toBe(200);

		expect(response.data).toHaveProperty("token");
	});

	test("400 - phone e password não enviados", async () => {
		// const response = await request(app).post("/login").send({});

		// expect(response.status).toBe(400);
	});

	test("401 - usuário não encontrado", async () => {
		// const response = await request(app).post("/login").send({
		// 	phone: "5521999999999",
		// 	password: "123"
		// });

		// expect(response.status).toBe(401);
	});

	test("401 - senha incorreta", async () => {
		// const response = await request(app).post("/login").send({
		// 	phone: "5521998869425",
		// 	password: "password invalid"
		// });

		// expect(response.status).toBe(401);
	});
});