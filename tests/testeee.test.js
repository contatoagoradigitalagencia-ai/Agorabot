import request from "supertest";

import configExpress from "../configs/express.js";

const app = configExpress();

/**
 * @author VAMPETA
 * @brief ROTA DE TESTE
 * @method GET
 * @route /testeee
*/
describe("GET /testeee", () => {
	test("200 - A rota foi testada com sucesso", async () => {
		const app = configExpress();
		const response = await request(app).get("/testeee");

		expect(response.status).toBe(200);
		expect(response.text).toBe("aaaaaaaaaa");
	});
});