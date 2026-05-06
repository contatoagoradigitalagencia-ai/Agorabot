import axios from "axios";

import CloudflareR2 from "../../../../Cloudflare R2/CloudflareR2.js";
import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief TRANSCREVE O AUDIO PARA TEXTO DE ARQUIVOS VINDO DA META
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} url URL HOSPEDADO NA META COM O ARQUIVO A SER BAIXADO
 * @param {String} token TOKEN DE ACESSO USADO PARA BAIXAR O AUDIO NA META
*/
export async function transcribeFileMeta(idPhone, url, token) {
	try {
		const res = await axios({
			method: "GET",
			url: url,
			responseType: "arraybuffer",
			headers: {
				Authorization: "Bearer " + token
			}
		});
		if (res.status !== 200) return ("");
		const transcription = await this.groq.groq.audio.transcriptions.create({
			file: new File([res.data], "audio.ogg"),
			model: "whisper-large-v3-turbo",
		});

		return (transcription.text);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error na funcao "transcribeFileMeta": ${error}`);
		return ("");
	}
}

/**
 * @author VAMPETA
 * @brief TRANSCREVE O AUDIO PARA TEXTO DE ARQUIVOS VINDO DO CLOUDFLARE R2
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} url URL HOSPEDADO NA META COM O ARQUIVO A SER BAIXADO
*/
export async function transcribeFileCloudflare(idPhone, url) {
	try {
		const res = await axios({
			method: "GET",
			url: url,
			responseType: "arraybuffer"
		});
		if (res.status !== 200) return ("");
		const transcription = await this.groq.groq.audio.transcriptions.create({
			file: new File([res.data], "audio.mp3"),
			model: "whisper-large-v3-turbo",
		});

		return (transcription.text);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error na funcao "transcribeFileCloudflare": ${error}`);
		return ("");
	}
}