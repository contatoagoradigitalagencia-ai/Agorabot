import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/redirecionamento"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function redirect(account, message) {
	try {
		await send.text(account, message.from, { text: { body: `Atuais atendentes:${account.bot.redirect.map((contact) => (`\n\`${contact}\``)).join("")}` } });
		if (account.bot.redirect.length > 1 && account.bot.redirect[0] === message.from) {
			await send.text(account, message.from, { text: { body: "⚠️ VOCÊ É O PRÓXIMO ATENDENTE ⚠️" } });
		} else if (account.bot.redirect.length > 1) {
			await send.text(account, message.from, { text: { body: `Próximo atendente: ${account.bot.redirect[0]}` } });
		}
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "redirect": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/adicionar_redirecionamento"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function add_redirect(account, message) {
	try {
		const contact = message.text.body.split(" ").slice(1).join(" ");

		if (!contact) {
			await send.text(account, message.from, { text: { body: "Adicione o número de Whatsapp que deseje que entre na lista de atendentes após o comando `/adicionar_redirecionamento`" } });
			return ;
		}
		await mongodb.saveRedirect(account.idPhone, contact);
		await send.text(account, message.from, { text: { body: "Atendente adicionado com sucesso" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "add_redirect": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/remover_redirecionamento"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function remove_redirect(account, message) {
	try {
		const contact = message.text.body.split(" ").slice(1).join(" ");

		if (!contact) {
			await send.text(account, message.from, { text: { body: "Informe o número de Whatsapp que deseja remover da lista de redirecionamento após o comando `/remover_redirecionamento`" } });
			return ;
		}
		await mongodb.removeRedirect(account.idPhone, contact);
		await send.text(account, message.from, { text: { body: "Atendente removido com sucesso" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "remove_redirect": ${error}`);
	}
}