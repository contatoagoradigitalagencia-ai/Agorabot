import mongodb from "../../MongoDB/Mongodb.js";
import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief COMANDO QUE DIRECIONA O CLIENTE PARA UM ATENDIMENTO HUMANO
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE ENVIOU A MENSAGEM
*/
export async function redirect(account, phone) {
	try {
		const buttons = [
			{
				type: "reply",
				reply: {
					id: "redirect",
					title: "Sim"
				}
			},
			{
				type: "reply",
				reply: {
					id: "cancel",
					title: "Não"
				}
			}
		];
		await send.button(account, phone, { body: { text: "Gostaria de atendimento humano?" }, action: { buttons: buttons } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "redirect": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief COMANDO QUE DIRECIONA O CLIENTE PARA UM ATENDIMENTO HUMANO
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE ENVIOU A MENSAGEM
*/
export async function redirection(account, phone) {
	try {
		await mongodb.saveHumanService(account.idPhone, phone);
		if (account.bot.redirect.numbers.length > 0) {
			if (account.bot.redirect.numbers.length > 1) await mongodb.updateRedirect(account.idPhone);
			await send.text(account, phone, { text: { body: `Em breve um atendente vai entrar em contato com você.\nLink do contato: https://wa.me/${account.bot.redirect?.numbers[0]}?text=Gostaria%20de%20continuar%20o%20atendimento` } });
			await send.text(account, account.bot.redirect?.numbers[0], { text: { body: `Um cliente deseja atendimento humano.\nContato: ${phone}\nLink do contato: https://wa.me/${phone}` } });
			await send.text(account, account.bot.redirect?.numbers[0], { text: { body: `Link do hitórico de conversa: ${process.env.URL_FRONT_END}/chat/${phone}` } });
		}
		if (account.bot.redirect.message) await send.text(account, phone, { text: { body: account.bot.redirect.message } });
		await mongodb.saveMetricRedirect(account.idPhone);
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "redirection": ${error}`);
	}
}