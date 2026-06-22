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
		const account = await mongodb.Account.findOne({ idPhone: idPhone }).select("googleSheets -_id").lean();

		callback({
			code: 200,
			url: account.googleSheets.spreadsheet,
			pages: pages.map((page) => {
				return ({
					page: page,
					active: account.googleSheets.pages.includes(page)
				});
			})
		});
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "getSpreadsheets": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}

/**
 * @author VAMPETA
 * @brief ADICIONA OU REMOVE PAGINAS DA PLANILHA PARA CONSULTA DO GOOGLESHEETS
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
// export async function updateUsedSpreadsheets(socket, data, callback) {
// 	const { idPhone } = socket.account;
// 	const { add, remove } = data || {};

// 	try {
// 		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
// 		if ((add && remove) || (!add && !remove)) return (callback({ error: "Deve haver uma ação de adicionar ou remover planilha" }));
// 		if ((add && typeof add !== "string") || (remove && typeof remove !== "string")) return (callback({ error: 'O campo "add" ou "remove" deve ser do tipo string' }));
// 		if (add) await mongodb.addSpreadsheets(idPhone, add);
// 		if (remove) await mongodb.removeSpreadsheets(idPhone, remove);
// 		callback({ code: 204 });
// 	} catch (error) {
// 		await mongodb.saveError(idPhone, `Error no metodo "updateUsedSpreadsheets": ${error}`);
// 		callback({ code: 500, error: "Erro interno do servidor" });
// 	}
// }
export async function updateUsedSpreadsheets(socket, data, callback) {
	const { idPhone } = socket.account;
	const { spreadsheets } = data || {};

console.log(spreadsheets)
	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
		if (!Array.isArray(spreadsheets) || !spreadsheets.every((item) => (typeof item === "string"))) return (callback({ code: 400, error: 'O campo "spreadsheets" deve ser um array de strings'}));
		await mongodb.newSpreadsheets(idPhone, spreadsheets);
		callback({ code: 204 });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updateUsedSpreadsheets": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}