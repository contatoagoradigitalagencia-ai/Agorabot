import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief BUSCA OS NOMES DAS PAGINAS DISPONIVEIS DENTRO DA PLANILHA
 * @param {String} spreadsheet ID DA PLANILHA
 * @return {Array<String>} RETORNA UMA ARRAY COM OS NOMES DAS PAGINAS EXISTENTES ATUALMENTE
*/
export async function getPages(account) {
	try {
		const res = await this.googleSheets.spreadsheets.get({
			spreadsheetId: account.googleSheets.spreadsheet,
			fields: "sheets(properties(title))"
		});

		return (res.data.sheets.map((sheet) => (sheet.properties.title)));
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "getPages": ${error}`);
		return ([]);
	}
}