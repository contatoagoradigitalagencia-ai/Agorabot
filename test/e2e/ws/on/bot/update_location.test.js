import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'bot:update_location' DO WEBSOCKET
*/
describe("ON - bot:update_location", () => {
	const server = new Server({ mongoDB: true });
	let savePayload;

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		await server.login();
		await server.connect();
		const res = await server.emit("bot:get_info_bot");
		savePayload = {
			name: res.location.name,
			address: res.location.address,
			latitude: res.location.latitude,
			longitude: res.location.longitude
		};
	});

	afterAll(async () => {
		await server.emit("bot:update_location", savePayload);
		server.disconnect();
		await server.stop();
	});

	test("requisição feita corretamente", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: -22.909916052379334,
			longitude: -43.19812500764271
		});

		expect(res.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("bot:update_location", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("bot:update_location", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("bot:update_location", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("bot:update_location", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("bot:update_location", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("bot:update_location", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'name'", async () => {
		const res = await server.emit("bot:update_location", {
			name: null
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'name'", async () => {
		const res = await server.emit("bot:update_location", {
			name: {}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'name'", async () => {
		const res = await server.emit("bot:update_location", {
			name: []
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um boolean dentro de 'name'", async () => {
		const res = await server.emit("bot:update_location", {
			name: true
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'name'", async () => {
		const res = await server.emit("bot:update_location", {
			name: 42
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando null dentro de 'address'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: null
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "address" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'address'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: {}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "address" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'address'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: []
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "address" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um boolean dentro de 'address'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: true
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "address" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'address'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: 42
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "address" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando null dentro de 'latitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: null
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "latitude" deve ser do tipo number'
		});
	});

	test("requisição feita passando um objeto dentro de 'latitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: {}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "latitude" deve ser do tipo number'
		});
	});

	test("requisição feita passando um array dentro de 'latitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: []
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "latitude" deve ser do tipo number'
		});
	});

	test("requisição feita passando um boolean dentro de 'latitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: true
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "latitude" deve ser do tipo number'
		});
	});

	test("requisição feita passando uma string dentro de 'latitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: "string"
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "latitude" deve ser do tipo number'
		});
	});

	test("requisição feita passando null dentro de 'longitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: -22.909916052379334,
			longitude: null
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "longitude" deve ser do tipo number'
		});
	});

	test("requisição feita passando um objeto dentro de 'longitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: -22.909916052379334,
			longitude: {}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "longitude" deve ser do tipo number'
		});
	});

	test("requisição feita passando um array dentro de 'longitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: -22.909916052379334,
			longitude: []
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "longitude" deve ser do tipo number'
		});
	});

	test("requisição feita passando um boolean dentro de 'longitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: -22.909916052379334,
			longitude: true
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "longitude" deve ser do tipo number'
		});
	});

	test("requisição feita passando uma string dentro de 'longitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: -22.909916052379334,
			longitude: "string"
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "longitude" deve ser do tipo number'
		});
	});

	test("requisição feita passando um number menor que -90 no campo 'latitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: -91,
			longitude: -43.19812500764271
		});

		expect(res).toEqual({
			code: 422,
			error: 'Campo "latitude" inválido'
		});
	});

	test("requisição feita passando um number maior que 90 no campo 'latitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: 91,
			longitude: -43.19812500764271
		});

		expect(res).toEqual({
			code: 422,
			error: 'Campo "latitude" inválido'
		});
	});

	test("requisição feita passando um number menor que -180 no campo 'longitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: -22.909916052379334,
			longitude: -181
		});

		expect(res).toEqual({
			code: 422,
			error: 'Campo "longitude" inválido'
		});
	});

	test("requisição feita passando um number maior que 180 no campo 'longitude'", async () => {
		const res = await server.emit("bot:update_location", {
			name: "42 Rio",
			address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072",
			latitude: -22.909916052379334,
			longitude: 181
		});

		expect(res).toEqual({
			code: 422,
			error: 'Campo "longitude" inválido'
		});
	});
});