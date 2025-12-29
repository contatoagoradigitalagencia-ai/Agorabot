import { Chat } from "../MongoDB/schema.js";

/**
 * @author VAMPETA
 * @brief ENVIA A LISTA DE CONTATOS PARA SERVIR A ABA DE CHAT DO FRONT END
 * @param payload PAYLOAD RECEBIDO
 * @param callback FUNCAO DE CALLBACK
*/
export default async function contacts(payload, callback) {
	callback({
		ok: true,
		data: await Chat.find({})
	});
}