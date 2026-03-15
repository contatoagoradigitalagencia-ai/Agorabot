import axios from "axios";
import { PutObjectCommand } from "@aws-sdk/client-s3"

import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief FUNCAO QUE DETERMINA QUAL DEVE SER A EXTENSAO DO ARQUIVO
 * @param {String} contentType TIPO DO ARQUIVO INFORMADO NO CABECALHO DA REQUISICAO
*/
function getExtension(contentType) {
	const map = {
		"image/jpeg": "jpg",
		"image/png": "png",
		"image/webp": "webp",
		"image/gif": "gif",
		"audio/ogg": "ogg",
		"audio/mpeg": "mp3",
		"video/mp4": "mp4",
		"application/pdf": "pdf"
	}

	return (map[contentType] || "bin");
}

/**
 * @author VAMPETA
 * @brief METODO QUE BAIXAR O ARQUIVO DA META E ENVIA PARA O CLOUDFLARE R2
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} token TOKEN DE ACESSO USADO PARA BAIXAR A IMAGEM NA META
 * @param {String} from NUMERO QUE ESTA CONVERSANDO COM O BOT
 * @param {String} wamid ID DA MENSAGEM Q A META ENVIA
 * @param {String} url URL DE DOWNLOAD QUE A META DISPONIBILIZA
 * @param {String} type TIPO DE ARQUIVO
*/
export async function upload(idPhone, token, from, wamid, url, type) {
	try {
		const response = await axios.get(url, {
			responseType: "stream",
			headers: {
				Authorization: "Bearer " + token
			}
		})
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const fileName = wamid.replace("wamid.", "");
		const extension = getExtension(response.headers["content-type"]);
		const path = `${idPhone}/${from}/${type}/${year}/${month}/${fileName}.${extension}`;
		const command = new PutObjectCommand({
			Bucket: process.env.CLOUDFLARE_R2_BUCKET,
			Key: path,
			Body: response.data,
			ContentType: response.headers["content-type"],
			ContentLength: Number(response.headers["content-length"])
		})

		await this.cloudflareR2.send(command);
		return (process.env.CLOUDFLARE_R2_URL_PUBLIC + "/" + path);
	} catch (error) {
		await mongodb.saveError("idPhone", `Error na funcao "upload": ${error}`);
		return ("");
	}
}