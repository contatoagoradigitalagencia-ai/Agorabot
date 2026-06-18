import axios from "axios";

import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'settings:update_password' DO WEBSOCKET
*/
describe("ON - settings:update_password", () => {
	const server = new Server({ mongoDB: true });

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
		await server.connect();
	});

	afterAll(async () => {
		const res = await server.emit("settings:update_password", { password: "12345", newPassword: process.env.PASSWORD_TEST });
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await server.emit("settings:update_password", { password: process.env.PASSWORD_TEST, newPassword: "12345" });

		expect(res.code).toBe(204);
	});

	test("verifica se consegue logar com a nova senha '12345'", async () => {
		const res = await axios({
			method: "POST",
			url: `${server.url}/login`,
			data: {
				phone: process.env.PHONE_TEST,
				password: "12345"
			}
		});

		expect(res.status).toBe(200);
		expect(res.data).toMatchObject({
			idPhone: expect.any(String),
			token: expect.any(String)
		});
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("settings:update_password", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("settings:update_password", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "password" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("settings:update_password", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("settings:update_password", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("settings:update_password", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("settings:update_password", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'password'", async () => {
		const res = await server.emit("settings:update_password", { password: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "password" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'password'", async () => {
		const res = await server.emit("settings:update_password", { password: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "password" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'password'", async () => {
		const res = await server.emit("settings:update_password", { password: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "password" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'password'", async () => {
		const res = await server.emit("settings:update_password", { password: "" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "password" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'password'", async () => {
		const res = await server.emit("settings:update_password", { password: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "password" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando null dentro de 'newPassword'", async () => {
		const res = await server.emit("settings:update_password", { password: process.env.PASSWORD_TEST, newPassword: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "newPassword" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'newPassword'", async () => {
		const res = await server.emit("settings:update_password", { password: process.env.PASSWORD_TEST, newPassword: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "newPassword" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'newPassword'", async () => {
		const res = await server.emit("settings:update_password", { password: process.env.PASSWORD_TEST, newPassword: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "newPassword" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'newPassword'", async () => {
		const res = await server.emit("settings:update_password", { password: process.env.PASSWORD_TEST, newPassword: "" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "newPassword" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'newPassword'", async () => {
		const res = await server.emit("settings:update_password", { password: process.env.PASSWORD_TEST, newPassword: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "newPassword" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita corretamente com senha antiga incorreta", async () => {
		const res = await server.emit("settings:update_password", { password: "string", newPassword: "12345" });

		expect(res).toEqual({
			code: 401,
			error: "Senha antiga incorreta"
		});
	});
});