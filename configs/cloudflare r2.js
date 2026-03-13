import cloudflareR2 from "../Cloudflare R2/CloudflareR2.js";

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O CLOUDFLARE R2
*/
export default async function connectCloudflareR2() {
	try {
		await cloudflareR2.connect();
	} catch (error) {
		console.log("\x1b[33mErro ao criar credenciais do Cloudflare R2\x1b[0m\n", error);
		process.exit(1);
	}
}