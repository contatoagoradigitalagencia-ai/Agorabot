import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'quick-messages:delete_quick_message' DO WEBSOCKET
*/
describe("ON - quick-messages:delete_quick_message", () => {
	const server = new Server({ mongoDB: true });
	// const server = new Server({ mongoDB: true, cloudFlareR2: true, IA: true });

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
		const res = await server.emit("quick-messages:delete_quick_message", { id: "6a31b9057e3509e4e89c6deb" });

		expect(res.code).toBe(204);
	});

	// test("requisição feita passando um objeto", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", {});

	// 	expect(res).toMatchObject({
	// 		code: 400,
	// 		error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("requisição feita passando um array", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", []);

	// 	expect(res).toMatchObject({
	// 		code: 400,
	// 		error: "O payload deve ser um objeto ou não deve ser enviado"
	// 	});
	// });

	// test("requisição feita passando um boolean", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", true);

	// 	expect(res).toMatchObject({
	// 		code: 400,
	// 		error: "O payload deve ser um objeto ou não deve ser enviado"
	// 	});
	// });

	// test("requisição feita passando uma string", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", "string");

	// 	expect(res).toMatchObject({
	// 		code: 400,
	// 		error: "O payload deve ser um objeto ou não deve ser enviado"
	// 	});
	// });

	// test("requisição feita passando um number", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", 42);

	// 	expect(res).toMatchObject({
	// 		code: 400,
	// 		error: "O payload deve ser um objeto ou não deve ser enviado"
	// 	});
	// });

	// test("requisição feita passando null dentro de 'id'", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", { id: null });

	// 	expect(res).toMatchObject({
	// 		code: 400,
	// 		error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("requisição feita passando um objeto dentro de 'id'", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", { id: {} });

	// 	expect(res).toMatchObject({
	// 		code: 400,
	// 		error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("requisição feita passando um array dentro de 'id'", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", { id: [] });

	// 	expect(res).toMatchObject({
	// 		code: 400,
	// 		error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("requisição feita passando um boolean dentro de 'id'", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", { id: true });

	// 	expect(res).toMatchObject({
	// 		code: 400,
	// 		error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("requisição feita passando uma string vazia dentro de 'id'", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", { id: "" });

	// 	expect(res).toMatchObject({
	// 		code: 400,
	// 		error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("requisição feita passando um number dentro de 'id'", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", { id: 42 });

	// 	expect(res).toMatchObject({
	// 		code: 400,
	// 		error: 'O campo "id" deve ser do tipo string e não deve estar vazio'
	// 	});
	// });

	// test("'id' inválido", async () => {
	// 	const res = await server.emit("quick-messages:delete_quick_message", { id: "string" });

	// 	expect(res).toEqual({
	// 		code: 422,
	// 		error: 'Tipo de mensagem "string" não existe'
	// 	});
	// });
});