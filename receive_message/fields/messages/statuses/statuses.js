import { saveStatusMessage } from "../../../../MongoDB/statusMessage.js";

/**
 * @author VAMPETA
 * @brief TRATA O CASO DE req.body.entry[n].changes[n].field === "statuses" && req.body.entry[n].changes[n].value === true
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
*/
export default async function statuses(value, account) {
	for (const status of value.statuses) {
		if (status.status === "sent" || status.status === "delivered" || status.status === "read" || status.status === "failed") {
			await saveStatusMessage(account.idPhone, status.id, status.recipient_id, status.status);
		}
	}
}