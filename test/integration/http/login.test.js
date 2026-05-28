import { jest } from "@jest/globals";
import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import configExpress from "../../../configs/express.js";
import mongodb from "../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief ROTA DE LOGIN
 * @method POST
 * @route /login
*/
describe("POST /login", () => {
	let app;

	beforeAll(() => {
		app = configExpress();
	});

	beforeEach(() => {
		jest.clearAllMocks();
		mongodb.Account = {
			findOne: jest.fn()
		};
	});

	test("200 - login feito corretamente", async () => {
		mongodb.Account.findOne.mockReturnValue({
			select: jest.fn().mockResolvedValue({
				idPhone: "1",
				phone: "5521999999999",
				login: {
					password: "hash"
				}
			})
		});
		jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
		jest.spyOn(jwt, "sign").mockReturnValue("token fake");

		const response = await request(app).post("/login").send({
			phone: "5521999999999",
			password: "123456"
		});

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			idPhone: "1",
			token: "token fake"
		});
	});

	test("400 - phone e password não enviados", async () => {
		const response = await request(app).post("/login").send({});

		expect(response.status).toBe(400);
	});

	test("401 - usuário não encontrado", async () => {
		mongodb.Account.findOne.mockReturnValue({
			select: jest.fn().mockResolvedValue(null)
		});

		const response = await request(app).post("/login").send({
			phone: "5521999999999",
			password: "123456"
		});

		expect(response.status).toBe(401);
	});

	test("401 - senha incorreta", async () => {
		jest.spyOn(mongodb.Account, "findOne").mockReturnValue({
			select: jest.fn().mockResolvedValue({
				idPhone: "1",
				phone: "5521999999999",
				login: {
					password: "hash"
				}
			})
		});

		jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

		const response = await request(app).post("/login").send({
			phone: "5521999999999",
			password: "password invalid"
		});

		expect(response.status).toBe(401);
	});
});