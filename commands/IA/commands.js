import mongodb from "../../MongoDB/Mongodb.js";

import { location } from "./location.js";
import { redirect } from "./redirect.js";
import { products } from "./products.js";


// 			import googleSheets from "../../Google Sheets/GoogleSheets.js";				// GAMBIARRA
// 			import send from "../../Send/Send.js";				// GAMBIARRA

// async function getConstructions(account, phone) {				// GAMBIARRA
// 	try {
// 		const constructions = await googleSheets.getPageJson(account, "Construção");

// 		for (let construction of constructions) {
// 			await send.text(account, phone, { text: { body: `Nome da obra: ${construction["Nome"]}\nEndereço: ${construction["Endereço"]}\nContato: ${construction["Contato"]}` } });
// 		}
// 	} catch (error) {
// 		await mongodb.saveError(account.idPhone, `Error na funcao "getConstructions": ${error}`);
// 	}
// }

// async function saveConstructions(account, phone, json) {				// GAMBIARRA
// 	try {
// 		await googleSheets.googleSheets.spreadsheets.values.append({
// 			spreadsheetId: "1sVxc7O8P0swUNFbk8UP_xw3Jv2uequWWu4JGFJVASKQ",
// 			range: "Construção!A:C",
// 			valueInputOption: "USER_ENTERED",
// 			insertDataOption: "INSERT_ROWS",
// 			requestBody: {
// 				values: [
// 					[
// 						json.payload.name,
// 						json.payload.address,
// 						json.payload.contact
// 					]
// 				]
// 			}
// 		});
// 	} catch (error) {
// 		await mongodb.saveError(account.idPhone, `Error na funcao "saveConstructions": ${error}`);
// 	}
// }

/**
 * @author VAMPETA
 * @brief GERENCIA A ATIVACAO DOS COMANDOS DA IA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE ENVIO A MENSAGEM
 * @param {Array<String>} commands ARRAY DE COMANDOS A SEREM EXECUTADOS
*/
export default async function commandsIA(account, phone, commands, json) {		// ESSE json SO FOI ADICIONADO PARA FAZER A GAMBIARRA
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

// case "/getConstructions":				// GAMBIARRA
// 	await getConstructions(account, phone);
// 	break;
// case "/saveConstructions":				// GAMBIARRA
// 	await saveConstructions(account, phone, json);
// 	break;

				default:
					await mongodb.saveError(account.idPhone, `A IA envio um comando não existente: ${commandArg}`);
			}
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "commandsIA": ${error}`);
	}
}