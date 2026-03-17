import axios from "axios";
import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR AUDIO
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {Object} options OBTETO QUE PODE RECEBER context E audio (OBRIGATORIO)
 * @param {Object} [options.context] CAMPO OPICIONAL PARA INDICAR QUE ESTA MENSAGEM E UMA RESPOSTA A OUTRA (OPCIONAL)
 * @param {Object} [options.audio] AUDIO QUE SERA ENVIADA (O link E OBRIGATORIO MAS O voice NAO)
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function audio(account, phone, options = {}) {
	const { context, audio } = options;

	try {
		const data = {
			messaging_product: "whatsapp",
			to: phone,
			context: (context) ? {
				message_id: context.message_id
			} : undefined,
			type: "audio",
			audio: {
				link: audio.link,
				voice: audio.voice
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
		if (wamid) await mongodb.saveAudioSent(account.idPhone, wamid, phone, data);
		return (wamid);
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Erro na função "audio": ${error}`);
		return (null);
	}
}