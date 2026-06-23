import axios from "axios";

import Server from "../../serverTest.js";

/**
 * @author VAMPETA
 * @brief ROTA DE LOGIN
 * @method POST
 * @route /login
*/
describe("POST /login", () => {
	const server = new Server({ mongoDB: true });

	beforeAll(async () => {
		await server.start();
	    if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
    	if (!process.env.PASSWORD_TEST)  throw (new Error("PASSWORD_TEST não configurado"));
	});

	afterAll(async () => {
		await server.stop();
	});

	test("200 - login feito corretamente", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: process.env.PHONE_TEST,
				password: process.env.PASSWORD_TEST
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			idPhone: expect.any(String),
			token: expect.any(String)
		});
	});

	test("400 - body não enviado", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'phone' e 'password' nulos", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: null,
				password: null
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'phone' e 'password' não enviados", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'phone' não enviado", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				password: process.env.PASSWORD_TEST
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'password' não enviado", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: process.env.PHONE_TEST
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'phone' vazio", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: "",
				password: process.env.PASSWORD_TEST
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'password' vazio", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: process.env.PHONE_TEST,
				password: ""
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'phone' contendo apenas espaços", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: "     ",
				password: process.env.PASSWORD_TEST
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'phone' com tipo inválido", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: 123456,
				password: process.env.PASSWORD_TEST
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - 'password' com tipo inválido", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: process.env.PHONE_TEST,
				password: true
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("401 - 'login' incorreto", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: "5521999999999",
				password: process.env.PASSWORD_TEST
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'password' contendo apenas espaços", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: process.env.PHONE_TEST,
				password: "     "
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'password' incorreta", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: process.env.PHONE_TEST,
				password: "incorrect password"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});
});