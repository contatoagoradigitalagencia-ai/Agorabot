import mongodb from "../../MongoDB/Mongodb.js";
import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief COMANDO QUE DIRECIONA O CLIENTE PARA UM ATENDIMENTO HUMANO
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function redirect(account, message) {		// E SE EU INCLUIR OUTROS TIPOS DE MENSAGENS NO HISTORICO DE MENSAGENS?
	try {
		const contact = account.bot.redirect?.[0];

		if (!contact) return ;
		if (account.bot.redirect.length > 1) await mongodb.updateRedirect(account.idPhone);
		await send.text(account, message.from, { text: { body: `Em breve um atendente vai entrar em contato com você.\nLink do contato: https://wa.me/${contact}?text=Gostaria%20de%20continuar%20o%20atendimento` } });
		await send.text(account, contact, { text: { body: `Um cliente deseja atendimento humano.\nContato: ${message.from}\nLink do contato: https://wa.me/${message.from}` } });
		const history = await mongodb.Message.find({ idPhone: account.idPhone, phone: message.from, "data.type": "text" }).sort({ _id: -1 }).limit(10);
		history.reverse();
		const chat = "Histórico da conversa:\n" + history.map((msg) => (`\`${(msg.direction === "inbound") ? "Cliente" : "Bot"}:\` ${msg.data.text.body}\n\n`)).join("");
		await send.text(account, contact, { text: { body: chat } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "redirect": ${error}`);
	}
}



// /**
//  * @author VAMPETA
//  * @brief COMANDO QUE DIRECIONA O CLIENTE PARA UM ATENDIMENTO HUMANO
//  * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
//  * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
// */
// export default async function redirect(account, message) {	// TENTANDO IMPLEMENTAR SISTEMA DE VERIFICACAO DE DISPONIBILIDADE DE ATENDIMENTO E AVISO DE PROXIMO ATENDENTE
// const teste = await send.text(account, "5521000000000", { text: { body: "aaaaaaaaaaaaaaa"  } }); // A META RESPONDE COM UM WAMID MESMO PARA INTERACOES FORA DE 24HRS
// console.log(teste)
// //   {					// CASSOS EM Q O NUMERO NAO INTERAGE A MAIS DE 24HRS O WHATSAPP MANDA UMA NOTIFICACAO NO CAMPO statuses
// //     "code": 131047,
// //     "title": "Re-engagement message",
// //     "message": "Re-engagement message",
// //     "error_data": {
// //       "details": "Message failed to send because more than 24 hours have passed since the customer last replied to this number."
// //     },
// //     "href": "https://developers.facebook.com/docs/whatsapp/cloud-api/support/error-codes/"
// //   }
// 	try {
// 		const contact = account.bot.redirect?.[0];
// 		// let success = false;

// 		if (!contact) return ;
// 		if (account.bot.redirect.length > 1) {
// 			await mongodb.updateRedirect(account.idPhone);
// 			await send.text(account, account.bot.redirect[1], { text: { body: "⚠️ VOCÊ É O PRÓXIMO ATENDENTE ⚠️"  } });
// 		}
// 		for (let retry = 0; retry < account.bot.redirect.length /* && ACHAR UM ATENDENTE DISPONIVEL */; retry++) {

// 		}
// 		await send.text(account, contact, { text: { body: `Um cliente deseja atendimento humano.\nContato: ${message.from}\nLink do contato: https://wa.me/${message.from}` } });
// 		const history = await mongodb.Message.find({ idPhone: account.idPhone, phone: message.from, "data.type": "text" }).sort({ _id: -1 }).limit(10);
// 		history.reverse();
// 		const chat = "Histórico da conversa:\n" + history.map((msg) => (`\`${(msg.direction === "inbound") ? "Cliente" : "Bot"}:\` ${msg.data.text.body}\n\n`)).join("");
// 		await send.text(account, contact, { text: { body: chat } });


// 		await send.text(account, message.from, { text: { body: `Em breve um atendente vai entrar em contato com você.\nLink do contato: https://wa.me/${contact}?text=Gostaria%20de%20continuar%20o%20atendimento` } });
// 	} catch (error) {
// 		await mongodb.saveError(account.idPhone, `Error na funcao "redirect": ${error}`);
// 	}
// }