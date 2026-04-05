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
		const account = await mongodb.Account.findOne({ idPhone: idPhone }).select("googleSheets.pages -_id");

setTimeout(() => {
		callback(pages.map((page) => {
			return ({
				page: page,
				selected: account.googleSheets.pages.includes(page)
			});
		}));
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "infoDashboard": ${error}`);
	}
}