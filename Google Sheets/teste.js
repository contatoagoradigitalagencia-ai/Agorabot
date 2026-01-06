// import { getGoogleSheets } from "../configs/google sheets.js";

// export default async function teste(account, message) {
// 	const googleSheets = getGoogleSheets();
//     const getRows = await googleSheets.spreadsheets.values.get({
//         spreadsheetId: account.spreadsheet,
//         range: "Página1"
//     });
//     // console.log(getRows.data)
// 	// let test = "";
// 	// for (const y of getRows.data.values) {
// 	// 	for (const x of y) {
// 	// 		test += x + " --- ";
// 	// 	}
// 	// 	test += "\n";
// 	// }
// 	// return (test);

// 	for (const line of getRows.data.values) {
// 		if (message === line[0]) {
// 			return ({
// 				link: line[1],
// 				caption: `Anime: ${line[2]}`
// 			});
// 		}
// 	}
// 	return ("Personagem não encontrado");
// }



import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// const doc = new GoogleSpreadsheet(account.spreadsheet);
// await doc.useServiceAccountAuth({
// 	client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
// 	private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
// });
export default async function teste(account) {
	const auth = new JWT({
		email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
		key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
		scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
	});
	const doc = new GoogleSpreadsheet(
		account.spreadsheet,
		auth
	);

	await doc.loadInfo();
	return (doc);
}