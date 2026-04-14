/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR O NOVO ESTADO DE VISUALIZACAO SE ESTA LIGADO OU DESLIGADO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {Boolean} visualization NOVO ESTADO DE VISUALIZACAO DO BOT SE ELE ESTA LIGADO OU DESLIGADO
*/
export async function updateVisualization(idPhone, visualization) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$set: {
					"bot.visualization": visualization
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "updateVisualization": ${error}`);
	}
}