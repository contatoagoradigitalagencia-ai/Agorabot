import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";


/**
 * @author VAMPETA
 * @brief GERENCIA A ATIVACAO DOS COMANDOS DE ADM
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
 * @param {Object} json RESPOSTA DA IA JA EM JSON
*/
export default async function commandsIA(account, message, json) {
	try {
		// const command = json.split(" ");

		// switch (command[0]) {
		switch (json.command) {
			case "/location":
				// if ()		// E SE NAO TIVER COMPLETO account.bot.location?
				await send.location(account, message.from, { location: { latitude: account.bot.location.latitude, longitude: account.bot.location.longitude, name: account.bot.location.name, address: account.bot.location.address } });
				break;

			default:
				// await send.text(account, message.from, { text: { body: "Comando não encontrado. Digite `/ajuda` para ver os comandos disponíveis." } });
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "commandsIA": ${error}`);
	}
}