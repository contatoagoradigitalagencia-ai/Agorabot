// import { GoogleSpreadsheet } from "google-spreadsheet";

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O GOOGLE SHEETS
*/
export default async function connectGoogleSheets() {
	try {
		// SEM VALIDADOR POR ENQUANTO
		// TALVEZ EU USE UMA PLANILHA PADRAO QUE SALVE ALGUMAS METRICAS GERAIS OU ALGO DO TIPO (NAO SERA USADO EXCLUSIVAMENTE POR 1 NUMERO DE WHATSAPP)
	} catch (error) {
		console.log("\x1b[33mErro ao conectar ao validar credenciais do Google Sheets\x1b[0m\n", error);
		process.exit(1);
	}
}



// import { google } from "googleapis";

// let googleSheets = null;

// /**
//  * @author VAMPETA
//  * @brief INICIA A CONEXAO COM O GOOGLE SHEETS
// */
// export async function connectGoogleSheets() {
// 	if (googleSheets) return (googleSheets);
// 	const auth = new google.auth.GoogleAuth({
// 		credentials: {
// 			type: "service_account",
// 			project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
// 			private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
// 			client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL
// 		},
// 		scopes: ["https://www.googleapis.com/auth/spreadsheets"]
// 	});
// 	const client = await auth.getClient();
// 	googleSheets = google.sheets({
// 		version: "v4",
// 		auth: client
// 	});
// }

// /**
//  * @author VAMPETA
//  * @brief FUNCAO QUE VERIFICA SE A VARIAVEL googleSheets FOI INICIADA CORRETAMENTE
// */
// export function getGoogleSheets() {
// 	if (!googleSheets) throw ("\x1b[33mGoogle Sheets não inicializado\x1b[0m");		// DEVO FAZER ISSO? ESTE SERVICO E ESSENCIAL?
// 	return (googleSheets);
// }