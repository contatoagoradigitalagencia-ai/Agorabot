import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'contacts:load_contacts' DO WEBSOCKET
*/
describe("ON - contacts:load_contacts", () => {
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

	test("requisição feita corretamente sem payload", async () => {
		const res = await server.emit("contacts:load_contacts");

		expect(res).toEqual(expect.any(Array));
		for (const contact of res) expect(contact).toEqual(expect.any(Object));
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("contacts:load_contacts", null);

		expect(res).toEqual(expect.any(Array));
		for (const contact of res) expect(contact).toEqual(expect.any(Object));
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("contacts:load_contacts", {});

		expect(res).toEqual(expect.any(Array));
		for (const contact of res) expect(contact).toEqual(expect.any(Object));
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("contacts:load_contacts", []);

		expect(res).toEqual(expect.any(Array));
		for (const contact of res) expect(contact).toEqual(expect.any(Object));
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("contacts:load_contacts", "string");

		expect(res).toEqual(expect.any(Array));
		for (const contact of res) expect(contact).toEqual(expect.any(Object));
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("contacts:load_contacts", 42);

		expect(res).toEqual(expect.any(Array));
		for (const contact of res) expect(contact).toEqual(expect.any(Object));
	});
});