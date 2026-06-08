import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'chat:send_message' DO WEBSOCKET
*/
describe("ON - chat:send_message", () => {
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
		const res = await server.emit("chat:send_message", {
			phone: process.env.PHONE_DESTINY_TEST,
			message: {
				type: "text",
				text: {
					body: "mensagem de texto do teste automatizado E2E"
				}
			}
		});

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("chat:send_message", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	// test("requisição feita passando um objeto", async () => {
	// 	const res = await server.emit("chat:send_message", {});

	// 	expect(res).toEqual({
	// 		code: 400,
	// 		error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("requisição feita passando um array", async () => {
	// 	const res = await server.emit("chat:send_message", []);

	// 	expect(res).toEqual({
	// 		code: 400,
	// 		error: "O payload deve ser um objeto"
	// 	});
	// });

	// test("requisição feita passando uma string", async () => {
	// 	const res = await server.emit("chat:send_message", "string");

	// 	expect(res).toEqual({
	// 		code: 400,
	// 		error: "O payload deve ser um objeto"
	// 	});
	// });

	// test("requisição feita passando um number", async () => {
	// 	const res = await server.emit("chat:send_message", 42);

	// 	expect(res).toEqual({
	// 		code: 400,
	// 		error: "O payload deve ser um objeto"
	// 	});
	// });

	// test("requisição feita passando null dentro de 'phone'", async () => {
	// 	const res = await server.emit("chat:send_message", { phone: null });

	// 	expect(res).toEqual({
	// 		code: 400,
	// 		error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("requisição feita passando um objeto dentro de 'phone'", async () => {
	// 	const res = await server.emit("chat:send_message", { phone: {} });

	// 	expect(res).toEqual({
	// 		code: 400,
	// 		error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("requisição feita passando um array dentro de 'phone'", async () => {
	// 	const res = await server.emit("chat:send_message", { phone: [] });

	// 	expect(res).toEqual({
	// 		code: 400,
	// 		error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("requisição feita passando um number dentro de 'phone'", async () => {
	// 	const res = await server.emit("chat:send_message", { phone: 42 });

	// 	expect(res).toEqual({
	// 		code: 400,
	// 		error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("'phone' inválido", async () => {
	// 	const res = await server.emit("chat:send_message", { phone: "string" });

	// 	expect(res).toEqual({
	// 		code: 404,
	// 		error: "'phone' não corresponde a busca"
	// 	});
	// });

	// test("'phone' inexistente", async () => {
	// 	const res = await server.emit("chat:send_message", { phone: "5521999999999" });

	// 	expect(res).toEqual({
	// 		code: 404,
	// 		error: "'phone' não corresponde a busca"
	// 	});
	// });
});