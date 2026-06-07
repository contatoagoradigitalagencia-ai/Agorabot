import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'dashboard:info' DO WEBSOCKET
*/
describe("ON - dashboard:info", () => {
	const server = new Server({ mongoDB: true });

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
		await server.connect();
	});

	afterAll(async () => {
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await server.emit("dashboard:info", { date: new Date().toISOString().split('T')[0] });

		expect(res).toMatchObject({
			code: 200,
			timestamp: expect.any(String),
			hourly: expect.any(Object),
			received: expect.any(Object),
			sent: expect.any(Object),
			newContacts: expect.any(Number),
			redirects: expect.any(Number)
		});
	});

	test("requisição feita sem payload", async () => {
		const res = await server.emit("dashboard:info");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição passando um null", async () => {
		const res = await server.emit("dashboard:info", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição passando uma string", async () => {
		const res = await server.emit("dashboard:info", "abc");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição passando um number", async () => {
		const res = await server.emit("dashboard:info", 123);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição passando um array", async () => {
		const res = await server.emit("dashboard:info", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição passando um objeto vazio", async () => {
		const res = await server.emit("dashboard:info", {});

		expect(res).toEqual({
			code: 400,
			error: '"date" ausente'
		});
	});

	test("'date' inválida", async () => {
		const res = await server.emit("dashboard:info", { date: "abc" });

		expect(res).toEqual({
			code: 422,
			error: '"date" inválido'
		});
	});

	test("não existe métrica para 'date'", async () => {
		const res = await server.emit("dashboard:info", { date: "2099-01-01" });

		expect(res).toEqual({
			code: 200,
			timestamp: "2099-01-01T03:00:00.000Z",
			hourly: {},
			received: {},
			sent: {},
			newContacts: 0,
			redirects: 0
		});
	});
});