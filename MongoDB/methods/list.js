/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE LISTA NO MONGODB
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} wamid ID DA MENSAGEM ENVIADA
 * @param {String} phone NUMERO QUE RECEBEU A MENSAGEM
 * @param {String} text TEXTO/TITULO MOSTRADO AO USUARIO
 * @param {String} button TEXTO DO BOTAO CLICAVEL DA LISTA
 * @param {Array} list ARRAY COM ITENS DA LISTA
*/
export async function saveListSent(idPhone, wamid, phone, text, button, list) {
	try {
		await this.Chat.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					lastMessage: {
						text,
						type: "list",
						status: "sending"
					}
				},
				$setOnInsert: {
					idPhone: idPhone,
					phone: phone
				}
			},
			{ upsert: true }
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveListSent": ${error}`);
	}
	try {
		await this.Message.create({
			idPhone: idPhone,
			phone: phone,
			wamid: wamid,
			direction: "inbound",
			type: "list",
			list: {
				text: text,
				button: button,
				list: list
			}
		});
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveListSent": ${error}`);
	}
}