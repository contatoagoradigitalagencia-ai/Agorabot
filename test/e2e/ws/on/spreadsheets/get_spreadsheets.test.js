import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'spreadsheets:get_spreadsheets' DO WEBSOCKET
*/
describe("ON - spreadsheets:get_spreadsheets", () => {
	const server = new Server({ mongoDB: true, googleSheets: true });

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
		const res = await server.emit("spreadsheets:get_spreadsheets");

		expect(res).toMatchObject({
			code: 200,
			url: expect.any(String),
			pages: expect.any(Array)
		});
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("spreadsheets:get_spreadsheets", null);

		expect(res).toMatchObject({
			code: 200,
			url: expect.any(String),
			pages: expect.any(Array)
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("spreadsheets:get_spreadsheets", {});

		expect(res).toMatchObject({
			code: 200,
			url: expect.any(String),
			pages: expect.any(Array)
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("spreadsheets:get_spreadsheets", []);

		expect(res).toMatchObject({
			code: 200,
			url: expect.any(String),
			pages: expect.any(Array)
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("spreadsheets:get_spreadsheets", true);

		expect(res).toMatchObject({
			code: 200,
			url: expect.any(String),
			pages: expect.any(Array)
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("spreadsheets:get_spreadsheets", "string");

		expect(res).toMatchObject({
			code: 200,
			url: expect.any(String),
			pages: expect.any(Array)
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("spreadsheets:get_spreadsheets", 42);

		expect(res).toMatchObject({
			code: 200,
			url: expect.any(String),
			pages: expect.any(Array)
		});
	});
});