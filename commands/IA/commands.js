import mongodb from "../../MongoDB/Mongodb.js";

import location from "./location.js";
import redirect from "./redirect.js";

/**
 * @author VAMPETA
 * @brief GERENCIA A ATIVACAO DOS COMANDOS DA IA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
 * @param {Array<String>} commands ARRAY DE COMANDOS A SEREM EXECUTADOS
*/
export default async function commandsIA(account, message, commands) {
	try {
		for (const commandArg of commands) {
			const command = commandArg.split(" ");

			switch (command[0]) {
				case "/location":
					await location(account, message);
					break;

				case "/redirect":
					await redirect(account, message);
					break;

				default:
					// await send.text(account, message.from, { text: { body: "Comando não encontrado. Digite `/ajuda` para ver os comandos disponíveis." } });
			}
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "commandsIA": ${error}`);
	}
}