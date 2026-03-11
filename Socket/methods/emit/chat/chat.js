import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ATUALIZAR CHAT DO FRONT END QUANDO OUVER UMA MENSAGEM NOVA (SERVE PARA MENSAGEM RECEBIDA E ENVIADA)
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {Object} message OBJETO COM A MENSAGEM SALVO NO BANCO DE DADOS
*/
export async function newMessage(idPhone, message) {
	try {
		const socket = this.sockets.get(idPhone);

		if (!socket) return ;
		for (const id of socket) await this.io.to(id).emit("chat:new_message", message);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "newMessage": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ATUALIZAR O STATUS DE VISUALIZACAO DE UMA MENSAGEM
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} wamid WAMID DA MENSAGEM QUE SERA ATUALIZADA
 * @param {String} status NOVO STATUS DE VISUALIZACAO DA MENSAGEM
*/
export async function updateView(idPhone, phone, wamid, status) {
	try {
		const socket = this.sockets.get(idPhone);

		if (!socket) return ;
		for (const id of socket) await this.io.to(id).emit("chat:update_view", { phone: phone, wamid: wamid, status: status });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateView": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ATUALIZAR O FRONT END COM REACOES A MENSAGENS
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} wamid WAMID DA MENSAGEM QUE SERA ATUALIZADA
 * @param {String} react EMOJI COM A REACAO
*/
export async function newReact(idPhone, phone, wamid, react) {
	try {
		const socket = this.sockets.get(idPhone);

		if (!socket) return ;
		for (const id of socket) await this.io.to(id).emit("chat:new_react", { phone: phone, wamid: wamid, react: react });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "newReact": ${error}`);
	}
}