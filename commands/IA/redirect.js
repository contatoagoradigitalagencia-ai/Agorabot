import mongodb from "../../MongoDB/Mongodb.js";
import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief COMANDO QUE DIRECIONA O CLIENTE PARA UM ATENDIMENTO HUMANO
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE ENVIOU A MENSAGEM
*/
export default async function redirect(account, phone) {
	try {
		const contact = account.bot.redirect?.numbers[0];

		if (!contact) return ;
// await mongodb.saveHumaneService(account.idPhone, phone);			// NAO TA FUNCIONANDO
		if (account.bot.redirect.numbers.length > 1) await mongodb.updateRedirect(account.idPhone);
		await send.text(account, phone, { text: { body: `Em breve um atendente vai entrar em contato com você.\nLink do contato: https://wa.me/${contact}?text=Gostaria%20de%20continuar%20o%20atendimento` } });
		if (account.bot.redirect.message) await send.text(account, phone, { text: { body: account.bot.redirect.message } });
		await send.text(account, contact, { text: { body: `Um cliente deseja atendimento humano.\nContato: ${phone}\nLink do contato: https://wa.me/${phone}` } });
		await send.text(account, contact, { text: { body: `Link do hitórico de conversa: ${process.env.URL_FRONT_END}/chat/${phone}` } });
		await mongodb.saveMetricRedirect(account.idPhone);
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "redirect": ${error}`);
	}
}