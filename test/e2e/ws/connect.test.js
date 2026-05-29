import { io } from "socket.io-client";

import Server from "../serverTest.js";

/**
 * @author VAMPETA
 * @brief CONEXAO COM WEBSOCKET
*/
describe("Autenticação WebSocket", () => {
	const server = new Server({ mongoDB: true });
	let accessToken;

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
	});

	afterAll(async () => {
		await server.stop();
	});

	test("websocket conectado corretamente", async () => {		// AGORA DEVO CRIAR UM METODO QUE FACA ESSA CONEXAO E OUTRO QUE DESCONECTE
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
		socket.disconnect();
	});

	test("websocket sem token de autenticação", async () => {
		// const socket = io(server.url, {
		// 	auth: {},
		// 	transports: ["websocket"]
		// });

		// await new Promise((resolve, reject) => {
		// 	socket.once("connect", resolve);
		// 	socket.once("connect_error", reject);
		// });
		// expect(socket.connected).toBe(false);
		// console.log(socket)
		// expect(socket.id).toEqual(expect.any(String));
		// expect(socket).toBe("Credenciais inválidas");
		// socket.disconnect();
	});
});