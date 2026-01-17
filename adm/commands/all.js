import mongodb from "../../MongoDB/Mongodb.js";

import reaction from "./messages/reaction.js";
import text from "./messages/text.js";
import image from "./messages/image.js";
import video from "./messages/video.js";
import location from "./messages/location.js";
import contacts from "./messages/contacts.js";
import button from "./messages/button.js";
import list from "./messages/list.js";
// import template from "./messages/template.js";	// DESABILITADO PARA NAO GERAR COBRANCAS

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/all" (TESTA A MENSAGEM DO TIPO "all")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function all(account, message) {
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
		await mongodb.saveError(account.idPhone, `Error na funcao "all": ${error}`);
	}
}