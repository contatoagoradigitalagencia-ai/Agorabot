import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

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
export default async function button(account, message) {
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