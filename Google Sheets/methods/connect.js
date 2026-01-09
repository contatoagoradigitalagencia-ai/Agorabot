import { google } from "googleapis";

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM O GOOGLE SHEETS
*/
export default async function connect() {
	if (this.googleSheets) return;
	const auth = new google.auth.GoogleAuth({
		credentials: {
			type: "service_account",
			project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
			private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
			client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL
		},
		scopes: ["https://www.googleapis.com/auth/spreadsheets"]
	});
	this.googleSheets = google.sheets({
		version: "v4",
		auth: await auth.getClient()
	});
}