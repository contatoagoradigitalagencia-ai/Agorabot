import send from "../Send/Send.js";
import mongodb from "../MongoDB/Mongodb.js";

import help from "./commands/help.js";
import contatos from "./commands/contatos.js";
import all from "./commands/all.js";
import reaction from "./commands/messages/reaction.js";
import text from "./commands/messages/text.js";
import image from "./commands/messages/image.js";
import video from "./commands/messages/video.js";
import location from "./commands/messages/location.js";
import contacts from "./commands/messages/contacts.js";
import button from "./commands/messages/button.js";
import list from "./commands/messages/list.js";
// import template from "./commands/messages/template.js";	// DESABILITADO PARA NAO GERAR COBRANCAS

/**
 * @author VAMPETA
 * @brief GERENCIA A ATIVACAO DOS COMANDOS DE ADM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function adm(account, message) {
	try {
		switch (message.text.body) {
			case "/help":
				await help(account, message);
				break;

			case "/contatos":
				await contatos(account, message);
				break;

			case "/all":
				await all(account, message);
				break;

			case "/reaction":
				await reaction(account, message);
				break;

			case "/text":
				await text(account, message);
				break;

			case "/image":
				await image(account, message);
				break;

			case "/video":
				await video(account, message);
				break;

			case "/location":
				await location(account, message);
				break;

			case "/contacts":
				await contacts(account, message);
				break;

			case "/button":
				await button(account, message);
				break;

			case "/list":
				await list(account, message);
				break;

			// case "/template":	// DESABILITADO PARA NAO GERAR COBRANCAS
			// 	await template(account, message);
			// 	break;

			default:
				await send.text(account, message.from, { text: { body: "Comando não encontrado. Digite `/help` para ver os comandos disponíveis." } });
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "bot": ${error}`);
	}
}