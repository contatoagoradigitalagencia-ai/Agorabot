import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief CONSULTA AS INFORMACOES GERAIS QUE SERA EXIBIDA NA ROTA /support
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function getInfoSupport(socket, data, callback) {
	const { idPhone } = socket.account;

	try {
		const countContact = await mongodb.Contact.countDocuments({ idPhone: idPhone });
		const pages = await mongodb.Account.findOne({ idPhone }, { "googleSheets.pages": 1 }).lean();

		callback({
			countContact: countContact,
			countSpreadsheet: pages?.googleSheets?.pages?.length || 0,
			system: true
		});
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getInfoSupport": ${error}`);
	}
}