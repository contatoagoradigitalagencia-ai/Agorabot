import mongodb from "../../MongoDB/Mongodb.js";
import IA from "../../IA/IA.js";
import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief INTERPRETA A MENSAGEM E GERA UMA RESPOSTA COM OS PRECOS
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE ENVIO A MENSAGEM
*/
export async function products(account, phone) {
	try {
		const res = await IA.groq["llama-3.3-70b-versatile"].products(account, phone);

		if (res) await send.text(account, phone, { text: { body: res } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "products": ${error}`);
	}
}