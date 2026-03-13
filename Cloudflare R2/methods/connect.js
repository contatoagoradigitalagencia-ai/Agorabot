// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { S3Client } from "@aws-sdk/client-s3"
// import axios from "axios";

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O CLOUDFLARE R2
*/
export default async function connect() {
	if (this.cloudflareR2) return ;
	this.cloudflareR2 = new S3Client({
		region: "auto",
		endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
		credentials: {
			accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
			secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY
		}
	});



// try {
// console.log("ACCESS:", process.env.CLOUDFLARE_R2_ENDPOINT)
// console.log("SECRET:", process.env.CLOUDFLARE_R2_ACCESS_KEY)
// console.log("ENDPOINT:", process.env.CLOUDFLARE_R2_SECRET_KEY)
// 	  const response = await axios.get("url do arquivo", {
// 		responseType: "stream",
// 		headers: {
// 		  Authorization: "Bearer <token>"
// 		}
// 	  })
	
// const command = new PutObjectCommand({
//   Bucket: process.env.CLOUDFLARE_R2_BUCKET,
//   Key: "image/teste.jpg",
//   Body: response.data,
//   ContentType: response.headers["content-type"],
//   ContentLength: Number(response.headers["content-length"])
// })
	
// 	console.log("aaaa")
	
// 	  await this.cloudflareR2.send(command)
	
// } catch (error) {
// 	console.log(error)
// }
}