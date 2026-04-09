import mongodb from "../../../../MongoDB/Mongodb.js";
import IA from "../../../../IA/IA.js";

/**
 * @author VAMPETA
 * @brief CONSULTA AS INFORMACOES GERAIS SOBRE O BOT (INCLUI PROMPT ESTADO DE ATIVACAO DO BOT E MENSAGENS PRE DEFINIDAS COMO ERRO OU MENSAGEM NAO SUPORTADA)
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function getInfoBot(socket, data, callback) {
	const { idPhone } = socket.account;

	try {
		const account = await mongodb.Account.findOne({ idPhone: idPhone }).select("bot -_id");

setTimeout(() => {
		callback({
			activated: account.bot.activated,
			prompt: account.bot.prompt
		});
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getInfoBot": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief MUDA O STATUS DO BOT DE ATIVADO PARA DESATIVADO E VICE VERSA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateStatusBot(socket, data, callback) {
	const { idPhone } = socket.account;
	const { status } = data;

	try {
		if (typeof status !== "boolean") return (callback({ error: 'Deve existir um campo "status" do tipo boolean' }));
		await mongodb.updateStateBot(idPhone, status);
setTimeout(() => {
		callback({ status: status });
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateStatusBot": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief MUDA O STATUS DO BOT DE ATIVADO PARA DESATIVADO E VICE VERSA
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updatePrompt(socket, data, callback) {
	const { idPhone } = socket.account;
	const { prompt } = data;

	try {
		if (typeof prompt !== "string") return (callback({ error: 'O campo "prompt" deve ser do tipo string' }));
		await mongodb.savePrompt(idPhone, prompt);
setTimeout(() => {
		callback(204);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updatePrompt": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief USAR IA PARA SUGERIR MELHORIA NO ATUAL PROMPT
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function promptSuggestion(socket, data, callback) {
	const { idPhone } = socket.account;

	try {
const res = await IA.groq.groq.chat.completions.create({
	model: "moonshotai/kimi-k2-instruct",
	messages: [
		{
			role: "user",
			content: "oi",
		},
	],
});
// console.log(res)
console.log(res.choices[0].message.content)



setTimeout(() => {
		callback("teste");
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updatePrompt": ${error}`);
	}
}