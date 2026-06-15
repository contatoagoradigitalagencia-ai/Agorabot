import Server from "../../../serverTest.js";
import mongodb from "../../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'human-service:remove_waiting_service' DO WEBSOCKET
*/
describe("ON - human-service:remove_waiting_service", () => {
	const server = new Server({ mongoDB: true });

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		if (!process.env.ID_PHONE_TEST) throw (new Error("ID_PHONE_TEST não configurado"));
		if (!process.env.PHONE_DESTINY_TEST) throw (new Error("PHONE_DESTINY_TEST não configurado"));
		await server.login();
		await server.connect();
		await mongodb.saveHumanService(process.env.ID_PHONE_TEST, process.env.PHONE_DESTINY_TEST);
	});

	afterAll(async () => {
		await mongodb.saveHumanService(process.env.ID_PHONE_TEST, process.env.PHONE_DESTINY_TEST);
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await server.emit("human-service:remove_waiting_service", { phone: process.env.PHONE_DESTINY_TEST });

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("human-service:remove_waiting_service", null);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("human-service:remove_waiting_service", {});

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("human-service:remove_waiting_service", []);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("human-service:remove_waiting_service", true);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("human-service:remove_waiting_service", "string");

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("human-service:remove_waiting_service", 42);

		expect(res).toMatchObject({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'phone'", async () => {
		const res = await server.emit("human-service:remove_waiting_service", { phone: null });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'phone'", async () => {
		const res = await server.emit("human-service:remove_waiting_service", { phone: {} });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'phone'", async () => {
		const res = await server.emit("human-service:remove_waiting_service", { phone: [] });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um boolean dentro de 'phone'", async () => {
		const res = await server.emit("human-service:remove_waiting_service", { phone: true });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'phone'", async () => {
		const res = await server.emit("human-service:remove_waiting_service", { phone: "" });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'phone'", async () => {
		const res = await server.emit("human-service:remove_waiting_service", { phone: 42 });

		expect(res).toMatchObject({
			code: 400,
			error: 'O campo "phone" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("'phone' inválido", async () => {
		const res = await server.emit("human-service:remove_waiting_service", { phone: "string" });

		expect(res).toEqual({
			code: 404,
			error: "'phone' não corresponde a busca"
		});
	});

	test("'phone' válido mas não existe no banco de dados", async () => {
		const res = await server.emit("human-service:remove_waiting_service", { phone: "5521999999999" });

		expect(res).toEqual({
			code: 404,
			error: "'phone' não corresponde a busca"
		});
	});
});