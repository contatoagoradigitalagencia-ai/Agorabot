/**
 * @author VAMPETA
 * @brief BUSCA UMA PAGINA DENTRO DE UMA PLANILHA
 * @param {String} spreadsheet ID DA PLANILHA
 * @param {String} page NOME DA PAGINA
 * @return {String} RETORNA UM OBJETO COM O CONTEUDO DE page
*/
export default async function getPageTable(account, page) {
	try {
		const res = await this.googleSheets.spreadsheets.values.get({
			spreadsheetId: account.googleSheets.spreadsheet,
			range: page
		});
		if (!Array.isArray(res.data.values) || res.data.values.length < 2) return ("");
		const [headers, ...data] = res.data.values;
		let text = "";
		for (const line of data) {
			line.forEach((element, i) => text += (headers[i] && element) ? `${headers[i]}: ${element}\n` : "");
			text += "\n";
		}
		return (text);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Error na funcao "getPageTable": ${error}`);
		return ("");
	}
}