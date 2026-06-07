import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'chat:load_messages' DO WEBSOCKET
*/
describe("ON - chat:load_messages", () => {
	const server = new Server({ mongoDB: true });

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		if (!process.env.PHONE_DESTINY_TEST) throw (new Error("PHONE_DESTINY_TEST não configurado"));
		await server.login();
		await server.connect();
	});

	afterAll(async () => {
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await server.emit("chat:load_messages", { phone: process.env.PHONE_DESTINY_TEST });

		expect(res).toMatchObject({
			code: 200,
			messages: expect.any(Array),
			hasMore: expect.any(Boolean),
			nextCursor: expect.any(String)
		});
	});

	test("deve carregar próxima página usando 'beforeId'", async () => {
		const firstPage = await server.emit("chat:load_messages", { phone: process.env.PHONE_DESTINY_TEST });
		const secondPage = await server.emit("chat:load_messages", { phone: process.env.PHONE_DESTINY_TEST, beforeId: firstPage.nextCursor });

		expect(firstPage.messages[0]._id).not.toBe(secondPage.messages[0]._id);
		expect(firstPage).toMatchObject({
			code: 200,
			messages: expect.any(Array),
			hasMore: expect.any(Boolean),
			nextCursor: expect.any(String)
		});
		expect(secondPage).toMatchObject({
			code: 200,
			messages: expect.any(Array),
			hasMore: expect.any(Boolean),
			nextCursor: expect.any(String)
		});
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("chat:load_messages", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("chat:load_messages", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("chat:load_messages", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("chat:load_messages", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("chat:load_messages", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'phone'", async () => {
		const res = await server.emit("chat:load_messages", { phone: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'phone'", async () => {
		const res = await server.emit("chat:load_messages", { phone: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'phone'", async () => {
		const res = await server.emit("chat:load_messages", { phone: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'phone'", async () => {
		const res = await server.emit("chat:load_messages", { phone: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("'phone' inválido", async () => {
		const res = await server.emit("chat:load_messages", { phone: "string" });

		expect(res).toEqual({
			code: 200,
			messages: [],
			hasMore: false,
			nextCursor: null
		});
	});

	test("'phone' inexistente (deve se comportar da mesma forma com um número sem mensagens)", async () => {
		const res = await server.emit("chat:load_messages", { phone: "5521999999999" });

		expect(res).toEqual({
			code: 200,
			messages: [],
			hasMore: false,
			nextCursor: null
		});
	});

	test("requisição feita passando null dentro de 'beforeId'", async () => {
		const res = await server.emit("chat:load_messages", { phone: process.env.PHONE_DESTINY_TEST, beforeId: null });

		expect(res).toEqual({
			code: 422,
			error: 'O campo "beforeId" é opcional, mas quando informado deve ser uma string ObjectId do MongoDB válido'
		});
	});

	test("requisição feita passando um objeto dentro de 'beforeId'", async () => {
		const res = await server.emit("chat:load_messages", { phone: process.env.PHONE_DESTINY_TEST, beforeId: {} });

		expect(res).toEqual({
			code: 422,
			error: 'O campo "beforeId" é opcional, mas quando informado deve ser uma string ObjectId do MongoDB válido'
		});
	});

	test("requisição feita passando um array dentro de 'beforeId'", async () => {
		const res = await server.emit("chat:load_messages", { phone: process.env.PHONE_DESTINY_TEST, beforeId: [] });

		expect(res).toEqual({
			code: 422,
			error: 'O campo "beforeId" é opcional, mas quando informado deve ser uma string ObjectId do MongoDB válido'
		});
	});

	test("requisição feita passando um number dentro de 'beforeId'", async () => {
		const res = await server.emit("chat:load_messages", { phone: process.env.PHONE_DESTINY_TEST, beforeId: 42 });

		expect(res).toEqual({
			code: 422,
			error: 'O campo "beforeId" é opcional, mas quando informado deve ser uma string ObjectId do MongoDB válido'
		});
	});

	test("'beforeId' inexistente (deve se comportar da mesma forma com um número sem mensagens)", async () => {
		const res = await server.emit("chat:load_messages", { phone: process.env.PHONE_DESTINY_TEST, beforeId: "123" });

		expect(res).toEqual({
			code: 422,
			error: 'O campo "beforeId" é opcional, mas quando informado deve ser uma string ObjectId do MongoDB válido'
		});
	});
});