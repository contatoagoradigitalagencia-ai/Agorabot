/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR NOVOS ADM QUE CONTROLAM O BOT
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE SERA ADICIONADO A LISTA DE ADM
*/
export async function saveAdm(idPhone, phone) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$addToSet: {
					"adm": phone
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveAdm": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA REMOVER ADM QUE CONTROLA O BOT
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE SERA ADICIONADO A LISTA DE ADM
*/
export async function removeAdm(idPhone, phone) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$pull: {
					"adm": phone
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "removeAdm": ${error}`);
	}
}