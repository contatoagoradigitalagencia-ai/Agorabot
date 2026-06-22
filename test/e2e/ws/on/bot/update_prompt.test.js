import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'bot:update_prompt' DO WEBSOCKET
*/
describe("ON - bot:update_prompt", () => {
	const server = new Server({ mongoDB: true });
	let savePayload;

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
		await server.connect();
		const res = await server.emit("bot:get_info_bot");
		savePayload = { prompt: res.prompt };
	});

	afterAll(async () => {
		await server.emit("bot:update_prompt", savePayload);
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente removendo o prompt", async () => {
		const res = await server.emit("bot:update_prompt", { prompt: "" });

		expect(res.code).toBe(204);
	});

	test("requisição feita corretamente salvando um prompt", async () => {
		const res = await server.emit("bot:update_prompt", { prompt: "- Você é um atendente virtual de uma empresa que pesta serviços de consultoria.\n- Tirar dúvidas sobre serviços.\n- Informar preços, horários e disponibilidade.\n- Ser educado, direto e claro." });

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("bot:update_prompt", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("bot:update_prompt", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("bot:update_prompt", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("bot:update_prompt", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("bot:update_prompt", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("bot:update_prompt", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'prompt'", async () => {
		const res = await server.emit("bot:update_prompt", { prompt: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});

	test("requisição feita passando um objeto dentro de 'prompt'", async () => {
		const res = await server.emit("bot:update_prompt", { prompt: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});

	test("requisição feita passando um array dentro de 'prompt'", async () => {
		const res = await server.emit("bot:update_prompt", { prompt: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});

	test("requisição feita passando um boolean dentro de 'prompt'", async () => {
		const res = await server.emit("bot:update_prompt", { prompt: true });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});

	test("requisição feita passando um number dentro de 'prompt'", async () => {
		const res = await server.emit("bot:update_prompt", { prompt: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "prompt" deve ser do tipo string'
		});
	});
});