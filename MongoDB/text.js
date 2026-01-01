import { Chat, Message } from "./schema.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA SALVAR MENSAGENS DE TEXTO RECEBIDAS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param message MENSAGEM QUE SERA ENVIADA
*/
export async function saveTextReceived(idPhone, wamid, phone, message) {
    try {
        if (!(await Chat.findOne({ phone: phone }))) {
            await Chat.create({
				idPhone: idPhone,
                phone: phone,
                lastMessage: {
                    text: message
                }
            });
        } else {
            await Chat.updateOne(
                {
                    phone: phone
                },
                {
                    $set: {
                        lastMessage: {
                            text: message
                        }
                    }
                }
            );
        }
    } catch (error) {
console.log("chat nao atualizado no mongodb (recebida)");
    }

    try {
	await Message.create({
		idPhone: idPhone,
		phone: phone,
		wamid: wamid,
		type: "text",
		text: message,
		direction: "inbound"
	});
    } catch (error) {
console.log("mensagem nao salva no mongodb (recebida)");
    }
}

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA SALVAR MENSAGENS DE TEXTO ENVIADAS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param wamid ID DA MENSAGEM ENVIADA
 * @param phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param message MENSAGEM QUE SERA ENVIADA
*/
export async function saveTextSent(idPhone, wamid, phone, message) {
	try {
		await Chat.updateOne(
			{
				phone: phone
			},
			{
				$set: {
					lastMessage: {
						text: message,
						status: "sent"
					}
				}
			}
		);
	} catch (error) {
console.log("chat nao atualizado no mongodb (enviada)");
	}
	try {
		await Message.create({
			idPhone: idPhone,
			phone: phone,
			wamid: wamid,
			direction: "outbound",
			status: "sent",
			type: "text",
			text: message
		});
	} catch (error) {
console.log("mensagem nao salva no mongodb (enviada)");
	}
}