import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'bot:update_status_visualization' DO WEBSOCKET
*/
describe("ON - bot:update_status_visualization", () => {
	const server = new Server({ mongoDB: true });
	let savePayload;

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
		await server.connect();
		const res = await server.emit("bot:get_info_bot");
		savePayload = { visualization: res.visualization };
	});

	afterAll(async () => {
		await server.emit("bot:update_status_visualization", savePayload);
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await server.emit("bot:update_status_visualization", { visualization: true });

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("bot:update_status_visualization", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("bot:update_status_visualization", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "visualization" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("bot:update_status_visualization", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("bot:update_status_visualization", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("bot:update_status_visualization", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("bot:update_status_visualization", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'visualization'", async () => {
		const res = await server.emit("bot:update_status_visualization", { visualization: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "visualization" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um objeto dentro de 'visualization'", async () => {
		const res = await server.emit("bot:update_status_visualization", { visualization: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "visualization" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um array dentro de 'visualization'", async () => {
		const res = await server.emit("bot:update_status_visualization", { visualization: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "visualization" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando uma string dentro de 'visualization'", async () => {
		const res = await server.emit("bot:update_status_visualization", { visualization: "string" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "visualization" deve ser do tipo boolean'
		});
	});

	test("requisição feita passando um number dentro de 'visualization'", async () => {
		const res = await server.emit("bot:update_status_visualization", { visualization: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "visualization" deve ser do tipo boolean'
		});
	});
});