import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'chats:load_chats' DO WEBSOCKET
*/
describe("ON - chats:load_chats", () => {
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

	test("requisição feita corretamente sem payload e 'dateLastChat'", async () => {
		const res = await server.emit("chats:load_chats");

		expect(res.code).toEqual(200);
		expect(res).toMatchObject({
			code: expect.any(Number),
			chats: expect.any(Array),
			hasMore: expect.any(Boolean),
			nextCursor: expect.any(Object)
		});
	});

	test("deve carregar próxima página usando 'dateLastChat'", async () => {
		const firstPage = await server.emit("chats:load_chats");
		const secondPage = await server.emit("chats:load_chats", { dateLastChat: firstPage.nextCursor });

		expect(secondPage.code).toEqual(200);
		expect(secondPage).toMatchObject({
			code: expect.any(Number),
			chats: expect.any(Array),
			hasMore: expect.any(Boolean),
			nextCursor: expect.any(Object)
		});
		expect(firstPage.chats[0]._id).not.toBe(secondPage.chats[0]._id);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("chats:load_chats", null);

		expect(res.code).toEqual(200);
		expect(res).toMatchObject({
			code: expect.any(Number),
			chats: expect.any(Array),
			hasMore: expect.any(Boolean),
			nextCursor: expect.any(Object)
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("chats:load_chats", {});

		expect(res.code).toEqual(200);
		expect(res).toMatchObject({
			code: expect.any(Number),
			chats: expect.any(Array),
			hasMore: expect.any(Boolean),
			nextCursor: expect.any(Object)
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("chats:load_chats", []);

		expect(res.code).toEqual(400);
		expect(res.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("chats:load_chats", "string");

		expect(res.code).toEqual(400);
		expect(res.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("chats:load_chats", 42);

		expect(res.code).toEqual(400);
		expect(res.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat' como null", async () => {
		const res = await server.emit("chats:load_chats", { dateLastChat: null });

		expect(res.code).toEqual(400);
		expect(res.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat' como objeto", async () => {
		const res = await server.emit("chats:load_chats", { dateLastChat: {} });

		expect(res.code).toEqual(400);
		expect(res.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat' como array", async () => {
		const res = await server.emit("chats:load_chats", { dateLastChat: [] });

		expect(res.code).toEqual(400);
		expect(res.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat' como string", async () => {
		const res = await server.emit("chats:load_chats", { dateLastChat: "string" });

		expect(res.code).toEqual(400);
		expect(res.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat' como number", async () => {
		const res = await server.emit("chats:load_chats", { dateLastChat: 42 });

		expect(res.code).toEqual(400);
		expect(res.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat.timestamp' como null", async () => {
		const firstPage = await server.emit("chats:load_chats");
		const secondPage = await server.emit("chats:load_chats", { dateLastChat: { timestamp: null, _id: firstPage.nextCursor._id } });

		expect(secondPage.code).toEqual(400);
		expect(secondPage.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat.timestamp' como objeto", async () => {
		const firstPage = await server.emit("chats:load_chats");
		const secondPage = await server.emit("chats:load_chats", { dateLastChat: { timestamp: {}, _id: firstPage.nextCursor._id } });

		expect(secondPage.code).toEqual(400);
		expect(secondPage.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat.timestamp' como array", async () => {
		const firstPage = await server.emit("chats:load_chats");
		const secondPage = await server.emit("chats:load_chats", { dateLastChat: { timestamp: [], _id: firstPage.nextCursor._id } });

		expect(secondPage.code).toEqual(400);
		expect(secondPage.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat.timestamp' como string", async () => {
		const firstPage = await server.emit("chats:load_chats");
		const secondPage = await server.emit("chats:load_chats", { dateLastChat: { timestamp: "string", _id: firstPage.nextCursor._id } });

		expect(secondPage.code).toEqual(422);
		expect(secondPage.error).toBe('"dateLastChat.timestamp" inválido');
	});

	test("requisição feita passando 'dateLastChat.timestamp' como number", async () => {
		const firstPage = await server.emit("chats:load_chats");
		const secondPage = await server.emit("chats:load_chats", { dateLastChat: { timestamp: 42, _id: firstPage.nextCursor._id } });

		expect(secondPage.code).toEqual(400);
		expect(secondPage.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat._id' como null", async () => {
		const firstPage = await server.emit("chats:load_chats");
		const secondPage = await server.emit("chats:load_chats", { dateLastChat: { timestamp: firstPage.nextCursor.timestamp, _id: null } });

		expect(secondPage.code).toEqual(400);
		expect(secondPage.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat._id' como objeto", async () => {
		const firstPage = await server.emit("chats:load_chats");
		const secondPage = await server.emit("chats:load_chats", { dateLastChat: { timestamp: firstPage.nextCursor.timestamp, _id: {} } });

		expect(secondPage.code).toEqual(400);
		expect(secondPage.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat._id' como array", async () => {
		const firstPage = await server.emit("chats:load_chats");
		const secondPage = await server.emit("chats:load_chats", { dateLastChat: { timestamp: firstPage.nextCursor.timestamp, _id: [] } });

		expect(secondPage.code).toEqual(400);
		expect(secondPage.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});

	test("requisição feita passando 'dateLastChat._id' como string", async () => {
		const firstPage = await server.emit("chats:load_chats");
		const secondPage = await server.emit("chats:load_chats", { dateLastChat: { timestamp: firstPage.nextCursor.timestamp, _id: "sring" } });

		expect(secondPage.code).toEqual(422);
		expect(secondPage.error).toBe('"dateLastChat._id" inválido');
	});

	test("requisição feita passando 'dateLastChat._id' como number", async () => {
		const firstPage = await server.emit("chats:load_chats");
		const secondPage = await server.emit("chats:load_chats", { dateLastChat: { timestamp: firstPage.nextCursor.timestamp, _id: 42 } });

		expect(secondPage.code).toEqual(400);
		expect(secondPage.error).toBe('"dateLastChat" é opcional, mas quando informado deve ser um objeto válido no formato { timestamp: string, _id:string }');
	});
});