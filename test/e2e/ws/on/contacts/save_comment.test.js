import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'contacts:save_comment' DO WEBSOCKET
*/
describe("ON - contacts:save_comment", () => {
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
		await server.emit("contacts:save_comment", { phone: process.env.PHONE_DESTINY_TEST, comment: "Desenvolvedor deste site" });
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await server.emit("contacts:save_comment", { phone: process.env.PHONE_DESTINY_TEST, comment: "Desenvolvedor deste site" });
		const contact = await server.emit("chat:info_contact", { phone: process.env.PHONE_DESTINY_TEST });

		expect(res.code).toBe(204);
		expect(contact.comment).toBe("Desenvolvedor deste site");
	});

	test("requisição feita corretamente removendo o comentario", async () => {
		const res = await server.emit("contacts:save_comment", { phone: process.env.PHONE_DESTINY_TEST, comment: "" });
		const contact = await server.emit("chat:info_contact", { phone: process.env.PHONE_DESTINY_TEST });

		expect(res.code).toBe(204);
		expect(contact.comment).toBe("");
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("contacts:save_comment", null);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("contacts:save_comment", {});

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("contacts:save_comment", []);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("contacts:save_comment", true);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("contacts:save_comment", "string");

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("contacts:save_comment", 42);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'phone'", async () => {
		const res = await server.emit("contacts:save_comment", { phone: null });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'phone'", async () => {
		const res = await server.emit("contacts:save_comment", { phone: {} });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'phone'", async () => {
		const res = await server.emit("contacts:save_comment", { phone: [] });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um boolean dentro de 'phone'", async () => {
		const res = await server.emit("contacts:save_comment", { phone: true });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'phone'", async () => {
		const res = await server.emit("contacts:save_comment", { phone: "" });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'phone'", async () => {
		const res = await server.emit("contacts:save_comment", { phone: 42 });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("'phone' inválido", async () => {
		const res = await server.emit("contacts:save_comment", { phone: "string", comment: "" });

		expect(res).toEqual({
			code: 404,
			error: "'phone' não corresponde a busca"
		});
	});

	test("'phone' válido mas não existe no banco de dados", async () => {
		const res = await server.emit("contacts:save_comment", { phone: "5521999999999", comment: "" });

		expect(res).toEqual({
			code: 404,
			error: "'phone' não corresponde a busca"
		});
	});

	test("requisição feita passando null dentro de 'comment'", async () => {
		const res = await server.emit("contacts:save_comment", { phone: process.env.PHONE_DESTINY_TEST, comment: null });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "comment" deve ser do tipo string'
		});
	});

	test("requisição feita passando um objeto dentro de 'comment'", async () => {
		const res = await server.emit("contacts:save_comment", { phone: process.env.PHONE_DESTINY_TEST, comment: {} });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "comment" deve ser do tipo string'
		});
	});

	test("requisição feita passando um array dentro de 'comment'", async () => {
		const res = await server.emit("contacts:save_comment", { phone: process.env.PHONE_DESTINY_TEST, comment: [] });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "comment" deve ser do tipo string'
		});
	});

	test("requisição feita passando um boolean dentro de 'comment'", async () => {
		const res = await server.emit("contacts:save_comment", { phone: process.env.PHONE_DESTINY_TEST, comment: true });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "comment" deve ser do tipo string'
		});
	});

	test("requisição feita passando um number dentro de 'comment'", async () => {
		const res = await server.emit("contacts:save_comment", { phone: process.env.PHONE_DESTINY_TEST, comment: 42 });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "comment" deve ser do tipo string'
		});
	});
});