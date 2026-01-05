import { google } from "googleapis";

let googleSheets = null;

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O GOOGLE SHEETS
*/
export async function connectGoogleSheets() {
	if (!process.env.GOOGLE_SHEETS_PROJECT_ID) {
		console.log("\x1b[33mVariável GOOGLE_SHEETS_PROJECT_ID não definida\x1b[0m");
		process.exit(1);
	}
	if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
		console.log("\x1b[33mVariável GOOGLE_SHEETS_PRIVATE_KEY não definida\x1b[0m");
		process.exit(1);
	}
	if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
		console.log("\x1b[33mVariável GOOGLE_SHEETS_CLIENT_EMAIL não definida\x1b[0m");
		process.exit(1);
	}
	if (googleSheets) return (googleSheets);
	const auth = new google.auth.GoogleAuth({
		credentials: {
			type: "service_account",
			project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
			private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
			client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL
		},
		scopes: ["https://www.googleapis.com/auth/spreadsheets"]
	});
	const client = await auth.getClient();
	googleSheets = google.sheets({
		version: "v4",
		auth: client
	});
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE VERIFICA SE A VARIAVEL googleSheets FOI INICIADA CORRETAMENTE
*/
export function getGoogleSheets() {
	if (!googleSheets) throw ("\x1b[33mGoogle Sheets não inicializado\x1b[0m");		// DEVO FAZER ISSO? ESTE SERVICO E ESSENCIAL?
	return (googleSheets);
}



// import Account from "../MongoDB/schemas/accounts.js";
	// const user = await Account.findOne({ idPhone: "871876402681006", phone: "5521998869425" });
	// console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    // const getRows = await googleSheets.spreadsheets.values.get({
    //     // spreadsheetId: "1sVxc7O8P0swUNFbk8UP_xw3Jv2uequWWu4JGFJVASKQ",
    //     spreadsheetId: user.spreadsheet,
    //     range: "Página1"
    // });
    // console.log(getRows.data)



// import { google } from "googleapis";

// async function getAuthSheets() {
//     try {
//         const auth = new google.auth.GoogleAuth({
//             keyFile: "teste.json",
//             scopes: "https://www.googleapis.com/auth/spreadsheets"
//         });
//         const client = await auth.getClient();
//         const googleSheets = google.sheets({
//             version: "v4",
//             auth: client
//         });
//         const spreadsheetsId = "1sVxc7O8P0swUNFbk8UP_xw3Jv2uequWWu4JGFJVASKQ";

//         console.log({ auth, client, googleSheets, spreadsheetsId })
//         return ({ auth, client, googleSheets, spreadsheetsId });
//     } catch (error) {
//         console.log("nao conectou:", error)
//     }
// }
// try {
//     const { googleSheets, auth, spreadsheetsId } = await getAuthSheets();
//     const metadata = await googleSheets.spreadsheets.get({
//         auth,
//         spreadsheetId: spreadsheetsId
//     });
//     console.log(metadata.data)

//     const getRows = await googleSheets.spreadsheets.values.get({
//         auth,
//         spreadsheetId: spreadsheetsId,
//         range: "Página1"
//     });
//     console.log(getRows.data)
// } catch (error) {
//     console.log("\n\nnao funfou:", error)
// }