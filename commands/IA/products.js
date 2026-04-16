import mongodb from "../../MongoDB/Mongodb.js";
import IA from "../../IA/IA.js";
import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief INTERPRETA A MENSAGEM E GERA UMA RESPOSTA COM OS PRECOS
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function products(account, message) {
	try {
		// const res = await IA.groq["moonshotai/kimi-k2-instruct"].products(account, message);
		const res = await IA.groq["llama-3.3-70b-versatile"].products(account, message);

		if (res) await send.text(account, message.from, { text: { body: res } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "products": ${error}`);
	}
}