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
	// await send.reaction(account, message.from, message.id, "😀");

	// await send.text(account, message.from, "testando");

	// await send.image(account, message.from, "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg", "michael jackson");
	// await send.image(account, message.from, "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg");

	// await send.list(account, message.from, "Botao lista", sections, { header: { text: "texto do header" }, body: { text: "texto do body" }, footer: { text: "texto do footer" } });

	// await send.button(account, message.from, buttons, { body: { text: "texto do body" } });
	// await send.button(account, message.from, buttons, { header: { text: "texto do header" }, body: { text: "texto do body" }, footer: { text: "texto do footer" } });
	// await send.button(account, message.from, buttons, { header: { image: { link: "https://cloudfront-us-east-1.images.arcpublishing.com/bloomberglinea/D4G26SQFRNHRHBVURTB5HJSIFI.png" } }, body: { text: "texto do body" } });
	// await send.button(account, message.from, buttons, { header: { video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4" } }, body: { text: "texto do body" } });
	// await send.button(account, message.from, buttons, { header: { document: { link: "https://equilead.org/assets/eventagendadocument/sample.pdf", filename: "pdf teste" } }, body: { text: "texto do body" } });

	// await send.location(account, message.from, -22.909916052379334, -43.19812500764271, "42 Rio", "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072");
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