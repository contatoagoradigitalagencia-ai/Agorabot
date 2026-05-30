import { io } from "socket.io-client";
import jwt from "jsonwebtoken";

import Server from "../serverTest.js";

/**
 * @author VAMPETA
 * @brief CONEXAO COM WEBSOCKET
*/
describe("Autenticação WebSocket", () => {
	const server = new Server({ mongoDB: true });

	beforeAll(async () => {
		await server.start();
		if (!process.env.ID_PHONE_TEST) throw (new Error("ID_PHONE_TEST não configurado"));
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		if (!process.env.JWT_SECRET) throw (new Error("JWT_SECRET não configurado"));
		await server.login();
	});

	afterAll(async () => {
		await server.stop();
	});

	test("websocket conectado corretamente", async () => {
		const socket = io(server.url, {
			auth: {
				token: server.token
			},
			transports: ["websocket"]
		});

		await new Promise((resolve, reject) => {
			socket.once("connect", resolve);
			socket.once("connect_error", reject);
		});
		expect(socket.connected).toBe(true);
		expect(socket.id).toEqual(expect.any(String));
		expect(socket.connected).toBe(true);
		socket.disconnect();
	});

	test("websocket sem 'auth'", async () => {
		const socket = io(server.url, {
			transports: ["websocket"]
		});
		const error = await new Promise((resolve) => socket.once("connect_error", resolve));

		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("Token inválido");
		expect(socket.connected).toBe(false);
		socket.disconnect();
	});

	test("websocket sem 'token' de autenticação", async () => {
		const socket = io(server.url, {
			auth: {},
			transports: ["websocket"]
		});
		const error = await new Promise((resolve) => socket.once("connect_error", resolve));

		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("Token inválido");
		expect(socket.connected).toBe(false);
		socket.disconnect();
	});

	test("websocket com 'token' nulo", async () => {
		const socket = io(server.url, {
			auth: {
				token: null
			},
			transports: ["websocket"]
		});
		const error = await new Promise((resolve) => socket.once("connect_error", resolve));

		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("Token inválido");
		expect(socket.connected).toBe(false);
		socket.disconnect();
	});

	test("websocket com 'token' do tipo number", async () => {
		const socket = io(server.url, {
			auth: {
				token: 123
			},
			transports: ["websocket"]
		});
		const error = await new Promise((resolve) => socket.once("connect_error", resolve));

		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("Token inválido");
		expect(socket.connected).toBe(false);
		socket.disconnect();
	});

	test("websocket com 'token' inválido", async () => {
		const socket = io(server.url, {
			auth: {
				token: "123"
			},
			transports: ["websocket"]
		});
		const error = await new Promise((resolve) => socket.once("connect_error", resolve));

		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("Token inválido");
		expect(socket.connected).toBe(false);
		socket.disconnect();
	});

	test("websocket com 'token' válido mas sem 'idPhone'", async () => {
		const token = jwt.sign({
				phone: process.env.PHONE_TEST
			},
			process.env.JWT_SECRET
		);
		const socket = io(server.url, {
			auth: {
				token: token
			},
			transports: ["websocket"]
		});
		const error = await new Promise((resolve) => socket.once("connect_error", resolve));

		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("Credenciais inválidas");
		expect(socket.connected).toBe(false);
		socket.disconnect();
	});

	test("websocket com 'token' válido mas sem 'phone'", async () => {
		const token = jwt.sign({
				idPhone: process.env.ID_PHONE_TEST
			},
			process.env.JWT_SECRET
		);
		const socket = io(server.url, {
			auth: {
				token: token
			},
			transports: ["websocket"]
		});
		const error = await new Promise((resolve) => socket.once("connect_error", resolve));

		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("Credenciais inválidas");
		expect(socket.connected).toBe(false);
		socket.disconnect();
	});

	test("websocket com 'token' válido mas com tipos errados", async () => {
		const token = jwt.sign({
				idPhone: Number(process.env.ID_PHONE_TEST),
				phone: Number(process.env.PHONE_TEST)
			},
			process.env.JWT_SECRET
		);
		const socket = io(server.url, {
			auth: {
				token: token
			},
			transports: ["websocket"]
		});
		const error = await new Promise((resolve) => socket.once("connect_error", resolve));

		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("Credenciais inválidas");
		expect(socket.connected).toBe(false);
		socket.disconnect();
	});

	test("websocket com 'token' válido mas com credenciais não correspondete a um cliente real", async () => {
		const token = jwt.sign({
				idPhone: "000000000000000",
				phone: "5521999999999"
			},
			process.env.JWT_SECRET
		);
		const socket = io(server.url, {
			auth: {
				token: token
			},
			transports: ["websocket"]
		});
		const error = await new Promise((resolve) => socket.once("connect_error", resolve));

		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("Cliente não encontrado");
		expect(socket.connected).toBe(false);
		socket.disconnect();
	});

	test("websocket com 'token' válido mas com expirado", async () => {
		const token = jwt.sign({
				idPhone: process.env.ID_PHONE_TEST,
				phone: process.env.PHONE_TEST
			},
			process.env.JWT_SECRET,
			{
				expiresIn: -1
			}
		);
		const socket = io(server.url, {
			auth: {
				token: token
			},
			transports: ["websocket"]
		});
		const error = await new Promise((resolve) => socket.once("connect_error", resolve));

		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("Token inválido");
		expect(socket.connected).toBe(false);
		socket.disconnect();
	});

	test("websocket com 'token' gerado com 'JWT_SECRET' errado", async () => {
		const token = jwt.sign({
				idPhone: process.env.ID_PHONE_TEST,
				phone: process.env.PHONE_TEST
			},
			"123"
		);
		const socket = io(server.url, {
			auth: {
				token: token
			},
			transports: ["websocket"]
		});
		const error = await new Promise((resolve) => socket.once("connect_error", resolve));

		expect(error).toBeInstanceOf(Error);
		expect(error.message).toBe("Token inválido");
		expect(socket.connected).toBe(false);
		socket.disconnect();
	});

	test("websocket com 'token' válido gerado apartir do 'idPhone' + 'phone' + 'JWT_SECRET'", async () => {
		const token = jwt.sign({
				idPhone: process.env.ID_PHONE_TEST,
				phone: process.env.PHONE_TEST
			},
			process.env.JWT_SECRET
		);
		const socket = io(server.url, {
			auth: {
				token: token
			},
			transports: ["websocket"]
		});

		await new Promise((resolve, reject) => {
			socket.once("connect", resolve);
			socket.once("connect_error", reject);
		});
		expect(socket.connected).toBe(true);
		expect(socket.id).toEqual(expect.any(String));
		expect(socket.connected).toBe(true);
		socket.disconnect();
	});
});