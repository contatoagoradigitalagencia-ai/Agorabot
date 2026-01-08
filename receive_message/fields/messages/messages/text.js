import { mongodb } from "../../../../configs/mongodb.js";
import sendText from "../../../../send_message/send-text.js";
import sendImage from "../../../../send_message/send-image.js";

import sockets from "../../../../websocket/sockets.js";
// import Groq from "groq-sdk";

import vampeta from "../../../../clients/Vampeta/index.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "text"
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
*/
export default async function text(message, account) {
	await mongodb.saveTextReceived(account.idPhone, message.id, message.from, message.text.body, new Date(Number(message.timestamp) * 1000).toISOString());



	// GOOGLE SHEETS
	// const test = await teste(account, message.text.body);
	// if (typeof test === "string") await sendText(message.from, test, account);
	// if (typeof test === "object" && test.link && test.caption) await sendImage(message.from, test.link, test.caption, account);
	// GOOGLE SHEETS
	// const doc = await teste(account);
	// const sheet = doc.sheetsByTitle["Página1"];
	// await sheet.loadHeaderRow();
	// console.log(sheet.title);
	// console.log(sheet.headerValues);
	// const rows = await sheet.getRows();
	// console.log(rows)
	// console.log(Object.keys(rows[0]));
	// for (const row of rows) {
	// 	console.log({
	// 		nome: row.get("Nome"),
	// 		foto: row.get("Foto"),
	// 		anime: row.get("Anime")
	// 	});
	// }
	// for (const row of rows) {
	// 	if (row.get("Nome") === message.text.body) {
	// 		console.log(row.get("Nome"));
	// 		await sendImage(message.from, row.get("Foto"), row.get("Anime"), account);
	// 	}
	// }
	// GOOGLE SHEETS
// GOOGLE SHEETS
	// const page = await googleSheets.getPage(account, "Página1");
	// if (page) console.log(page);
// GOOGLE SHEETS

// CHATBOT IA
// CHATBOT IA

// DONO DA CONTA
	await vampeta(account, message);
// DONO DA CONTA


	// await sendText(account, message.from, "Mensagem recebida com sucesso!");
	// await sendImage(message.from, "https://i1.sndcdn.com/artworks-qAOgl3ivzZzIw0dz-3mVPvA-t1080x1080.jpg", "Satoru Gojo", account);

// FRONT END WEBSOCKET
	// const teste = sockets.get(message.from);
	// console.log(teste)
// FRONT END WEBSOCKET
}