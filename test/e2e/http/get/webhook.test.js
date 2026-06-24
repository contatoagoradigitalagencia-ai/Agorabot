import axios from "axios";

import Server from "../../serverTest.js";

/**
 * @author VAMPETA
 * @brief ROTA DE AUTENTICACAO DO WEBHOOK DO SERVIDOR
 * @method GET
 * @route /webhook
*/
describe("GET /webhook", () => {
	const server = new Server({});

	beforeAll(async () => {
		await server.start();
	    if (!process.env.VERIFY_TOKEN) throw (new Error("VERIFY_TOKEN não configurado"));
	});

	afterAll(async () => {
		await server.stop();
	});

	test("200 - requisição feita corretamente", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.mode": "subscribe",
				"hub.verify_token": process.env.VERIFY_TOKEN,
				"hub.challenge": "abc"
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toBe("abc");
	});

	test("403 - params não enviado", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.mode', 'hub.verify_token' e 'hub.challenge' nulos", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.mode": null,
				"hub.verify_token": null,
				"hub.challenge": null
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.mode', 'hub.verify_token' e 'hub.challenge' objetos", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.mode": {},
				"hub.verify_token": {},
				"hub.challenge": {}
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.mode', 'hub.verify_token' e 'hub.challenge' array", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.mode": [],
				"hub.verify_token": [],
				"hub.challenge": []
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.mode', 'hub.verify_token' e 'hub.challenge' boolean", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.mode": true,
				"hub.verify_token": true,
				"hub.challenge": true
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.mode', 'hub.verify_token' e 'hub.challenge' string vazia", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.mode": "",
				"hub.verify_token": "",
				"hub.challenge": ""
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.mode', 'hub.verify_token' e 'hub.challenge' number", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.mode": 42,
				"hub.verify_token": 42,
				"hub.challenge": 42
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.mode', 'hub.verify_token' e 'hub.challenge' não enviados", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.verify_token' e 'hub.challenge' não enviados", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.mode": "subscribe"
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.mode' e 'hub.challenge' não enviados", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.verify_token": process.env.VERIFY_TOKEN
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.mode' e 'hub.verify_token' não enviados", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.challenge": "abc"
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.mode' não enviado", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.verify_token": process.env.VERIFY_TOKEN,
				"hub.challenge": "abc"
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.verify_token' não enviado", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.mode": "subscribe",
				"hub.challenge": "abc"
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'hub.challenge' não enviado", async () => {
		const res = await axios({
			method: "GET",
			url: `${server.url}/webhook`,
			params: {
				"hub.mode": "subscribe",
				"hub.verify_token": process.env.VERIFY_TOKEN
			}
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});
});