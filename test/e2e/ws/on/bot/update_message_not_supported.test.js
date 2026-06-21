import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'bot:update_message_not_supported' DO WEBSOCKET
*/
describe("ON - bot:update_message_not_supported", () => {
	const server = new Server({ mongoDB: true });

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
		await server.connect();
	});

	afterAll(async () => {
		await server.emit("bot:update_message_not_supported", { message: "Oi! 😊 No momento, eu só consigo entender mensagens de texto. Pode digitar sua dúvida?" });
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await server.emit("bot:update_message_not_supported", { message: "Mensagem teste E2E" });

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("bot:update_message_not_supported", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("bot:update_message_not_supported", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("bot:update_message_not_supported", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("bot:update_message_not_supported", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("bot:update_message_not_supported", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("bot:update_message_not_supported", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'message'", async () => {
		const res = await server.emit("bot:update_message_not_supported", { message: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});

	test("requisição feita passando um objeto dentro de 'message'", async () => {
		const res = await server.emit("bot:update_message_not_supported", { message: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});

	test("requisição feita passando um array dentro de 'message'", async () => {
		const res = await server.emit("bot:update_message_not_supported", { message: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});

	test("requisição feita passando um boolean dentro de 'message'", async () => {
		const res = await server.emit("bot:update_message_not_supported", { message: true });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});

	test("requisição feita passando um number dentro de 'message'", async () => {
		const res = await server.emit("bot:update_message_not_supported", { message: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});
});