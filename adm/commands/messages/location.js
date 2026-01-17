import send from "../../../Send/Send.js";
import mongodb from "../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/location" (TESTA A MENSAGEM DO TIPO "location")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function location(account, message) {
	try {
		await send.location(account, message.from, { location: { latitude: -22.909916052379334, longitude: -43.19812500764271 } });
		await send.location(account, message.from, { context: { message_id: message.id }, location: { latitude: -22.909916052379334, longitude: -43.19812500764271 } });
		await send.location(account, message.from, { location: { latitude: -22.909916052379334, longitude: -43.19812500764271, name: "42 Rio", address: "R. Marquês de Sapucaí, 200 - Santo Cristo, Rio de Janeiro - RJ, 20210-072" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "location": ${error}`);
	}
}