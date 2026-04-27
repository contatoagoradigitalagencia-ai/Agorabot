import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA APAGAR UM ARQUIVO DO CLOUDFLARE R2
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} url LINK DO ARQUIVO PUBLICO NO CLOUDFLARE R2
*/
export async function deleteFile(idPhone, url) {
	try {
		const key = url.split(`.r2.dev/${idPhone}/`)[1];

		await this.cloudflareR2.send(new DeleteObjectCommand({
			Bucket: process.env.CLOUDFLARE_R2_BUCKET,
			Key: `${idPhone}/${key}`
		}));
	} catch (error) {
		await mongodb.saveError(idPhone, `Error na funcao "deleteFile": ${error}`);
	}
}