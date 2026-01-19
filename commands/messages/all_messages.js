import mongodb from "../../MongoDB/Mongodb.js";

import reaction from "./reaction.js";
import text from "./text.js";
import image from "./image.js";
import video from "./video.js";
import location from "./location.js";
import contacts from "./contacts.js";
import button from "./button.js";
import list from "./list.js";
// import template from "./messages/template.js";	// DESABILITADO PARA NAO GERAR COBRANCAS

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/all_messages" (TESTA A MENSAGEM DO TIPO "all")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function all_messages(account, message) {
	try {
		await reaction(account, message);
		await text(account, message);
		await image(account, message);
		await video(account, message);
		await location(account, message);
		await contacts(account, message);
		await button(account, message);
		await list(account, message);
		// await template(account, message);	// DESABILITADO PARA NAO GERAR COBRANCAS
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "all_messages": ${error}`);
	}
}