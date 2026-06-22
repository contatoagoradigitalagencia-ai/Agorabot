import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'bot:update_status_redirect' DO WEBSOCKET
*/
describe("ON - bot:update_status_redirect", () => {
	const server = new Server({ mongoDB: true });
	let savePayload;

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
		await server.connect();
		const res = await server.emit("bot:get_info_bot");
		savePayload = { status: res.redirect.activated };
	});

	afterAll(async () => {
		await server.emit("bot:update_status_redirect", savePayload);
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await server.emit("bot:update_status_redirect", { status: true });

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("bot:update_status_redirect", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("bot:update_status_redirect", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("bot:update_status_redirect", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("bot:update_status_redirect", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("bot:update_status_redirect", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("bot:update_status_redirect", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'status'", async () => {
		const res = await server.emit("bot:update_status_redirect", { status: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um objeto dentro de 'status'", async () => {
		const res = await server.emit("bot:update_status_redirect", { status: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um array dentro de 'status'", async () => {
		const res = await server.emit("bot:update_status_redirect", { status: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando uma string dentro de 'status'", async () => {
		const res = await server.emit("bot:update_status_redirect", { status: "string" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um number dentro de 'status'", async () => {
		const res = await server.emit("bot:update_status_redirect", { status: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});
});