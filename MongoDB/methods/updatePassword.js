/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR A NOVA SENHA DO USUARIO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} hashPassword NOVA SENHA CONVERTIDO PARA HASH
*/
export async function saveNewPassword(idPhone, hashPassword) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$set: {
					"login.password": hashPassword
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveNewPassword": ${error}`);
	}
}