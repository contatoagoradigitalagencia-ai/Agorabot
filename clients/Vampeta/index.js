import googleSheets from "../../Google Sheets/GoogleSheets.js";
import send from "../../Send/Send.js";

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

const buttons = [
	{
		type: "reply",
		reply:
		{
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
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DO BOT DE UM CLIENTE ESPECIFICO PARA RECEBIMENTO DO TIPO "text"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function vampetaText(account, message) {
	if (message.text.body === "/all" || message.text.body === "/reaction") {
		await send.reaction(account, message.from, { reaction: { message_id: message.id, emoji: "😀" } });
	}

	if (message.text.body === "/all" || message.text.body === "/text") {
		await send.text(account, message.from, { text: { body: "texto" } });
		await send.text(account, message.from, { context: { message_id: message.id }, text: { body: "texto" } });
	}

	if (message.text.body === "/all" || message.text.body === "/image") {
		await send.image(account, message.from, { image: { link: "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg" } });
		await send.image(account, message.from, { context: { message_id: message.id }, image: { link: "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg" } });
		await send.image(account, message.from, { image: { link: "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg", caption: "descricao" } });
	}

	if (message.text.body === "/all" || message.text.body === "/video") {
		await send.video(account, message.from, { video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4" } });
		await send.video(account, message.from, { context: { message_id: message.id }, video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4" } });
		await send.video(account, message.from, { video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4", caption: "descricao" } });
	}

	if (message.text.body === "/all" || message.text.body === "/location") {
		await send.location(account, message.from, { location: { latitude: -22.909916052379334, longitude: -43.19812500764271 } });
		await send.location(account, message.from, { location: { latitude: -22.909916052379334, longitude: -43.19812500764271, name: "42 Rio", address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072" } });
		await send.location(account, message.from, { context: { message_id: message.id }, location: { latitude: -22.909916052379334, longitude: -43.19812500764271, name: "42 Rio", address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072" } });
	}

	if (message.text.body === "/all" || message.text.body === "/contacts") {
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [ { phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" } ], org: { company: "compania", title: "titulo" } } });
		await send.contacts(account, message.from, { context: { message_id: message.id }, contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [ { phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" } ], org: { company: "compania", title: "titulo" } } });
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, emails: [ { email: "email@dominio.com" }, { email: "email@dominio.com" } ], org: { company: "compania", title: "titulo" } } });
		await send.contacts(account, message.from, { contacts: { name: { formatted_name: "nome", first_name: "primeiro nome" }, phones: [ { phone: "(00) 0000-00000" }, { phone: "(00) 0000-00000" } ], emails: [ { email: "email@dominio.com" }, { email: "email@dominio.com" } ], org: { company: "compania", title: "titulo" } } });
	}

	if (message.text.body === "/all" || message.text.body === "/button") {
		await send.button(account, message.from, { body: { text: "texto do body" }, action: { buttons: buttons } });
		await send.button(account, message.from, { context: { message_id: message.id }, body: { text: "texto do body" }, action: { buttons: buttons } });
		await send.button(account, message.from, { header: { text: "texto do header" }, body: { text: "texto do body" }, footer: { text: "texto do footer" }, action: { buttons: buttons } });
		await send.button(account, message.from, { header: { image: { link: "https://cloudfront-us-east-1.images.arcpublishing.com/bloomberglinea/D4G26SQFRNHRHBVURTB5HJSIFI.png" } }, body: { text: "texto do body" }, action: { buttons: buttons } });
		await send.button(account, message.from, { header: { video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4" } }, body: { text: "texto do body" }, action: { buttons: buttons } });
		await send.button(account, message.from, { header: { document: { link: "https://equilead.org/assets/eventagendadocument/sample.pdf", filename: "pdf teste" } }, body: { text: "texto do body" }, action: { buttons: buttons } });
	}

	if (message.text.body === "/all" || message.text.body === "/list") {
		await send.list(account, message.from, { body: { text: "texto do body" }, action: { button: "botao", sections: sections } });
		await send.list(account, message.from, { context: { message_id: message.id }, body: { text: "texto do body" }, action: { button: "botao", sections: sections } });
		await send.list(account, message.from, { header: { text: "texto do header" }, body: { text: "texto do body" }, footer: { text: "texto do footer" }, action: { button: "botao", sections: sections } });
	}


	// cta_url		TESTAR ESSE TIPO
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DO BOT DE UM CLIENTE ESPECIFICO PARA RECEBIMENTO DO TIPO "interactive"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function vampetaInteractive(account, message) {
console.log(message)
}