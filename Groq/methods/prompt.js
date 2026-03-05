import mongodb from "../../MongoDB/Mongodb.js";
import googleSheets from "../../Google Sheets/GoogleSheets.js";

const schema = `
RESPONDA SEMPRE E APENAS em JSON válido no formato:
{
  "command": [String],
  "text": [String]
}
`;

const rules = `
Regras de formato:
- "command" e "text" devem sempre existir e ser arrays (podem estar vazios).
- Nunca escreva nada fora do JSON.
- Cada item do array representa uma ação/mensagem independente.
- "text": apenas mensagens ao cliente, em linguagem curta e natural.
- "command": apenas ações externas. Nunca descreva comandos em "text".
- Só use "command" quando realmente necessário. Caso contrário, use [].
`;

const commands = `
Comandos disponíveis:
`;

const location = `
- /location → usar somente se o cliente pedir endereço, localização, como chegar ou ponto de referência.
`;

const redirect = `
- /redirect → usar somente se:
  • a solicitação estiver fora do escopo,
  • a informação não existir nos dados fornecidos,
  • houver risco ou decisão sensível.
`;

const dataRules = `
Regras de dados:
- Use APENAS as informações fornecidas em "Dados disponíveis".
- Nunca invente, estime ou complete informações ausentes.
- Se a informação não existir nos dados, diga claramente que não consta.
`;

const ambiguityAndSecurity = `
Ambiguidade e segurança:
- Em caso de dúvida, peça esclarecimento e não execute comandos.
- Não forneça aconselhamento profissional nem execute ações sensíveis sem confirmação.
`;

const fallback = `
Encerramento e fallback:
- Se o atendimento estiver concluído, finalize de forma educada.
- Se não puder ajudar, ofereça encaminhar para um atendente humano.
`;

const identity = `
Identidade e regras específicas deste atendimento:
`;

const data = `
Dados disponíveis:
`;

/**
 * @author VAMPETA
 * @brief MONTA O TEXTO DO PROMPT USADO PARA INSTRUIR A IA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @return {Object} RETORNA UM OBJETO COM O PROMPT COMPLETO PARA INSTRUIR A IA
*/
export async function prompt(account) {
	try {
		let textPrompt = "";
		// const spreadsheets = await this.googleSheets.getPageJsonText(account);	// BUG RELACIONADO A NAO TER PLANNILHA // DEVO TRATAR AKI?
		const spreadsheets = (account.googleSheets) ? await googleSheets.getPageJsonText(account) : undefined;

		textPrompt += schema;
		textPrompt += rules;
		textPrompt += commands;
		if (account.bot.location) textPrompt += location;
		if (account.bot.redirect) textPrompt += redirect;
		if (!account.bot.location && !account.bot.redirect) textPrompt += "Nenhum comando está disponível no momento."
		textPrompt += dataRules;
		textPrompt += ambiguityAndSecurity;
		textPrompt += fallback;
		textPrompt += `${identity}${account.bot.prompt}\n`;
		if (spreadsheets) textPrompt += `${data}${spreadsheets}`;
// console.log(textPrompt)
		return ({
			role: "system",
			content: textPrompt
		});
	} catch (error) {
		// await this.mongodb.saveError(account.idPhone, `Error na funcao "prompt": ${error}`);
		await mongodb.saveError(account.idPhone, `Error na funcao "prompt": ${error}`);
		return ({ role: "system", content: "" });
	}
}