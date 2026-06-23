import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'spreadsheets:update_used_spreadsheets' DO WEBSOCKET
*/
describe("ON - spreadsheets:update_used_spreadsheets", () => {
	const server = new Server({ mongoDB: true, googleSheets: true });
	let savePayload;

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
		await server.connect();
		const res = await server.emit("spreadsheets:get_spreadsheets");
		savePayload = { spreadsheets: res.pages.filter((spreadsheet) => (spreadsheet.active)).map((spreadsheet) => (spreadsheet.page)) };
	});

	afterAll(async () => {
		await server.emit("spreadsheets:update_used_spreadsheets", savePayload);
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente removendo todos as planilhas", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", { spreadsheets: [] });

		expect(res.code).toBe(204);
	});

	test("requisição feita corretamente adicionando uma planilha", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", { spreadsheets: ["Página 1"] });

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "spreadsheets" deve ser um array de strings'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'spreadsheets'", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", { spreadsheets: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "spreadsheets" deve ser um array de strings'
		});
	});

	test("requisição feita passando um objeto dentro de 'status'", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", { spreadsheets: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "spreadsheets" deve ser um array de strings'
		});
	});

	test("requisição feita passando um boolean dentro de 'spreadsheets'", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", { spreadsheets: true });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "spreadsheets" deve ser um array de strings'
		});
	});

	test("requisição feita passando uma string dentro de 'spreadsheets'", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", { spreadsheets: "string" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "spreadsheets" deve ser um array de strings'
		});
	});

	test("requisição feita passando um number dentro de 'spreadsheets'", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", { spreadsheets: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "spreadsheets" deve ser um array de strings'
		});
	});

	test("requisição feita passando um array com multiplos tipos de dados dentro de 'spreadsheets'", async () => {
		const res = await server.emit("spreadsheets:update_used_spreadsheets", { spreadsheets: ["Página 1", 123] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "spreadsheets" deve ser um array de strings'
		});
	});
});