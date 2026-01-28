import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief 
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
async function location(account, message) {
	try {
		if (!account.bot.location.latitude || !account.bot.location.longitude || !account.bot.location.name || !account.bot.location.address) return ;
		await send.location(account, message.from, { location: { latitude: account.bot.location.latitude, longitude: account.bot.location.longitude, name: account.bot.location.name, address: account.bot.location.address } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "location": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief 
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
async function redirect(account, message) {
	try {
		// if ()	// E SE account.bot.redirect NAO ESTIVER CONFIGURADO?
		await send.text(account, message.from, { text: { body: `Em breve um atendente vai entrar em contato com você.\nLink do contato: https://wa.me/5521971178764?text=Gostaria%20de%20continuar%20o%20atendimento` } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "redirect": ${error}`);
	}
}


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