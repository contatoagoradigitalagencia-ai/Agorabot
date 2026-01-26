/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR O WAMID DA MENSAGEM E EVITAR DUPLICIDADE EM CASO DE REENVIO DA MENSAGEM PELA META
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
 * @return {Boolean} RETORNA TRUE SE SALVOU O WAMID COM SUCESSO, OU FALSE CASO TENHA DADO ERRO 11000 (DUPLICIDADE)
*/
export async function saveWamid(idPhone, message) {
	const { id, from, type } = message;

	try {
		if (type === "reaction") return (true);
		await this.Message.create({
			idPhone: idPhone,
			phone: from,
			wamid: id,
			direction: "inbound"
		});
		return (true);
	} catch (error) {
		if (error.code === 11000) return (false);
		await this.saveError(idPhone, `Error no metodo "saveWamid": ${error}`);
		return (true);
	}
}