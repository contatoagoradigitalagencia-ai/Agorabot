import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'chats:load_chats' DO WEBSOCKET
*/
describe("ON - chats:load_chats", () => {
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

	test("requisição feita corretamente sem range 'dateLastChat'", async () => {
		const res = await server.emit("chats:load_chats", {});

		expect(res).toMatchObject({
			chats: expect.any(Array),
			hasMore: expect.any(Boolean),
			nextCursor: expect.any(Object)
		});
	});

// test("deve carregar próxima página usando nextCursor", async () => {
// 	const firstPage = await server.emit("chats:load_chats", {});
// 	const secondPage = await server.emit("chats:load_chats", { dateLastChat: firstPage.nextCursor });

// 	expect(secondPage.chats).toEqual(expect.any(Array));
// 	expect(firstPage.chats[0]._id).not.toBe(secondPage.chats[0]._id);
// });
});