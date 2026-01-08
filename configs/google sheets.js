import GoogleSheets from "../Google Sheets/GoogleSheets.js";

let googleSheets = null;

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O GOOGLE SHEETS
*/
async function connectGoogleSheets() {
	try {
		if (googleSheets) return ;
		googleSheets = new GoogleSheets();
		await googleSheets.connect();
	} catch (error) {
		console.log("\x1b[33mErro ao conectar ao validar credenciais do Google Sheets\x1b[0m\n", error);
		process.exit(1);
	}
}

export { googleSheets, connectGoogleSheets };