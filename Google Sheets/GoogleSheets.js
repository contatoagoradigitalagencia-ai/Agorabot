import { google } from "googleapis";
import { mongodb } from "../configs/mongodb.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR A CONEXAO COM O GOOGLE SHEETS
*/
export default class GoogleSheets {
	#googleSheets = null;

	constructor() {}

	/**
	 * @author VAMPETA
	 * @brief INICIA A CONEXAO COM O GOOGLE SHEETS
	*/
	async connect() {
		if (this.#googleSheets) return ;
		const auth = new google.auth.GoogleAuth({
			credentials: {
				type: "service_account",
				project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
				private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
				client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL
			},
			scopes: ["https://www.googleapis.com/auth/spreadsheets"]
		});
		this.#googleSheets = google.sheets({
			version: "v4",
			auth: await auth.getClient()
		});
	}

	/**
	 * @author VAMPETA
	 * @brief BUSCA UMA PAGINA DENTRO DE UMA PLANILHA
	 * @param {String} spreadsheet ID DA PLANILHA
	 * @param {String} page NOME DA PAGINA
	*/
	async getPage(account, page) {
		try {
			const res = await this.#googleSheets.spreadsheets.values.get({
				spreadsheetId: account.spreadsheet,
				range: page
			});
			if (!Array.isArray(res.data.values) || res.data.values.length < 2) return ([]);
			const [headers, ...data] = res.data.values;

			return (data.map((line) => {
				const obj = {};
				headers.forEach((header, i) => obj[header] = line[i] ?? "");
				return (obj);
			}));
		} catch (error) {
			await mongodb.saveError(((account.idPhone) ? account.idPhone : "Sem idPhone"), `Error na funcao "getPage": ${error}`);
			return ([]);
		}
	}

};