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
		if (!(await this.Chat.findOne({ idPhone: idPhone, phone: phone }))) {
			await this.Chat.create({
				idPhone: idPhone,
				phone: phone,
				lastMessage: {
					text: text,
					type: "text",
					status: "sending"
				}
			});
		} else {
			await this.Chat.updateOne(
				{
					idPhone: idPhone,
					phone: phone
				},
				{
					$set: {
						lastMessage: {
							text: text,
							type: "text",
							status: "sent"
						}
					}
				}
			);
		}
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