import { S3Client } from "@aws-sdk/client-s3"

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
}