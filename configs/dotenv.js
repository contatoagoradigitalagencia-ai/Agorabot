import dotenv from "dotenv";

/**
 * @author VAMPETA
 * @brief CONFIGURA O DOTENV E VERIFICA SE AS VARIAVEIS EXISTEM
*/
export default function configDotenv() {
	dotenv.config({ quiet: true });
	const variables = [
		"URL_FRONT_END",
		"VERIFY_TOKEN",
		"JWT_SECRET",
		"CHAVE_SECRETA_DO_APLICATIVO",
		"MONGO_URI",
		"GOOGLE_SHEETS_PROJECT_ID",
		"GOOGLE_SHEETS_PRIVATE_KEY",
		"GOOGLE_SHEETS_CLIENT_EMAIL",
		"GROQ_APY_KEY",
		"CLOUDFLARE_R2_ENDPOINT",
		"CLOUDFLARE_R2_ACCESS_KEY",
		"CLOUDFLARE_R2_SECRET_KEY",
		"CLOUDFLARE_R2_BUCKET",
		"CLOUDFLARE_R2_URL_PUBLIC"
	];
	for (const variable of variables) {
		if (!process.env[variable]) {
			console.log(`\x1b[33mVariável ${variable} não definida\x1b[0m`);
			process.exit(1);
		}
	}
}