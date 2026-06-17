import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'quick-messages:delete_quick_message' DO WEBSOCKET
*/
describe("ON - quick-messages:delete_quick_message", () => {
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

	test("requisição feita corretamente", async () => {
		const resSave = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: {
					body: "mensagem de texto do teste automatizado E2E"
				}
			}
		});
		const res = await server.emit("quick-messages:delete_quick_message", { id: resSave.id });

		expect(resSave).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", null);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", {});

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", []);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", true);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", "string");

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", 42);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'id'", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", { id: null });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'id'", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", { id: {} });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'id'", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", { id: [] });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um boolean dentro de 'id'", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", { id: true });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'id'", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", { id: "" });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'id'", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", { id: 42 });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("'id' válido mas não existe na busca", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", { id: "6a331d29d39fe01376d34dd4" });

		expect(res).toEqual({
			code: 404,
			error: "'id' não corresponde a busca"
		});
	});

	test("'id' inválido", async () => {
		const res = await server.emit("quick-messages:delete_quick_message", { id: "string" });

		expect(res).toEqual({
			code: 422,
			error: 'O campo "id" deve ser um ObjectId válido'
		});
	});
});