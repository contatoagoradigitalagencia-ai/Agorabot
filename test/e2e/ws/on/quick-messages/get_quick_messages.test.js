import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'quick-messages:get_quick_messages' DO WEBSOCKET
*/
describe("ON - quick-messages:get_quick_messages", () => {
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

	test("requisição feita corretamente sem passar payload (deve retornar um array com todos os tipos)", async () => {
		const res = await server.emit("quick-messages:get_quick_messages");

		expect(res).toMatchObject({
			code: 200,
			messages: expect.any(Array)
		});
	});

	test("requisição feita corretamente passando null no payload (deve retornar um array com todos os tipos)", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", null);

		expect(res).toMatchObject({
			code: 200,
			messages: expect.any(Array)
		});
	});

	test("requisição do tipo text feita corretamente", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: "text" });

		expect(res).toMatchObject({
			code: 200,
			messages: expect.any(Array)
		});
	});

	test("requisição do tipo audio feita corretamente", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: "audio" });

		expect(res).toMatchObject({
			code: 200,
			messages: expect.any(Array)
		});
	});

	test("requisição do tipo image feita corretamente", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: "image" });

		expect(res).toMatchObject({
			code: 200,
			messages: expect.any(Array)
		});
	});

	test("requisição do tipo video feita corretamente", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: "video" });

		expect(res).toMatchObject({
			code: 200,
			messages: expect.any(Array)
		});
	});

	test("requisição do tipo document feita corretamente", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: "document" });

		expect(res).toMatchObject({
			code: 200,
			messages: expect.any(Array)
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", {});

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", []);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto ou não deve ser enviado"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", true);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto ou não deve ser enviado"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", "string");

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto ou não deve ser enviado"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", 42);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto ou não deve ser enviado"
		});
	});

	test("requisição feita passando null dentro de 'type'", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: null });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'type'", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: {} });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'type'", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: [] });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um boolean dentro de 'type'", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: true });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'type'", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: "" });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'type'", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: 42 });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("'type' inválido", async () => {
		const res = await server.emit("quick-messages:get_quick_messages", { type: "string" });

		expect(res).toEqual({
			code: 422,
			error: 'Tipo de mensagem "string" não existe'
		});
	});
});