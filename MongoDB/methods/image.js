/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGENS DE IMAGENS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE QUE RECEBEU A MENSAGEM
 * @param link URL DA IMAGEM ENVIADA
 * @param message MENSAGEM ENVIADA JUNTO COM A IMAGEM
*/
export async function saveImageSent(idPhone, wamid, phone, link, message) {
	try {
		if (!(await this.Chat.findOne({ idPhone: idPhone, phone: phone }))) {
			await this.Chat.create({
				idPhone: idPhone,
				phone: phone,
				lastMessage: {
					text: message,
					type: "image",
					image: true
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
							text: message,
							type: "image"
						}
					}
				}
			);
		}
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveImageSent": ${error}`);
	}
	try {
		await this.Message.create({
			idPhone: idPhone,
			phone: phone,
			wamid: wamid,
			direction: "outbound",
			status: "sent",
			type: "image",
			image: {
				link: link,
				caption: message
			}
		});
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveImageSent": ${error}`);
	}
}