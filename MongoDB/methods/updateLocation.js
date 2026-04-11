/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR A MENSAGEM DE LOCALIZACAO PADRAO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} name TITULO DA MENSAGEM
 * @param {String} address ENDERECO EM FORMA DE TEXTO
 * @param {Number} latitude LATITUDE DO ENDERECO
 * @param {Number} longitude LONGITUDE DO ENDERECO
*/
export async function saveLocation(idPhone, name, address, latitude, longitude) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$set: {
					"bot.location.name": name,
					"bot.location.address": address,
					"bot.location.latitude": latitude,
					"bot.location.longitude": longitude
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveLocation": ${error}`);
	}
}