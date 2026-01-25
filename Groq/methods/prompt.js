// const commands = `

// `;

/**
 * @author VAMPETA
 * @brief MONTA O TEXTO DO PROMPT USADO PARA INSTRUIR A IA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @return {Object} RETORNA UM OBJETO COM O PROMPT COMPLETO PARA INSTRUIR A IA
*/
export async function prompt(account) {
	try {
		const spreadsheets = await this.googleSheets.getPageJsonText(account);

		return ({ role: "system", content: (spreadsheets) ? `${account.bot.prompt}\nAbaixo segue dados para consulta:${spreadsheets}` : account.bot.prompt });
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Error na funcao "prompt": ${error}`);
		return ({ role: "system", content: "" });
	}
}