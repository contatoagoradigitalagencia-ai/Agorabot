import axios from "axios";

import CloudflareR2 from "../../../../Cloudflare R2/CloudflareR2.js";
import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief TRANSCREVE O AUDIO PARA TEXTO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} url URL HOSPEDADO NA META COM O ARQUIVO A SER BAIXADO
 * @param {String} token TOKEN DE ACESSO USADO PARA BAIXAR O AUDIO NA META
*/
export async function transcribeFileMeta(idPhone, url, token) {
	try {
		// 		const res = await axios({
		// 			method: "GET",
		// 			url: url,
		// 			responseType: "stream",
		// 			headers: {
		// 				Authorization: "Bearer " + token
		// 			}
		// 		});
		// const transcription = await this.groq.groq.audio.transcriptions.create({
		// 	file: res.data,
		// 	model: "whisper-large-v3-turbo",
		// });

		// console.log(transcription.text);



		const res = await axios({
			method: "GET",
			url: url,
			responseType: "arraybuffer",
			headers: {
				Authorization: "Bearer " + token
			}
		});

		const file = new File([res.data], "audio.ogg");

		const transcription = await this.groq.groq.audio.transcriptions.create({
			file: file,
			model: "whisper-large-v3-turbo",
		});

		console.log(transcription.text);

		return ("text");
	} catch (error) {
		await mongodb.saveError(idPhone, `Error na funcao "transcribeFileMeta": ${error}`);
		return ("");
	}
}