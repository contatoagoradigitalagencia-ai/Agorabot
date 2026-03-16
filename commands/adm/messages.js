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
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/image" (TESTA A MENSAGEM DO TIPO "image")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function image(account, message) {
	try {
		const url = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg", "image");
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
		await send.video(account, message.from, { video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4" } });
		await send.video(account, message.from, { context: { message_id: message.id }, video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4" } });
		await send.video(account, message.from, { video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4", caption: "descricao" } });
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
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [{ phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" }], org: { company: "compania", title: "titulo" } } });
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [{ phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" }], emails: [{ email: "email@dominio.com" }, { email: "email@dominio.com" }] } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "contacts": ${error}`);
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
		await send.button(account, message.from, { header: { image: { link: "https://cloudfront-us-east-1.images.arcpublishing.com/bloomberglinea/D4G26SQFRNHRHBVURTB5HJSIFI.png" } }, body: { text: "texto do body" }, action: { buttons: buttons } });
		await send.button(account, message.from, { header: { video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4" } }, body: { text: "texto do body" }, action: { buttons: buttons } });
		await send.button(account, message.from, { header: { document: { link: "https://equilead.org/assets/eventagendadocument/sample.pdf", filename: "pdf teste" } }, body: { text: "texto do body" }, action: { buttons: buttons } });
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