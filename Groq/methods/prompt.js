const rules = ``;

const commands = `
=== COMANDOS DISPONÍVEIS ===

Você pode emitir comandos SEMPRE que precisar executar uma ação externa.
Quando emitir um comando:
- Responda SOMENTE com o comando
- Não escreva texto adicional

Comandos disponíveis:

/location
- Envia o endereço para o cliente

REGRAS IMPORTANTES:
- Nunca invente comandos
- Nunca invente parâmetros
- Se nenhum comando for necessário, responda normalmente ao cliente
`;

/**
 * @author VAMPETA
 * @brief MONTA O TEXTO DO PROMPT USADO PARA INSTRUIR A IA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @return {Object} RETORNA UM OBJETO COM O PROMPT COMPLETO PARA INSTRUIR A IA
*/
export async function prompt(account) {
	try {
		const spreadsheets = await this.googleSheets.getPageJsonText(account);

		// return ({ role: "system", content: (spreadsheets) ? `${commands}${account.bot.prompt}\nAbaixo segue dados para consulta:${spreadsheets}` : `${commands}${account.bot.prompt}` });
		return ({ role: "system", content: commands + "\n" + account.bot.prompt + ((spreadsheets) ? `\nAbaixo segue dados para consulta:\n${spreadsheets}` : "") });
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Error na funcao "prompt": ${error}`);
		return ({ role: "system", content: "" });
	}
}