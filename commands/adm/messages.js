import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";
import cloudflareR2 from "../../Cloudflare R2/CloudflareR2.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/all_messages" (TESTA A MENSAGEM DO TIPO "all")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function all_messages(account, message) {
	try {
		await reaction(account, message);
		await text(account, message);
		await image(account, message);
		await video(account, message);
		await location(account, message);
		await contacts(account, message);
		await button(account, message);
		await list(account, message);
		// await template(account, message);	// DESABILITADO PARA NAO GERAR COBRANCAS
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "all_messages": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/reaction" (TESTA A MENSAGEM DO TIPO "reaction")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function reaction(account, message) {
	try {
		await send.reaction(account, message.from, { reaction: { message_id: message.id, emoji: "😀" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "reaction": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/text" (TESTA A MENSAGEM DO TIPO "text")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function text(account, message) {
	try {
		await send.text(account, message.from, { text: { body: "texto" } });
		await send.text(account, message.from, { context: { message_id: message.id }, text: { body: "texto" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "text": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/sticker" (TESTA A MENSAGEM DO TIPO "audio")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function sticker(account, message) {
	try {
		// const staticSticker = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/sticker/2026/3/1774116526886-772f438f-edcf-45b9-9e7a-11d1155a5bdb.webp", "sticker");
		// const animatedSticker = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, process.env.CLOUDFLARE_R2_URL_PUBLIC + "", "sticker");

		// await send.sticker(account, message.from, { sticker: { link: staticSticker } });
		// await send.sticker(account, message.from, { context: { message_id: message.id }, sticker: { link: staticSticker } });
		// await send.sticker(account, message.from, { sticker: { link: animatedSticker } });
		await send.text(account, message.from, { text: { body: "Por enquanto este comando não está funcionando" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "sticker": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/audio" (TESTA A MENSAGEM DO TIPO "audio")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function audio(account, message) {
	try {
		const url = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga", "audio");

		await send.audio(account, message.from, { audio: { link: url, voice: true } });
		await send.audio(account, message.from, { context: { message_id: message.id }, audio: { link: url, voice: true } });
		await send.audio(account, message.from, { audio: { link: url, voice: false } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "audio": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/image" (TESTA A MENSAGEM DO TIPO "image")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function image(account, message) {
	try {
		const url = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg", "image");

		await send.image(account, message.from, { image: { link: url } });
		await send.image(account, message.from, { context: { message_id: message.id }, image: { link: url } });
		await send.image(account, message.from, { image: { link: url, caption: "descricao" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "image": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/video" (TESTA A MENSAGEM DO TIPO "video")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function video(account, message) {
	try {
		const url = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4", "video");

		await send.video(account, message.from, { video: { link: url } });
		await send.video(account, message.from, { context: { message_id: message.id }, video: { link: url } });
		await send.video(account, message.from, { video: { link: url, caption: "descricao" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "video": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/location" (TESTA A MENSAGEM DO TIPO "location")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function location(account, message) {
	try {
		await send.location(account, message.from, { location: { latitude: account.bot.location.latitude, longitude: account.bot.location.longitude } });
		await send.location(account, message.from, { context: { message_id: message.id }, location: { latitude: account.bot.location.latitude, longitude: account.bot.location.longitude } });
		await send.location(account, message.from, { location: { latitude: account.bot.location.latitude, longitude: account.bot.location.longitude, name: account.bot.location.name } });
		await send.location(account, message.from, { location: { latitude: account.bot.location.latitude, longitude: account.bot.location.longitude, name: account.bot.location.name, address: account.bot.location.address } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "location": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/contacts" (TESTA A MENSAGEM DO TIPO "contacts")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function contacts(account, message) {
	try {
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [{ phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" }] } });
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, emails: [{ email: "email@dominio.com" }, { email: "email@dominio.com" }] } });
		await send.contacts(account, message.from, { context: { message_id: message.id }, contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [{ phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" }] } });
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [{ phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" }], emails: [{ email: "email@dominio.com" }, { email: "email@dominio.com" }] } });
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [{ phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" }], org: { company: "compania", title: "titulo" } } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "contacts": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/document" (TESTA A MENSAGEM DO TIPO "document")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function document(account, message) {
	try {
		const mpga = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/audio/2026/3/1773779330594-f41a33b2-6822-42a8-a145-bcd472cf5210.mpga", "document");
		const jpg = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg", "document");
		const mp4 = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4", "document");
		const pdf = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf", "document");
		const zip = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1774031267479-fe5b629e-b8ec-4681-90de-2b156511e402.zip", "document");

		await send.document(account, message.from, { document: { link: mpga, filename: "nome.mpga" } });
		await send.document(account, message.from, { document: { link: jpg, filename: "nome.jpg" } });
		await send.document(account, message.from, { document: { link: mp4, filename: "nome.mp4" } });
		await send.document(account, message.from, { document: { link: zip, filename: "nome.zip" } });
		await send.document(account, message.from, { document: { link: pdf, filename: "O pequeno príncipe.pdf" } });
		await send.document(account, message.from, { context: { message_id: message.id }, document: { link: pdf, filename: "O pequeno príncipe.pdf" } });
		await send.document(account, message.from, { document: { link: pdf, filename: "O pequeno príncipe.pdf", caption: "descricao" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "video": ${error}`);
	}
}

const buttons = [
	{
		type: "reply",
		reply: {
			id: 1,
			title: "title 1"
		}
	},
	{
		type: "reply",
		reply: {
			id: 2,
			title: "title 2"
		}
	}
];

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/button" (TESTA A MENSAGEM DO TIPO "button")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function button(account, message) {
	try {
		await send.button(account, message.from, { body: { text: "texto do body" }, action: { buttons: buttons } });
		await send.button(account, message.from, { context: { message_id: message.id }, body: { text: "texto do body" }, action: { buttons: buttons } });
		await send.button(account, message.from, { header: { text: "texto do header" }, body: { text: "texto do body" }, footer: { text: "texto do footer" }, action: { buttons: buttons } });
		await send.button(account, message.from, { header: { image: { link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/image/2026/3/1773779116930-bba45ff0-4571-4508-a4f3-9adf4982aa78.jpg" } }, body: { text: "texto do body" }, action: { buttons: buttons } });
		await send.button(account, message.from, { header: { video: { link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/video/2026/3/1773870674570-ce6194d7-4530-45b8-a48f-33b965f47187.mp4" } }, body: { text: "texto do body" }, action: { buttons: buttons } });
		await send.button(account, message.from, { header: { document: { link: process.env.CLOUDFLARE_R2_URL_PUBLIC + "/871876402681006/5521971178764/document/2026/3/1773961241179-a37e1132-c074-450b-b477-134e5ef21b9b.pdf", filename: "pdf teste" } }, body: { text: "texto do body" }, action: { buttons: buttons } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "button": ${error}`);
	}
}

const sections = [
	{
		title: "categoria 1",
		rows: [
			{
				id: 1,
				title: "title 1",
				description: "description 1"
			},
			{
				id: 2,
				title: "title 2",
				description: "description 2"
			},
			{
				id: 3,
				title: "title 3",
				description: "description 3"
			}
		]
	},
	{
		title: "categoria 2",
		rows: [
			{
				id: 1,
				title: "title 1",
				description: "description 1"
			}
		]
	},
	{
		title: "categoria 3",
		rows: [
			{
				id: 1,
				title: "title 1",
				description: "description 1"
			},
			{
				id: 2,
				title: "title 2",
				description: "description 2"
			}
		]
	},
];

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/list" (TESTA A MENSAGEM DO TIPO "list")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function list(account, message) {
	try {
		await send.list(account, message.from, { body: { text: "texto do body" }, action: { button: "botao", sections: sections } });
		await send.list(account, message.from, { context: { message_id: message.id }, body: { text: "texto do body" }, action: { button: "botao", sections: sections } });
		await send.list(account, message.from, { header: { text: "texto do header" }, body: { text: "texto do body" }, footer: { text: "texto do footer" }, action: { button: "botao", sections: sections } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "list": ${error}`);
	}
}

// /**
//  * @author VAMPETA
//  * @brief FUNCAO RESPONSAVEL PELO COMANDO "/template" (TESTA A MENSAGEM DO TIPO "template")
//  * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
//  * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
// */
// export async function template(account, message) {	// DESABILITADO PARA NAO GERAR COBRANCAS
// 	try {
// 		await send.template(account, message.from, "teste_1");
// 		await send.template(account, message.from, "teste_2");
// 	} catch (error) {
// 		await mongodb.saveError(account.idPhone, `Error na funcao "template": ${error}`);
// 	}
// }