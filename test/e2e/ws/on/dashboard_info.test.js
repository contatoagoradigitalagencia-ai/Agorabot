import Server from "../../serverTest.js";

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

	test("busca informações da rota /dashboard do front end", async () => {
		const res = await server.emit("dashboard:info", { date: new Date().toISOString().split('T')[0] });

		expect(res).toMatchObject({
			timestamp: expect.any(String),
			hourly: expect.any(Object),
			received: expect.any(Object),
			sent: expect.any(Object),
			newContacts: expect.any(Number),
			redirects: expect.any(Number)
		});
	});

	test("'não é passado um objeto e sim null", async () => {
		const res = await server.emit("dashboard:info", null);

		expect(res).toEqual({ error: "Data ausente" });
	});

	test("'não é passado um objeto e sim uma string", async () => {
		const res = await server.emit("dashboard:info", "abc");

		expect(res).toEqual({ error: "Data ausente" });
	});

	test("'não é passado um objeto e sim um number", async () => {
		const res = await server.emit("dashboard:info", 123);

		expect(res).toEqual({ error: "Data ausente" });
	});

	test("'date' não enviada", async () => {
		const res = await server.emit("dashboard:info", {});

		expect(res).toEqual({ error: "Data ausente" });
	});

	test("'date' inválida", async () => {
		const res = await server.emit("dashboard:info", { date: "abc" });

		expect(res).toEqual({ error: "Data inválida" });
	});

	test("não existe métrica para 'date'", async () => {
		const res = await server.emit("dashboard:info", { date: "2099-01-01" });

		expect(res).toMatchObject({
			hourly: {},
			received: {},
			sent: {},
			newContacts: 0,
			redirects: 0
		});
	});
});