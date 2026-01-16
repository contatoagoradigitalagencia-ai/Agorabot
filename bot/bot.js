import send from "../Send/Send.js";

/**
 * @author VAMPETA
 * @brief GERENCIA O COMPORTAMENTO DO BOT
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function bot(account, message) {
	try {
		await send.text(account, message.from, { text: { body: "Oi, eu sou um bot!" } });
	} catch (error) {
		// FALTA SALVAR ERRO
	}
}