/**
 * @author VAMPETA
 * @brief BUSCA UMA PAGINA DENTRO DE UMA PLANILHA
 * @param {String} spreadsheet ID DA PLANILHA
 * @param {String} page NOME DA PAGINA
*/
export default async function getPage(account, page) {
	try {
		const res = await this.googleSheets.spreadsheets.values.get({
			spreadsheetId: account.googleSheets.spreadsheet,
			range: page
		});
		if (!Array.isArray(res.data.values) || res.data.values.length < 2) return ([]);
		const [headers, ...data] = res.data.values;

		return (data.map((line) => {
			const obj = {};
			headers.forEach((header, i) => obj[header] = line[i] ?? "");
			return (obj);
		}));
	} catch (error) {
		await this.mongodb.saveError(((account.idPhone) ? account.idPhone : "Sem idPhone"), `Error na funcao "getPage": ${error}`);
		return ([]);
	}
}