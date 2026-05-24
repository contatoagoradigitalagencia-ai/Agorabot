import mongodb from "../../../../MongoDB/Mongodb.js";
import IA from "../../../../IA/IA.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR UMA SUGESTAO DE RESPOSTA AO CLIENTE
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function responseSuggestion(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone, input } = data;

    try {
		if (!phone || typeof phone !== "string") return (callback({ error: 'O campo "phone" deve ser do tipo string e não deve estar vazio' }));
		if (typeof input !== "string") return (callback({ error: 'O campo "input" deve ser do tipo string' }));
        const res = await IA.groq["llama-3.3-70b-versatile"].responseSuggestion(socket.account, phone, (input) ? input : "Ajude a criar uma resposta");

		callback(res);
    } catch (error) {
        await mongodb.saveError(idPhone, `Error no metodo "responseSuggestion": ${error}`);
    }
}