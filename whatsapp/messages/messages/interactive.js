import mongodb from "../../../MongoDB/Mongodb.js";
import { redirection } from "../../../commands/IA/redirect.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM INTERACTIVE CASO ELA SEJA DO TIPO "button_reply"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
async function button_reply(account, message) {
	try {
		const { interactive, ...rest } = message;
		const saveMessage = {
			...rest,
			type: "text",
			text: {
				body: interactive.button_reply.title
			}
		};

		await mongodb.saveTextReceived(account.idPhone, saveMessage);
		switch (interactive.button_reply.id) {
			case ("cancel"):
				break;
			case ("redirect"):
				await redirection(account, message.from);
				break;
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "list_reply": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "interactive"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function interactive(account, message) {
	try {
		switch (message.interactive.type) {
			case ("button_reply"):
				await button_reply(account, message);
				break;
			case ("list_reply"):
				console.log("chegou resposta de lista");
				break;
			default:
				await mongodb.saveTextReceived(account.idPhone, { id: message.id, from: message.from, timestamp: message.timestamp, type: "text", text: { body: `Mensagem interactive não suportada: ${message.interactive.type}` } });
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "interactive": ${error}`);
	}
}