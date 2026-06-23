import axios from "axios";
import crypto from "crypto";

import Server from "../../serverTest.js";

/**
 * @author VAMPETA
 * @brief ROTA DE LOGIN
 * @method POST
 * @route /webhook
*/
describe("POST /webhook", () => {
	const server = new Server({});

	beforeAll(async () => {
		await server.start();
		if (!process.env.CHAVE_SECRETA_DO_APLICATIVO) throw (new Error("CHAVE_SECRETA_DO_APLICATIVO não configurado"));
	});

	afterAll(async () => {
		await server.stop();
	});

	test("200 - requisição feita corretamente", async () => {
		const rawBody = JSON.stringify({});
		const signature = "sha256=" + crypto.createHmac("sha256", process.env.CHAVE_SECRETA_DO_APLICATIVO).update(rawBody).digest("hex");
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: rawBody,
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": signature
			},
		});

		expect(res.status).toBe(200);
		expect(res.data).toBe("OK");
	});

	test("403 - requisição feita sem body", async () => {
		const rawBody = JSON.stringify({});
		const signature = "sha256=" + crypto.createHmac("sha256", process.env.CHAVE_SECRETA_DO_APLICATIVO).update(rawBody).digest("hex");
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": signature
			},
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - requisição feita com body null", async () => {
		const rawBody = JSON.stringify({});
		const signature = "sha256=" + crypto.createHmac("sha256", process.env.CHAVE_SECRETA_DO_APLICATIVO).update(rawBody).digest("hex");
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: null,
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": signature
			},
		});

		expect(res.status).toBe(400);
	});

	test("403 - requisição feita com body com objeto", async () => {
		const rawBody = JSON.stringify({});
		const signature = "sha256=" + crypto.createHmac("sha256", process.env.CHAVE_SECRETA_DO_APLICATIVO).update(rawBody).digest("hex");
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: {},
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": signature
			},
		});

		expect(res.status).toBe(200);
		expect(res.data).toBe("OK");
	});

	test("403 - requisição feita com body com array", async () => {
		const rawBody = JSON.stringify({});
		const signature = "sha256=" + crypto.createHmac("sha256", process.env.CHAVE_SECRETA_DO_APLICATIVO).update(rawBody).digest("hex");
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: [],
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": signature
			},
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - requisição feita com body com boolean", async () => {
		const rawBody = JSON.stringify({});
		const signature = "sha256=" + crypto.createHmac("sha256", process.env.CHAVE_SECRETA_DO_APLICATIVO).update(rawBody).digest("hex");
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: true,
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": signature
			},
		});

		expect(res.status).toBe(400);
	});

	test("403 - requisição feita com body com string", async () => {
		const rawBody = JSON.stringify({});
		const signature = "sha256=" + crypto.createHmac("sha256", process.env.CHAVE_SECRETA_DO_APLICATIVO).update(rawBody).digest("hex");
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: "string",
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": signature
			},
		});

		expect(res.status).toBe(400);
	});

	test("403 - requisição feita com body com number", async () => {
		const rawBody = JSON.stringify({});
		const signature = "sha256=" + crypto.createHmac("sha256", process.env.CHAVE_SECRETA_DO_APLICATIVO).update(rawBody).digest("hex");
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: 42,
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": signature
			},
		});

		expect(res.status).toBe(400);
	});

	test("403 - assinatura 'x-hub-signature-256' não enviada", async () => {
		const rawBody = JSON.stringify({});
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: rawBody
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - assinatura 'x-hub-signature-256' inválida", async () => {
		const rawBody = JSON.stringify({});
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: rawBody,
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": 123
			},
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - body alterado após gerar assinatura 'x-hub-signature-256'", async () => {
		const rawBody = JSON.stringify({});
		const signature = "sha256=" + crypto.createHmac("sha256", process.env.CHAVE_SECRETA_DO_APLICATIVO).update(rawBody).digest("hex");
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: JSON.stringify({ message: "bory alterado" }),
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": signature
			},
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - 'CHAVE_SECRETA_DO_APLICATIVO' incorreto", async () => {
		const rawBody = JSON.stringify({});
		const signature = "sha256=" + crypto.createHmac("sha256", "123").update(rawBody).digest("hex");
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: rawBody,
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": signature
			},
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});

	test("403 - assinatura sem prefixo sha256", async () => {
		const rawBody = JSON.stringify({});
		const signature = crypto.createHmac("sha256", process.env.CHAVE_SECRETA_DO_APLICATIVO).update(rawBody).digest("hex");
		const res = await axios({
			method: "POST",
			url: `${server.url}/webhook`,
			data: rawBody,
			headers: {
				"Content-Type": "application/json",
				"x-hub-signature-256": signature
			},
		});

		expect(res.status).toBe(403);
		expect(res.data).toBe("Forbidden");
	});
});