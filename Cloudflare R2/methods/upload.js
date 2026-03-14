import axios from "axios";
import { PutObjectCommand } from "@aws-sdk/client-s3"

import mongodb from "../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief METODO QUE BAIXAR O ARQUIVO DA META E ENVIA PARA O CLOUDFLARE R2
*/
export async function upload(idPhone, token, url, type) {				// PAREI AKI
	try {
		const response = await axios.get(url, {
			responseType: "stream",
			headers: {
				Authorization: "Bearer " + token
			}
		})

		const command = new PutObjectCommand({
			Bucket: process.env.CLOUDFLARE_R2_BUCKET,
			Key: idPhone + "/image/a.jpg",
			Body: response.data,
			ContentType: response.headers["content-type"],
			ContentLength: Number(response.headers["content-length"])
		})

		await this.cloudflareR2.send(command);
console.log("deu certo")
		return (process.env.CLOUDFLARE_R2_URL_PUBLIC + "/" + idPhone + "/image/a.jpg");
	} catch (error) {
		await mongodb.saveError("idPhone", `Error na funcao "upload": ${error}`);
		return ("");
	}
}