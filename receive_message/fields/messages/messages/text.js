import sendText from "../../../../send_message/send-text.js";
import sendImage from "../../../../send_message/send-image.js";
import { saveTextReceived } from "../../../../MongoDB/text.js";

import Account from "../../../../MongoDB/schemas/accounts.js";
import { getGoogleSheets } from "../../../../configs/google sheets.js";
import sockets from "../../../../websocket/sockets.js";
// import Groq from "groq-sdk";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "text"
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
*/
export default async function text(message, account) {
	await saveTextReceived(account.idPhone, message.id, message.from, message.text.body, new Date(Number(message.timestamp) * 1000).toISOString());

	const googleSheets = getGoogleSheets();
	const user = await Account.findOne({ idPhone: account.idPhone });
    const getRows = await googleSheets.spreadsheets.values.get({
        spreadsheetId: user.spreadsheet,
        range: "Página1"
    });
    // console.log(getRows.data)
	let test = "";
	for (const y of getRows.data.values) {
		for (const x of y) {
			test += x + " --- ";
		}
		test += "\n";
	}
	await sendText(message.from, test, account);
	// ATIVACAO DE MICROSSERVICOS COMO CHATBOT			// COMECAR A TRABALHAR NISSO?

	// await sendText(message.from, "Mensagem recebida com sucesso!", account);
	// await sendImage(message.from, "https://i1.sndcdn.com/artworks-qAOgl3ivzZzIw0dz-3mVPvA-t1080x1080.jpg", "Satoru Gojo", account);

	// const teste = sockets.get(message.from);
	// console.log(teste)
}