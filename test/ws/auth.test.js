import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import express from "express";
import { io as Client } from "socket.io-client";

import configWebSocket from "../../configs/websocket.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief TESTA A AUTENTICACAO DO WEBSOCKET
 */
describe("WebSocket Authentication", () => {
	let io;
	let server;
	let address;

	beforeAll((done) => {
		process.env.JWT_SECRET = "secret test";

		const app = express();
		const config = configWebSocket(app);

		server = config.server;
		io = config.io;
		server.listen(() => {
			address = server.address();
			done();
		});
	});

	afterAll((done) => {
		io.close();
		server.close(() => {
			done();
		});
	});

	beforeEach(() => {
		jest.clearAllMocks();
		mongodb.Account = {
			findOne: jest.fn()
		};
	});

	test("deve conectar com token válido", (done) => {
		const token = jwt.sign(
			{
				idPhone: "123",
				phone: "5521999999999"
			},
			process.env.JWT_SECRET
		);

		mongodb.Account.findOne.mockReturnValue({
			select: jest.fn().mockResolvedValue({
				idPhone: "123",
				phone: "5521999999999"
			})
		});

		const client = new Client(`http://localhost:${address.port}`, {
			auth: {
				token
			}
		});

		client.on("connect", () => {
			expect(client.connected).toBe(true);
			client.close();
			done();
		});
		client.on("connect_error", (error) => {
			done(error);
		});
	});

	test("deve rejeitar token inválido", (done) => {
		const client = new Client(`http://localhost:${address.port}`, {
			auth: {
				token: "token invalido"
			}
		});

		client.on("connect_error", (error) => {
			expect(error.message).toBe("Token inválido");
			client.close();
			done();
		});
	});

	test("deve rejeitar cliente inexistente", (done) => {
		const token = jwt.sign(
			{
				idPhone: "123",
				phone: "5521999999999"
			},
			process.env.JWT_SECRET
		);

		mongodb.Account.findOne.mockReturnValue({
			select: jest.fn().mockResolvedValue(null)
		});

		const client = new Client(`http://localhost:${address.port}`, {
			auth: {
				token
			}
		});

		client.on("connect_error", (error) => {
			expect(error.message).toBe("Cliente não encontrado");
			client.close();
			done();
		});
	});
});