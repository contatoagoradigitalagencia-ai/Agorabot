import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'bot:prompt_suggestion' DO WEBSOCKET
*/
describe("ON - bot:prompt_suggestion", () => {
	const server = new Server({ mongoDB: true, IA: true });

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

	test("requisição feita corretamente removendo o prompt", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: "", input: "Input teste E2E" });

		expect(res).toMatchObject({
			code: 200,
			promptSuggestion: expect.any(String)
		});
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("bot:prompt_suggestion", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("bot:prompt_suggestion", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("bot:prompt_suggestion", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("bot:prompt_suggestion", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("bot:prompt_suggestion", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("bot:prompt_suggestion", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'prompt'", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});

	test("requisição feita passando um objeto dentro de 'prompt'", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});

	test("requisição feita passando um array dentro de 'prompt'", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});

	test("requisição feita passando um boolean dentro de 'prompt'", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: true });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});

	test("requisição feita passando um number dentro de 'prompt'", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});

	test("requisição feita passando null dentro de 'input'", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: "", input: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'input'", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: "", input: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'input'", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: "", input: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um boolean dentro de 'input'", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: "", input: true });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'input'", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: "", input: "" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'input'", async () => {
		const res = await server.emit("bot:prompt_suggestion", { prompt: "", input: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string e não deve estar vazio'
		});
	});
});