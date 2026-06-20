import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'bot:update_status_bot' DO WEBSOCKET
*/
describe("ON - bot:update_status_bot", () => {
	const server = new Server({ mongoDB: true });

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
		await server.connect();
	});

	afterAll(async () => {
		await server.emit("bot:update_status_bot", { status: true });
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await server.emit("bot:update_status_bot", { status: true });

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("bot:update_status_bot", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("bot:update_status_bot", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("bot:update_status_bot", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("bot:update_status_bot", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("bot:update_status_bot", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("bot:update_status_bot", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'status'", async () => {
		const res = await server.emit("bot:update_status_bot", { status: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um objeto dentro de 'status'", async () => {
		const res = await server.emit("bot:update_status_bot", { status: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um array dentro de 'status'", async () => {
		const res = await server.emit("bot:update_status_bot", { status: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando uma string dentro de 'status'", async () => {
		const res = await server.emit("bot:update_status_bot", { status: "string" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um number dentro de 'status'", async () => {
		const res = await server.emit("bot:update_status_bot", { status: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "status" deve ser do tipo boolean'
		});
	});
});