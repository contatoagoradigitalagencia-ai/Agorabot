import Server from "../../../serverTest.js";

/**
 * @author VAMPETA
 * @brief TESTA O EVENTO 'quick-messages:save_quick_message' DO WEBSOCKET
*/
describe("ON - quick-messages:save_quick_message", () => {
	const server = new Server({ mongoDB: true, cloudFlareR2: true, IA: true });

	beforeAll(async () => {
		await server.start();
		if (!process.env.PHONE_TEST) throw (new Error("PHONE_TEST não configurado"));
		if (!process.env.PASSWORD_TEST) throw (new Error("PASSWORD_TEST não configurado"));
		if (!process.env.CLOUDFLARE_R2_URL_PUBLIC) throw (new Error("PHONE_DESTINY_TEST não configurado"));
		await server.login();
		await server.connect();
	});

	afterAll(async () => {
		server.disconnect();
		await server.stop();
	});

	test("requisição do tipo text feita corretamente", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: {
					body: "mensagem de texto do teste automatizado E2E"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo text feita corretamente tentando editar o campo 'name' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: {
					body: "mensagem de texto do teste automatizado E2E"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "text E2E editado",
			message: {
				type: "text",
				text: {
					body: "mensagem de texto do teste automatizado E2E"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo text feita corretamente tentando editar o campo 'message.text.body' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: {
					body: "mensagem de texto do teste automatizado E2E"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "text E2E",
			message: {
				type: "text",
				text: {
					body: "mensagem de texto do teste automatizado E2E editado"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo audio feita corretamente com audio do tipo voice", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga",
					voice: true
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo audio feita corretamente com audio do tipo music", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga",
					voice: false
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo audio feita corretamente tentando editar o campo 'name' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga",
					voice: true
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "audio E2E editado",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga",
					voice: true
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo audio feita corretamente tentando editar o campo 'message.audio.link' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga",
					voice: true
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/5/1777856951674-0aa79694-6503-48fe-92f7-7629e47448ab.mpga",
					voice: true
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo audio feita corretamente tentando editar o campo 'message.audio.voice' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga",
					voice: true
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/5/1777856951674-0aa79694-6503-48fe-92f7-7629e47448ab.mpga",
					voice: false
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo image feita corretamente sem caption", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: ""
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo image feita corretamente com caption", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: "caption E2E"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo image feita corretamente tentando editar o campo 'name' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: ""
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "image E2E editado",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: ""
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo image feita corretamente tentando editar o campo 'message.image.link' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: ""
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/4/1777158482153-647f1163-5e8e-4f2b-8ab3-70b871dc18f7.jpg",
					caption: ""
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo image feita corretamente tentando editar o campo 'message.image.caption' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: "caption E2E"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: "caption E2E editado"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente sem caption", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: ""
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente com caption", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: "caption E2E"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'name' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: ""
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "video E2E editado",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: ""
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'message.video.link' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: ""
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/5/1777732003992-7e07c680-1db4-4530-97ab-765aa3b006db.mp4",
					caption: ""
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'message.video.caption' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: "caption E2E"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: "caption E2E editado"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo location feita corretamente so com latitude e longitude", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "",
					address: ""
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo location feita corretamente com latitude, longitude e name", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: ""
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo location feita corretamente com latitude, longitude, name e address", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'name' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "location E2E editado",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'message.location.latitude' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379335,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'message.location.longitude' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764272,
					name: "42 Rio",
					address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'message.location.name' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio editado",
					address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'message.location.address' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072 editado"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo document feita corretamente com link e filename", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: ""
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo document feita corretamente com link, filename e caption", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: "mensagem de document com caption do teste automatizado E2E"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'name' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: "mensagem de document com caption do teste automatizado E2E"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "document E2E editado",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: "mensagem de document com caption do teste automatizado E2E"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'message.document.link' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: "mensagem de document com caption do teste automatizado E2E"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "document E2E editado",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1774031955635-0af90410-6e2a-48ed-8f13-6dad0fad2770.zip",
					filename: "nome.pdf",
					caption: "mensagem de document com caption do teste automatizado E2E"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'message.document.filename' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: "mensagem de document com caption do teste automatizado E2E"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "document E2E editado",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome editado.pdf",
					caption: "mensagem de document com caption do teste automatizado E2E"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição do tipo video feita corretamente tentando editar o campo 'message.document.caption' usando 'id'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: "mensagem de document com caption do teste automatizado E2E"
				}
			}
		});
		const resEdit = await server.emit("quick-messages:save_quick_message", {
			id: res.id,
			name: "document E2E editado",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: "mensagem de document com caption do teste automatizado E2E editado"
				}
			}
		});
		const resDelete = await server.emit("quick-messages:delete_quick_message", { id: res.id });

		expect(res).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(resEdit).toMatchObject({
			code: 200,
			id: expect.any(String)
		});
		expect(res.id).toBe(resEdit.id);
		expect(resDelete.code).toBe(204);
	});

	test("requisição feita passando null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", null);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", []);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um boolean", async () => {
		const res = await server.emit("quick-messages:save_quick_message", true);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando uma string", async () => {
		const res = await server.emit("quick-messages:save_quick_message", "string");

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", 42);

		expect(res).toEqual({
			code: 400,
			error: "O payload deve ser um objeto"
		});
	});

	test("requisição feita passando null dentro de 'name'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", { name: null });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'name'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", { name: {} });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'name'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", { name: [] });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um boolean dentro de 'name'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", { name: true });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'name'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", { name: "" });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'name'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", { name: 42 });

		expect(res).toEqual({
			code: 400,
			error: 'O campo "name" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando null dentro de 'message'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: null
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo object e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'message'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: {}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'message'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: []
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo object e não deve estar vazio'
		});
	});

	test("requisição feita passando um boolean dentro de 'message'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: true
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo object e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string dentro de 'message'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: "string"
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo object e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'message'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: 42
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message" deve ser do tipo object e não deve estar vazio'
		});
	});

	test("requisição feita passando null dentro de 'message.type'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: {
				type: null
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um objeto dentro de 'message.type'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: {
				type: {}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um array dentro de 'message.type'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: {
				type: []
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um boolean dentro de 'message.type'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: {
				type: true
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando uma string dentro de 'message.type'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: {
				type: "string"
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.string" deve conter um objeto válido'
		});
	});

	test("requisição feita passando uma string vazia dentro de 'message.type'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: {
				type: ""
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um number dentro de 'message.type'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: {
				type: 42
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.type" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição feita passando um tipo inexistente dentro de 'message.type' e preenchendo o campo 'message[message.type]'", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "name E2E",
			message: {
				type: "string",
				string: {}
			}
		});

		expect(res).toEqual({
			code: 404,
			error: "Mensagem do tipo string não existente"
		});
	});

	test("requisição do tipo text com 'message.text' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: null
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text" deve conter um objeto válido'
		});
	});

	test("requisição do tipo text com 'message.text' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: {}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text.body" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo text com 'message.text' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: []
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text" deve conter um objeto válido'
		});
	});

	test("requisição do tipo text com 'message.text' recebendo um boolean", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: true
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text" deve conter um objeto válido'
		});
	});

	test("requisição do tipo text com 'message.text' recebendo uma string", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: "string"
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text" deve conter um objeto válido'
		});
	});

	test("requisição do tipo text com 'message.text' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: 42
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text" deve conter um objeto válido'
		});
	});

	test("requisição do tipo text com 'message.text.body' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: {
					body: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text.body" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo text com 'message.text.body' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: {
					body: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text.body" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo text com 'message.text.body' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: {
					body: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text.body" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo text com 'message.text.body' recebendo um boolean", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: {
					body: true
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text.body" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo text com 'message.text.body' recebendo uma string vazia", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: {
					body: ""
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text.body" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo text com 'message.text.body' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "text E2E",
			message: {
				type: "text",
				text: {
					body: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.text.body" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo audio com 'message.audio' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: null
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio" deve conter um objeto válido'
		});
	});

	test("requisição do tipo audio com 'message.audio' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo audio com 'message.audio' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: []
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio" deve conter um objeto válido'
		});
	});

	test("requisição do tipo audio com 'message.audio' recebendo uma string", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: "string"
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio" deve conter um objeto válido'
		});
	});

	test("requisição do tipo audio com 'message.audio' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: 42
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio" deve conter um objeto válido'
		});
	});

	test("requisição do tipo audio com 'message.audio.link' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo audio com 'message.audio.link' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo audio com 'message.audio.link' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo audio com 'message.audio.link' recebendo uma string vazia", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: ""
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo audio com 'message.audio.link' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo audio com 'message.audio.voice' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga",
					voice: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio.voice" deve ser do tipo boolean'
		});
	});

	test("requisição do tipo audio com 'message.audio.voice' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga",
					voice: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio.voice" deve ser do tipo boolean'
		});
	});

	test("requisição do tipo audio com 'message.audio.voice' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga",
					voice: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio.voice" deve ser do tipo boolean'
		});
	});

	test("requisição do tipo audio com 'message.audio.voice' recebendo uma string", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga",
					voice: "string"
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio.voice" deve ser do tipo boolean'
		});
	});

	test("requisição do tipo audio com 'message.audio.voice' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "audio E2E",
			message: {
				type: "audio",
				audio: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga",
					voice: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.audio.voice" deve ser do tipo boolean'
		});
	});

	test("requisição do tipo image com 'message.image' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: null
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image" deve conter um objeto válido'
		});
	});

	test("requisição do tipo image com 'message.image' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo audio com 'message.image' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: []
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image" deve conter um objeto válido'
		});
	});

	test("requisição do tipo image com 'message.image' recebendo uma string", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: "string"
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image" deve conter um objeto válido'
		});
	});

	test("requisição do tipo image com 'message.image' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: 42
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image" deve conter um objeto válido'
		});
	});

	test("requisição do tipo image com 'message.image.link' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo image com 'message.image.link' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo image com 'message.image.link' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo image com 'message.image.link' recebendo uma string vazia", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: ""
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo image com 'message.image.link' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo image com 'message.image.caption' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo image com 'message.image.caption' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo image com 'message.image.caption' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo image com 'message.image.caption' recebendo um boolean", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: true
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo image com 'message.image.caption' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "image E2E",
			message: {
				type: "image",
				image: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg",
					caption: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.image.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo video com 'message.video' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: null
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video" deve conter um objeto válido'
		});
	});

	test("requisição do tipo video com 'message.video' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo audio com 'message.video' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: []
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video" deve conter um objeto válido'
		});
	});

	test("requisição do tipo video com 'message.video' recebendo uma string", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: "string"
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video" deve conter um objeto válido'
		});
	});

	test("requisição do tipo video com 'message.video' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: 42
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video" deve conter um objeto válido'
		});
	});

	test("requisição do tipo video com 'message.video.link' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo video com 'message.video.link' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo video com 'message.video.link' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo video com 'message.video.link' recebendo uma string vazia", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: ""
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo video com 'message.video.link' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo video com 'message.video.caption' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo video com 'message.video.caption' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo video com 'message.video.caption' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo video com 'message.video.caption' recebendo um boolean", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: true
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo video com 'message.video.caption' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "video E2E",
			message: {
				type: "video",
				video: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4",
					caption: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.video.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo location com 'message.location' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: null
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location" deve conter um objeto válido'
		});
	});

	test("requisição do tipo location com 'message.location' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.latitude" deve ser do tipo number'
		});
	});

	test("requisição do tipo audio com 'message.location' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: []
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location" deve conter um objeto válido'
		});
	});

	test("requisição do tipo location com 'message.location' recebendo uma string", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: "string"
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location" deve conter um objeto válido'
		});
	});

	test("requisição do tipo location com 'message.location' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: 42
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location" deve conter um objeto válido'
		});
	});

	test("requisição do tipo location com 'message.location.latitude' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.latitude" deve ser do tipo number'
		});
	});

	test("requisição do tipo location com 'message.location.latitude' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.latitude" deve ser do tipo number'
		});
	});

	test("requisição do tipo location com 'message.location.latitude' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.latitude" deve ser do tipo number'
		});
	});

	test("requisição do tipo location com 'message.location.latitude' recebendo uma string", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: "string"
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.latitude" deve ser do tipo number'
		});
	});

	test("requisição do tipo location com 'message.location.latitude' recebendo um number menor que -90", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -91
				}
			}
		});

		expect(res).toEqual({
			code: 422,
			error: 'Campo "message.location.latitude" inválido'
		});
	});

	test("requisição do tipo location com 'message.location.latitude' recebendo um number maior que 90", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: 91
				}
			}
		});

		expect(res).toEqual({
			code: 422,
			error: 'Campo "message.location.latitude" inválido'
		});
	});

	test("requisição do tipo location com 'message.location.longitude' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.longitude" deve ser do tipo number'
		});
	});

	test("requisição do tipo location com 'message.location.longitude' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.longitude" deve ser do tipo number'
		});
	});

	test("requisição do tipo location com 'message.location.longitude' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.longitude" deve ser do tipo number'
		});
	});

	test("requisição do tipo location com 'message.location.longitude' recebendo uma string", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: "string"
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.longitude" deve ser do tipo number'
		});
	});

	test("requisição do tipo location com 'message.location.longitude' recebendo um number menor que -180", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -181
				}
			}
		});

		expect(res).toEqual({
			code: 422,
			error: 'Campo "message.location.longitude" inválido'
		});
	});

	test("requisição do tipo location com 'message.location.longitude' recebendo um number maior que 180", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: 181
				}
			}
		});

		expect(res).toEqual({
			code: 422,
			error: 'Campo "message.location.longitude" inválido'
		});
	});

	test("requisição do tipo location com 'message.location.name' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.name" deve ser do tipo string'
		});
	});

	test("requisição do tipo location com 'message.location.name' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.name" deve ser do tipo string'
		});
	});

	test("requisição do tipo location com 'message.location.name' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.name" deve ser do tipo string'
		});
	});

	test("requisição do tipo location com 'message.location.name' recebendo um boolean", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: true
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.name" deve ser do tipo string'
		});
	});

	test("requisição do tipo location com 'message.location.name' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.name" deve ser do tipo string'
		});
	});

	test("requisição do tipo location com 'message.location.address' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.address" deve ser do tipo string'
		});
	});

	test("requisição do tipo location com 'message.location.address' recebendo um onjeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.address" deve ser do tipo string'
		});
	});

	test("requisição do tipo location com 'message.location.address' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.address" deve ser do tipo string'
		});
	});

	test("requisição do tipo location com 'message.location.address' recebendo um boolean", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: true
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.address" deve ser do tipo string'
		});
	});

	test("requisição do tipo location com 'message.location.address' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "location E2E",
			message: {
				type: "location",
				location: {
					latitude: -22.909916052379334,
					longitude: -43.19812500764271,
					name: "42 Rio",
					address: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.location.address" deve ser do tipo string'
		});
	});

	test("requisição do tipo document com 'message.document' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: null
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document" deve conter um objeto válido'
		});
	});

	test("requisição do tipo document com 'message.document' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo audio com 'message.document' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: []
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document" deve conter um objeto válido'
		});
	});

	test("requisição do tipo document com 'message.document' recebendo uma string", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: "string"
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document" deve conter um objeto válido'
		});
	});

	test("requisição do tipo document com 'message.document' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: 42
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document" deve conter um objeto válido'
		});
	});

	test("requisição do tipo document com 'message.document.link' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo document com 'message.document.link' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo document com 'message.document.link' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo document com 'message.document.link' recebendo um string vazia", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: ""
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo document com 'message.document.link' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.link" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo document com 'message.document.filename' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.filename" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo document com 'message.document.filename' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.filename" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo document com 'message.document.filename' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.filename" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo document com 'message.document.filename' recebendo uma string vazia", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: ""
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.filename" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo document com 'message.document.filename' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.filename" deve ser do tipo string e não deve estar vazio'
		});
	});

	test("requisição do tipo document com 'message.document.caption' recebendo null", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: null
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo document com 'message.document.caption' recebendo um objeto", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: {}
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo document com 'message.document.caption' recebendo um array", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: []
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo document com 'message.document.caption' recebendo um boolean", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: true
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.caption" deve ser do tipo string'
		});
	});

	test("requisição do tipo document com 'message.document.caption' recebendo um number", async () => {
		const res = await server.emit("quick-messages:save_quick_message", {
			name: "document E2E",
			message: {
				type: "document",
				document: {
					link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf",
					filename: "nome.pdf",
					caption: 42
				}
			}
		});

		expect(res).toEqual({
			code: 400,
			error: 'O campo "message.document.caption" deve ser do tipo string'
		});
	});
});