import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO QUE ATUALIZA O ESTADO DE VISUALIZADO POR UM HUMANO NO BANCO DE DADOS
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateHumanViewed(socket, data, callback) {
	const { idPhone } = socket.account;
	const { phone } = data;

	try {
		if (!phone) return ;
		await mongodb.saveHumanView(idPhone, phone);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateHumanViewed": ${error}`);
	}
}