import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'bot:update_numbers_redirect' DO WEBSOCKET
*/
describe("ON - bot:update_numbers_redirect", () => {
	const server = new Server({ mongoDB: true });
	let savePayload;

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
		await server.connect();
		const res = await server.emit("bot:get_info_bot");
		savePayload = { numbers: res.redirect.numbers };
	});

	afterAll(async () => {
		await server.emit("bot:update_numbers_redirect", savePayload);
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente removendo todos os números", async () => {
		const res = await server.emit("bot:update_numbers_redirect", { numbers: [] });

		expect(res.code).toBe(204);
	});

	test("requisição feita corretamente adicionando um número", async () => {
		const res = await server.emit("bot:update_numbers_redirect", { numbers: ["5521999999999"] });

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("bot:update_numbers_redirect", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("bot:update_numbers_redirect", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "numbers" deve ser um array de strings'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("bot:update_numbers_redirect", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("bot:update_numbers_redirect", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("bot:update_numbers_redirect", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("bot:update_numbers_redirect", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'numbers'", async () => {
		const res = await server.emit("bot:update_numbers_redirect", { numbers: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "numbers" deve ser um array de strings'
		});
	});

	test("requisição feita passando um objeto dentro de 'status'", async () => {
		const res = await server.emit("bot:update_numbers_redirect", { numbers: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "numbers" deve ser um array de strings'
		});
	});

	test("requisição feita passando um boolean dentro de 'numbers'", async () => {
		const res = await server.emit("bot:update_numbers_redirect", { numbers: true });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "numbers" deve ser um array de strings'
		});
	});

	test("requisição feita passando uma string dentro de 'numbers'", async () => {
		const res = await server.emit("bot:update_numbers_redirect", { numbers: "string" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "numbers" deve ser um array de strings'
		});
	});

	test("requisição feita passando um number dentro de 'numbers'", async () => {
		const res = await server.emit("bot:update_numbers_redirect", { numbers: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "numbers" deve ser um array de strings'
		});
	});

	test("requisição feita passando um array com multiplos tipos de dados dentro de 'numbers'", async () => {
		const res = await server.emit("bot:update_numbers_redirect", { numbers: ["5521999999999", 5521999999999] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "numbers" deve ser um array de strings'
		});
	});
});