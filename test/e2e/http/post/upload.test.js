import axios from "axios";
import FormData from "form-data";
import jwt from "jsonwebtoken";

import Server from "../../serverTest.js";

/**
 * @author VAMPETA
 * @brief ROTA DE UPLOAD DE ARQUIVOS
 * @method POST
 * @route /upload
*/
describe("POST /upload", () => {
	const server = new Server({ mongoDB: true, cloudFlareR2: true });
	let token;

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		if (!process.env.CLOUDFLARE_R2_BUCKET) throw (new Error("CLOUDFLARE_R2_BUCKET não configurado"));
		if (!process.env.JWT_SECRET) throw (new Error("JWT_SECRET não configurado"));
		token = await server.login();
	});

	afterAll(async () => {
		await server.stop();
	});

	test("200 - requisição feita corretamente", async () => {
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: `Bearer ${token}`,
				...form.getHeaders()
			}
		});
		const download = await axios({
			method: "GET",
			url: upload.data.url,
			responseType: "arraybuffer"
		});
		const downloadedBuffer = Buffer.from(download.data);

		expect(upload.status).toBe(200);
		expect(upload.data).toMatchObject({
			url: expect.any(String)
		});
		expect(download.status).toBe(200);
		expect(Buffer.compare(originalBuffer, downloadedBuffer)).toBe(0);
	});

	test("400 - arquivo não enviado", async () => {
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		expect(upload.status).toBe(400);
		expect(upload.data).toBe("Bad Request");
	});

	test("400 - campo do arquivo diferente de 'file'", async () => {
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("teste", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: `Bearer ${token}`,
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(400);
		expect(upload.data).toBe("Bad Request");
	});

	test("401 - 'Authorization' não enviado", async () => {
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' é null", async () => {
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: null,
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' é um objeto", async () => {
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: {},
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' é um array", async () => {
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: [],
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' é um boolean", async () => {
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: true,
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' é uma string vazia", async () => {
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: "",
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' é um number", async () => {
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: 42,
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' sem Bearer", async () => {
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: token,
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' somente Bearer", async () => {
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: "Bearer ",
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("401 - token criado com campos incorretos", async () => {
		const tokenInvalid = jwt.sign(
			{ test: "123" },
			process.env.JWT_SECRET,
			{ expiresIn: "7d" }
		);
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: `Bearer ${tokenInvalid}`,
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("401 - token criado com campos 'idPhone' e 'phone' com tipos incorretos", async () => {
		const tokenInvalid = jwt.sign(
			{ idPhone: 123, phone: 5521999999999 },
			process.env.JWT_SECRET,
			{ expiresIn: "7d" }
		);
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: `Bearer ${tokenInvalid}`,
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("401 - token expirado", async () => {
		const tokenInvalid = jwt.sign(
			{ idPhone: process.env.PHONE_TEST, phone: process.env.PASSWORD_TEST },
			process.env.JWT_SECRET,
			{ expiresIn: "-1s" }
		);
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: `Bearer ${tokenInvalid}`,
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(401);
		expect(upload.data).toBe("Unauthorized");
	});

	test("403 - token criado com credenciais incorretas", async () => {
		const tokenInvalid = jwt.sign(
			{ idPhone: "123", phone: "5521999999999" },
			process.env.JWT_SECRET,
			{ expiresIn: "7d" }
		);
		const originalBuffer = Buffer.from("vampeta");
		const form = new FormData();
		form.append("file", originalBuffer, { filename: "vampeta.txt", contentType: "text/plain" });
		const upload = await axios({
			method: "POST",
			url: `${server.url}/upload`,
			data: form,
			headers: {
				Authorization: `Bearer ${tokenInvalid}`,
				...form.getHeaders()
			}
		});

		expect(upload.status).toBe(403);
		expect(upload.data).toBe("Forbidden");
	});
});