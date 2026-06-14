import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'human-service:get_messages_waiting_service' DO WEBSOCKET
*/
describe("ON - human-service:get_messages_waiting_service", () => {
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
		const res = await server.emit("human-service:get_messages_waiting_service");

		expect(res).toMatchObject({
			code: 200,
			contacts: expect.any(Array)
		});
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("human-service:get_messages_waiting_service", null);

		expect(res).toMatchObject({
			code: 200,
			contacts: expect.any(Array)
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("human-service:get_messages_waiting_service", {});

		expect(res).toMatchObject({
			code: 200,
			contacts: expect.any(Array)
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("human-service:get_messages_waiting_service", []);

		expect(res).toMatchObject({
			code: 200,
			contacts: expect.any(Array)
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("human-service:get_messages_waiting_service", true);

		expect(res).toMatchObject({
			code: 200,
			contacts: expect.any(Array)
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("human-service:get_messages_waiting_service", "string");

		expect(res).toMatchObject({
			code: 200,
			contacts: expect.any(Array)
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("human-service:get_messages_waiting_service", 42);

		expect(res).toMatchObject({
			code: 200,
			contacts: expect.any(Array)
		});
	});
});