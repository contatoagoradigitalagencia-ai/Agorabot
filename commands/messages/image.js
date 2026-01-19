import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/image" (TESTA A MENSAGEM DO TIPO "image")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function image(account, message) {
	try {
		await send.image(account, message.from, { image: { link: "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg" } });
		await send.image(account, message.from, { context: { message_id: message.id }, image: { link: "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg" } });
		await send.image(account, message.from, { image: { link: "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg", caption: "descricao" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "image": ${error}`);
	}
}