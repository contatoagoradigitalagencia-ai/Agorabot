import googleSheets from "../Google Sheets/GoogleSheets.js";

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O GOOGLE SHEETS
*/
export default async function connectGoogleSheets() {
	try {
		await googleSheets.connect();
	} catch (error) {
		console.log("\x1b[33mErro ao conectar e validar credenciais do Google Sheets\x1b[0m\n", error);
		process.exit(1);
	}
}