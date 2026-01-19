import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/video" (TESTA A MENSAGEM DO TIPO "video")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function video(account, message) {
	try {
		await send.video(account, message.from, { video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4" } });
		await send.video(account, message.from, { context: { message_id: message.id }, video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4" } });
		await send.video(account, message.from, { video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4", caption: "descricao" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "video": ${error}`);
	}
}