import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'support:get_info_support' DO WEBSOCKET
*/
describe("ON - support:get_info_support", () => {
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

	test("requisição feita corretamente sem payload", async () => {
		const res = await server.emit("support:get_info_support");

		expect(res).toMatchObject({
			code: 200,
			countContact: expect.any(Number),
			countSpreadsheet: expect.any(Number),
			system: expect.any(Boolean)
		});
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("support:get_info_support", null);

		expect(res).toMatchObject({
			code: 200,
			countContact: expect.any(Number),
			countSpreadsheet: expect.any(Number),
			system: expect.any(Boolean)
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("support:get_info_support", {});

		expect(res).toMatchObject({
			code: 200,
			countContact: expect.any(Number),
			countSpreadsheet: expect.any(Number),
			system: expect.any(Boolean)
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("support:get_info_support", []);

		expect(res).toMatchObject({
			code: 200,
			countContact: expect.any(Number),
			countSpreadsheet: expect.any(Number),
			system: expect.any(Boolean)
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("support:get_info_support", "string");

		expect(res).toMatchObject({
			code: 200,
			countContact: expect.any(Number),
			countSpreadsheet: expect.any(Number),
			system: expect.any(Boolean)
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("support:get_info_support", 42);

		expect(res).toMatchObject({
			code: 200,
			countContact: expect.any(Number),
			countSpreadsheet: expect.any(Number),
			system: expect.any(Boolean)
		});
	});
});