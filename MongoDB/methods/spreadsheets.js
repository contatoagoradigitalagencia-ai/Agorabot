/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR NOMES DAS PAGINAS DA PLANILHA QUE ALIMENTA O BOT
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} spreadsheets NOME DA PLANILHA
*/
export async function addSpreadsheets(idPhone, spreadsheets) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$addToSet: {
					"googleSheets.pages": spreadsheets
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveSpreadsheets": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA REMOVER PAGINAS DA PLANILAS QUE ALIMENTA O BOT
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} spreadsheets NOME DA PLANILHA
*/
export async function removeSpreadsheets(idPhone, spreadsheets) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$pull: {
					"googleSheets.pages": spreadsheets
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "removeSpreadsheets": ${error}`);
	}
}