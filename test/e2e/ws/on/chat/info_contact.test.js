import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'chat:info_contact' DO WEBSOCKET
*/
describe("ON - chat:info_contact", () => {
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
		const res = await server.emit("chat:info_contact", { phone: process.env.PHONE_DESTINY_TEST });

		expect(res).toMatchObject({
			code: 200,
			idPhone: expect.any(String),
			bot: expect.any(Boolean),
			comment: expect.any(String),
			lastMessage: expect.any(String),
			name: expect.any(String),
			humanService: expect.any(Object)
		});
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("chat:info_contact", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("chat:info_contact", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("chat:info_contact", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("chat:info_contact", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});


	test("requisição feita passando uma string", async () => {
		const res = await server.emit("chat:info_contact", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("chat:info_contact", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'phone'", async () => {
		const res = await server.emit("chat:info_contact", { phone: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'phone'", async () => {
		const res = await server.emit("chat:info_contact", { phone: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'phone'", async () => {
		const res = await server.emit("chat:info_contact", { phone: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um boolean dentro de 'phone'", async () => {
		const res = await server.emit("chat:info_contact", { phone: true });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'phone'", async () => {
		const res = await server.emit("chat:info_contact", { phone: "" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'phone'", async () => {
		const res = await server.emit("chat:info_contact", { phone: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando 'phone' inexistente", async () => {
		const res = await server.emit("chat:info_contact", { phone: "5521999999999" });

		expect(res).toEqual({
			code: 404,
			error: "'phone' não corresponde a busca"
		});
	});
});