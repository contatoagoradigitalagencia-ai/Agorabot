import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

import { help } from "./help.js";
import { adm, add_adm, remove_adm } from "./adm.js";
import { message_not_supported, new_message_not_supported, remove_message_not_supported } from "./message_not_supported.js";
import { prompt, new_prompt } from "./prompt.js";
import { spreadsheets, available_spreadsheets, view_spreadsheet, add_spreadsheets, remove_spreadsheets } from "./spreadsheets.js";
import { contatos } from "./contatos.js";
import { all_messages, reaction, text, image, video, location, contacts, button, list /*, template */ } from "./messages.js";

/**
 * @author VAMPETA
 * @brief GERENCIA A ATIVACAO DOS COMANDOS DE ADM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function commandsAdm(account, message) {
	try {
		const command = message.text.body.split(" ");

		switch (command[0]) {
			case "/ajuda":
				await help(account, message);
				break;

			case "/adm":
				await adm(account, message);
				break;

			case "/adicionar_adm":
				await add_adm(account, message);
				break;

			case "/remover_adm":
				await remove_adm(account, message);
				break;

			case "/mensagem_não_suportada":
				await message_not_supported(account, message);
				break;

			case "/nova_mensagem_não_suportada":
				await new_message_not_supported(account, message);
				break;

			case "/remover_mensagem_não_suportada":
				await remove_message_not_supported(account, message);
				break;

			case "/prompt":
				await prompt(account, message);
				break;

			case "/novo_prompt":
				await new_prompt(account, message);
				break;

			case "/planilhas":
				await spreadsheets(account, message);
				break;

			case "/planilhas_disponíveis":
				await available_spreadsheets(account, message);
				break;

			case "/ver_planilha":
				await view_spreadsheet(account, message);
				break;

			case "/adicionar_planilha":
				await add_spreadsheets(account, message);
				break;

			case "/remover_planilha":
				await remove_spreadsheets(account, message);
				break;

			case "/contatos":
				await contatos(account, message);
				break;

			case "/todas_mensagens":
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
				await send.text(account, message.from, { text: { body: "Comando não encontrado. Digite `/ajuda` para ver os comandos disponíveis." } });
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "commandsAdm": ${error}`);
	}
}