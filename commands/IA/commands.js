import mongodb from "../../MongoDB/Mongodb.js";

import location from "./location.js";
import redirect from "./redirect.js";
import products from "./products.js";

/**
 * @author VAMPETA
 * @brief GERENCIA A ATIVACAO DOS COMANDOS DA IA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE ENVIO A MENSAGEM
 * @param {Array<String>} commands ARRAY DE COMANDOS A SEREM EXECUTADOS
*/
export default async function commandsIA(account, phone, commands) {
	try {
		for (const commandArg of commands) {
			const command = commandArg.split(" ");

			switch (command[0]) {
				case "/location":
					await location(account, phone);
					break;

				case "/redirect":
					await redirect(account, phone);
					break;

				case "/products":
					await products(account, phone);
					break;

				default:
					await mongodb.saveError(account.idPhone, `A IA envio um comando não existente: ${commandArg}`);
			}
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "commandsIA": ${error}`);
	}
}