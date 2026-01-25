/**
 * @author VAMPETA
 * @brief BUSCA UMA PAGINA DENTRO DE UMA PLANILHA E TRANFORMA EM JSON
 * @param {String} spreadsheet ID DA PLANILHA
 * @param {String} page NOME DA PAGINA
 * @return {Array<Object>} RETORNA UM OBJETO COM O CONTEUDO DE page NO FORMATO JSON
*/
export async function getPageJson(account, page) {
	try {
		const res = await this.googleSheets.spreadsheets.values.get({
			spreadsheetId: account.googleSheets.spreadsheet,
			range: page
		});
		if (!Array.isArray(res.data.values) || res.data.values.length < 2) return ([]);
		const [headers, ...data] = res.data.values;
		const array = [];
		for (const line of data) {
			const obj = {};
			line.forEach((element, i) => (headers[i] && element) ? obj[headers[i]] = element : null);
			array.push(obj);
		}
		return (array);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Error na funcao "getPageJson": ${error}`);
		return ([]);
	}
}

/**
 * @author VAMPETA
 * @brief BUSCA UMA PAGINA DENTRO DE UMA PLANILHA E TRANFORMA EM JSON E DEPOIS CONVERTE EM TEXTO
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @return {String} RETORNA UMA STRING COM AS INFORMACOES DAS PAGINAS
*/
export async function getPageJsonText(account) {
	try {
		let text = "";
		const availablePages = await this.getPages(account);

		for (const page of account.googleSheets.pages) {
			if (!availablePages.includes(page)) continue;
			const table = await this.getPageJson(account, page);
			text += (table.length) ? `\n${JSON.stringify(table)}` : "";
		}
		return (text);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Error na funcao "getPageJsonText": ${error}`);
		return ("");
	}
}

/**
 * @author VAMPETA
 * @brief BUSCA UMA PAGINA DENTRO DE UMA PLANILHA
 * @param {String} spreadsheet ID DA PLANILHA
 * @param {String} page NOME DA PAGINA
 * @return {String} RETORNA UM OBJETO COM O CONTEUDO DE page
*/
export async function getPageTable(account, page) {
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