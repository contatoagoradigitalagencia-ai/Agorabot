import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'chat:response_suggestion' DO WEBSOCKET
*/
describe("ON - chat:response_suggestion", () => {
	const server = new Server({ mongoDB: true, IA: true });

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

	test("requisição feita corretamente sem input", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: process.env.PHONE_DESTINY_TEST, input: "" });

		expect(res).toMatchObject({
			code: 200,
			suggestion: expect.any(String)
		});
	});

	test("requisição feita corretamente com input", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: process.env.PHONE_DESTINY_TEST, input: "oi" });

		expect(res).toMatchObject({
			code: 200,
			suggestion: expect.any(String)
		});
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("chat:response_suggestion", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("chat:response_suggestion", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("chat:response_suggestion", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("chat:response_suggestion", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("chat:response_suggestion", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'phone'", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'phone'", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'phone'", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'phone'", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: "" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'phone'", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando null dentro de 'input'", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: process.env.PHONE_DESTINY_TEST, input: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string'
		});
	});

	test("requisição feita passando null dentro de 'input'", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: process.env.PHONE_DESTINY_TEST, input: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string'
		});
	});

	test("requisição feita passando um objeto dentro de 'input'", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: process.env.PHONE_DESTINY_TEST, input: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string'
		});
	});

	test("requisição feita passando um array dentro de 'input'", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: process.env.PHONE_DESTINY_TEST, input: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string'
		});
	});

	test("requisição feita passando um boolean dentro de 'input'", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: process.env.PHONE_DESTINY_TEST, input: true });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string'
		});
	});

	test("requisição feita passando um number dentro de 'input'", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: process.env.PHONE_DESTINY_TEST, input: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "input" deve ser do tipo string'
		});
	});

	test("'phone' inválido", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: "string", input: "" });

		expect(res).toEqual({
			code: 404,
			error: "'phone' não corresponde a busca"
		});
	});

	test("'phone' válido mas não existe no banco de dados", async () => {
		const res = await server.emit("chat:response_suggestion", { phone: "5521999999999", input: "" });

		expect(res).toEqual({
			code: 404,
			error: "'phone' não corresponde a busca"
		});
	});
});