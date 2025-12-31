import { saveStatusSent } from "../../../../MongoDB/readMessage.js";

/**
 * @author VAMPETA
 * @brief TRATA O CASO DE req.body.entry[n].changes[n].field === "statuses" && req.body.entry[n].changes[n].value === true
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
*/
export default async function statuses(value, account) {
	for (const status of value.statuses) {
		switch (status.status) {
			case ("sent"):
// console.log(value.metadata.display_phone_number, "Mensagem entregue e aceita pela meta");
				await saveStatusSent(status.id, status.recipient_id, "sent");
				break;

			case ("delivered"):
// console.log(value.metadata.display_phone_number, "Mensagem entregue ao destinatario");
				await saveStatusSent(status.id, status.recipient_id, "delivered");
				break;

			case ("read"):
// console.log(value.metadata.display_phone_number, "Mensagem lida pelo destinatario");
				await saveStatusSent(status.id, status.recipient_id, "read");
				break;

			case ("failed"):
console.log("Mensagem ano aceita pela meta ou falhou", status.errors);
				await saveStatusSent(status.id, status.recipient_id, "failed");
				break;
		}
	}
}