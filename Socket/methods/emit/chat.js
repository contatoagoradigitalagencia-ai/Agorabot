import mongodb from "../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ATUALIZAR CHAT DO FRONT END QUANDO OUVER UMA MENSAGEM NOVA (SERVE PARA MENSAGEM RECEBIDA E ENVIADA)
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {Object} message OBJETO COM A MENSAGEM SALVO NO BANCO DE DADOS
*/
export async function newMessage(idPhone, phone, message) {
	try {
		const socket = this.sockets.get(idPhone + phone);

		if (!socket) return ;
		for (const id of socket) await this.io.to(id).emit("new_message", message);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "newMessage": ${error}`);
	}
}