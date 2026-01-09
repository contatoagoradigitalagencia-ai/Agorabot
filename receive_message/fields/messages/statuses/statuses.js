import mongodb from "../../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief TRATA O CASO DE req.body.entry[n].changes[n].field === "statuses" && req.body.entry[n].changes[n].value === true
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
*/
export default async function statuses(value, account) {
	for (const status of value.statuses) {
		try {
			if (status.status) await mongodb.saveStatusMessage(account.idPhone, status.id, status.recipient_id, status.status);	// "sent" "delivered" "read" "failed"
			if (status.errors) throw (JSON.stringify(status.errors, null, 2));
		} catch (error) {
			await mongodb.saveError(account.idPhone, `Error na funcao "statuses": ${error}`);
		}
	}
}