import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/novo_prompt"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function new_prompt(account, message) {
	try {
		const prompt = message.text.body.split(" ").slice(1).join(" ");

		if (!prompt) {
			await send.text(account, message.from, { text: { body: "Adicione o prompt de treinamento do seu bot após o comando `/remove_adm`" } });
			return ;
		}
		await mongodb.savePrompt(account.idPhone, prompt);
		await send.text(account, message.from, { text: { body: "Prompt alterado com sucesso" } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "new_prompt": ${error}`);
	}
}