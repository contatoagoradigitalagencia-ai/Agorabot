import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'bot:update_message_new_contact' DO WEBSOCKET
*/
describe("ON - bot:update_message_new_contact", () => {
	const server = new Server({ mongoDB: true });
	let savePayload;

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
		await server.connect();
		const res = await server.emit("bot:get_info_bot");
		savePayload = { message: res.messageNewContact };
	});

	afterAll(async () => {
		await server.emit("bot:update_message_new_contact", savePayload);
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente removendo a mensagem", async () => {
		const res = await server.emit("bot:update_message_new_contact", { message: "" });

		expect(res.code).toBe(204);
	});

	test("requisição feita corretamente adicionando uma mensagem", async () => {
		const res = await server.emit("bot:update_message_new_contact", { message: "Mensagem teste E2E" });

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("bot:update_message_new_contact", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("bot:update_message_new_contact", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("bot:update_message_new_contact", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("bot:update_message_new_contact", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("bot:update_message_new_contact", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("bot:update_message_new_contact", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'message'", async () => {
		const res = await server.emit("bot:update_message_new_contact", { message: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});

	test("requisição feita passando um objeto dentro de 'message'", async () => {
		const res = await server.emit("bot:update_message_new_contact", { message: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});

	test("requisição feita passando um array dentro de 'message'", async () => {
		const res = await server.emit("bot:update_message_new_contact", { message: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});

	test("requisição feita passando um boolean dentro de 'message'", async () => {
		const res = await server.emit("bot:update_message_new_contact", { message: true });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});

	test("requisição feita passando um number dentro de 'message'", async () => {
		const res = await server.emit("bot:update_message_new_contact", { message: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo string'
		});
	});
});