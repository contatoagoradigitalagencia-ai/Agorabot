import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'bot:get_info_bot' DO WEBSOCKET
*/
describe("ON - bot:get_info_bot", () => {
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
		const res = await server.emit("bot:get_info_bot");

		expect(res).toMatchObject({
			code: 200,
			activated: expect.any(Boolean),
			messageNotSupported: expect.any(String),
			model: expect.any(String),
			prompt: expect.any(String),
			historySize: expect.any(Number),
			maxTokens: expect.any(Number),
			location: expect.any(Object),
			redirect: expect.any(Object),
			messageNewContact: expect.any(String),
			visualization: expect.any(Boolean)
		});
	});
});