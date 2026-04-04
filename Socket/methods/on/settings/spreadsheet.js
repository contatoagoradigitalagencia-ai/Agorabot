import googleSheets from "../../../../Google Sheets/GoogleSheets.js";
import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief 
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function getSpreadsheets(socket, data, callback) {
	const { idPhone } = socket.account;

	try {
		const pages = await googleSheets.getPages(socket.account);

console.log(pages)
setTimeout(() => {
		callback(pages);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "infoDashboard": ${error}`);
	}
}