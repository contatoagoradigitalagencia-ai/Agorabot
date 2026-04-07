import googleSheets from "../../../../Google Sheets/GoogleSheets.js";
import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief CONSULTA O GOOGLESHEETS PARA LISTAR TODAS AS PLANILHAS E O BANCO DE DADOS NO MONGODB PARA COMPARAR QUAIS PLANILHAS EXISTEM E QUAIS ESTAO SENDO USADAS
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
		await mongodb.saveError(idPhone, `Error no metodo "getSpreadsheets": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief ADICIONA OU REMOVE PAGINAS DA PLANILHA PARA CONSULTA DO GOOGLESHEETS
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updateUsedSpreadsheets(socket, data, callback) {
	const { idPhone } = socket.account;
	const { add, remove } = data;

	try {
		if (!add && !remove) return (callback("Deve haver uma ação de adicionar ou remover planilha"));
		if (add && remove) return (callback("Deve haver uma ação de adicionar ou remover planilha"));
		if (add) await mongodb.addSpreadsheets(idPhone, add);
		if (remove) await mongodb.removeSpreadsheets(idPhone, remove);
setTimeout(() => {
		callback(200);
}, 1000);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateUsedSpreadsheets": ${error}`);
	}
}