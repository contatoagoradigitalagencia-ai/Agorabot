import mongodb from "../../MongoDB/Mongodb.js";
import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief COMANDO QUE DIRECIONA O CLIENTE PARA UM ATENDIMENTO HUMANO
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function redirect(account, message) {
	try {
		const contact = account.bot.redirect?.numbers[0];

		if (!contact) return ;
		if (account.bot.redirect.numbers.length > 1) await mongodb.updateRedirect(account.idPhone);
		await send.text(account, message.from, { text: { body: `Em breve um atendente vai entrar em contato com você.\nLink do contato: https://wa.me/${contact}?text=Gostaria%20de%20continuar%20o%20atendimento` } });
		if (account.bot.redirect.message) await send.text(account, message.from, { text: { body: account.bot.redirect.message } });
		await send.text(account, contact, { text: { body: `Um cliente deseja atendimento humano.\nContato: ${message.from}\nLink do contato: https://wa.me/${message.from}` } });
		// const history = await mongodb.Message.find({ idPhone: account.idPhone, phone: message.from, "data.type": "text" }).sort({ _id: -1 }).limit(10);
		// history.reverse();
		// const chat = "Histórico da conversa:\n" + history.map((msg) => (`\`${(msg.direction === "inbound") ? "Cliente" : "Bot"}:\` ${msg.data.text.body}\n\n`)).join("");
		// await send.text(account, contact, { text: { body: chat } });
		await send.text(account, contact, { text: { body: `Link do hitórico de conversa: ${process.env.URL_FRONT_END}/chat/${message.from}` } });
		await mongodb.saveMetricRedirect(account.idPhone);
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "redirect": ${error}`);
	}
}