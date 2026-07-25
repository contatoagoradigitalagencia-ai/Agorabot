import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief BUSCA OS NOMES DAS PAGINAS DISPONIVEIS DENTRO DA PLANILHA
 * @param {String} spreadsheet ID DA PLANILHA
 * @return {Array<String>} RETORNA UMA ARRAY COM OS NOMES DAS PAGINAS EXISTENTES ATUALMENTE
*/
export async function getPages(account) {
	// Conta sem planilha configurada (ex.: Jarvis) — não é erro, é
	// esperado. Sem esse retorno antecipado, cairia direto no catch
	// abaixo e geraria um saveError falso a cada chamada.
	if (!account.googleSheets) return ([]);
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