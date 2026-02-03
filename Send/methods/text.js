import axios from "axios";

import sockets from "../../websocket/sockets.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR MENSAGENS SIMPLES
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {Object} options OBTETO QUE PODE RECEBER context E text (OBRIGATORIO)
 * @param {Object} [options.context] CAMPO OPICIONAL PARA INDICAR QUE ESTA MENSAGEM E UMA RESPOSTA A OUTRA (OPCIONAL)
 * @param {Object} [options.body] MENSAGEM QUE SERA ENVIADA (OBRIGATORIO)
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function text(account, phone, options = {}) {
	const { context, text } = options;

	try {
		const data = {
			messaging_product: "whatsapp",
			to: phone,
			context: (context) ? {
				message_id: context.message_id
			} : undefined,
			type: "text",
			text: {
				body: text.body,
				// preview_url: false	// REVISAR ESSE ASSUNTO DPS
			}
		};
		const res = await axios({
			method: "POST",
			url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
			headers: {
				Authorization: "Bearer " + account.accessToken
			},
			data: data
		});

		if (res.status !== 200) throw (`O axios retornou status ${res.status} ==> ${JSON.stringify(res.data, null, 2)}`);
		const wamid = res.data?.messages?.[0]?.id;
		if (!wamid) throw ("Wamid não retornado pela API da Meta");
		delete data.messaging_product;
		delete data.to;
		await this.mongodb.saveTextSent(account.idPhone, wamid, phone, data);



// console.log(sockets)
// console.log(account.idPhone + phone)
// const socket = sockets.get(account.idPhone + phone);
// console.log(socket)
for (const [key, socketSet] of sockets.entries()) {		// EU DEVERIA POR ISSO AKI OU NO MONGODB? PQ EU AKI SO CONSIGO ATUALIZAR MENSAGENS ENVIADAS E NAO REAPROVEITO DATA
	for (const id of socketSet) {
// console.log(id)
		// await this.io.to(id).emit("teste", "kkkkkkkkkkkkkkkkkkkkkkkkkkk");
		const message = {
			idPhone: account.idPhone,
			phone: phone,
			wamid: wamid,
			direction: "outbound",
			status: "sending",
			data: data
		}
		await this.io.to(id).emit("updateMessages", message);
	}
}
// console.log(this.io)


		return (wamid);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Erro na função "text": ${error}`);
		return (null);
	}
}