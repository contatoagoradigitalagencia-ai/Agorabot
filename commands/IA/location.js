import mongodb from "../../MongoDB/Mongodb.js";
import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief COMANDO QUE ENVIA A LOCALIZACAO PARA O CLIENTE
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function location(account, message) {
	try {
		if (!account.bot.location.latitude || !account.bot.location.longitude || !account.bot.location.name || !account.bot.location.address) return ;
		await send.location(account, message.from, { location: { latitude: account.bot.location.latitude, longitude: account.bot.location.longitude, name: account.bot.location.name, address: account.bot.location.address } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "location": ${error}`);
	}
}