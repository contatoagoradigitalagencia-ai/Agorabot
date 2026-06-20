import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'chat:on_off' DO WEBSOCKET
*/
describe("ON - chat:on_off", () => {
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
		await server.emit("chat:on_off", { phone: process.env.PHONE_DESTINY_TEST, stateBot: false });
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await server.emit("chat:on_off", { phone: process.env.PHONE_DESTINY_TEST, stateBot: true });

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("chat:on_off", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("chat:on_off", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("chat:on_off", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("chat:on_off", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("chat:on_off", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("chat:on_off", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'phone'", async () => {
		const res = await server.emit("chat:on_off", { phone: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'phone'", async () => {
		const res = await server.emit("chat:on_off", { phone: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'phone'", async () => {
		const res = await server.emit("chat:on_off", { phone: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'phone'", async () => {
		const res = await server.emit("chat:on_off", { phone: "" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'phone'", async () => {
		const res = await server.emit("chat:on_off", { phone: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando null dentro de 'stateBot'", async () => {
		const res = await server.emit("chat:on_off", { phone: process.env.PHONE_DESTINY_TEST, stateBot: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "stateBot" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um objeto dentro de 'stateBot'", async () => {
		const res = await server.emit("chat:on_off", { phone: process.env.PHONE_DESTINY_TEST, stateBot: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "stateBot" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um array dentro de 'stateBot'", async () => {
		const res = await server.emit("chat:on_off", { phone: process.env.PHONE_DESTINY_TEST, stateBot: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "stateBot" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando uma string dentro de 'stateBot'", async () => {
		const res = await server.emit("chat:on_off", { phone: process.env.PHONE_DESTINY_TEST, stateBot: "string" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "stateBot" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um number dentro de 'stateBot'", async () => {
		const res = await server.emit("chat:on_off", { phone: process.env.PHONE_DESTINY_TEST, stateBot: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "stateBot" deve ser do tipo boolean'
		});
	});

	test("Verificando se realmente está ocorrendo as mudanças", async () => {
		await server.emit("chat:on_off", { phone: process.env.PHONE_DESTINY_TEST, stateBot: true });
		const firstRes = await server.emit("chat:info_contact", { phone: process.env.PHONE_DESTINY_TEST });
		expect(firstRes.bot).toEqual(true);
		await server.emit("chat:on_off", { phone: process.env.PHONE_DESTINY_TEST, stateBot: false });
		const secondRes = await server.emit("chat:info_contact", { phone: process.env.PHONE_DESTINY_TEST });
		expect(secondRes.bot).toEqual(false);
	});

	test("requisição feita passando 'phone' inexistente", async () => {
		const res = await server.emit("chat:on_off", { phone: "5521999999999", stateBot: true });

		expect(res).toEqual({
			code: 404,
			error: "'phone' não corresponde a busca"
		});
	});
});