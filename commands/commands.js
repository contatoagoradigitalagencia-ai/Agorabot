import send from "../Send/Send.js";
import mongodb from "../MongoDB/Mongodb.js";

import help from "./help.js";
import adm from "./adm/adm.js";
import add_adm from "./adm/add_adm.js";
import remove_adm from "./adm/remove_adm.js";
import contatos from "./contatos.js";
import prompt from "./bot/prompt.js";
import new_prompt from "./bot/new_prompt.js";
import all_messages from "./messages/all_messages.js";
import reaction from "./messages/reaction.js";
import text from "./messages/text.js";
import image from "./messages/image.js";
import video from "./messages/video.js";
import location from "./messages/location.js";
import contacts from "./messages/contacts.js";
import button from "./messages/button.js";
import list from "./messages/list.js";
// import template from "./commands/messages/template.js";	// DESABILITADO PARA NAO GERAR COBRANCAS

/**
 * @author VAMPETA
 * @brief GERENCIA A ATIVACAO DOS COMANDOS DE ADM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function commands(account, message) {
	try {
		const command = message.text.body.split(" ");

		switch (command[0]) {
			case "/help":
				await help(account, message);
				break;

			case "/adm":
				await adm(account, message);
				break;

			case "/add_adm":
				await add_adm(account, message);
				break;

			case "/remove_adm":
				await remove_adm(account, message);
				break;

			case "/contatos":
				await contatos(account, message);
				break;

			case "/prompt":
				await prompt(account, message);
				break;

			case "/new_prompt":
				await new_prompt(account, message);
				break;

			case "/all_messages":
				await all_messages(account, message);
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