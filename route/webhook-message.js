import fieldMessages from "../receive_message/fields/messages/change.js";
import saveError from "../MongoDB/error.js";

/**
 * @author VAMPETA
 * @brief ROTA PARA INTERPRETAR OS DADOS ENVIADOS PELA API OFICIAL DA META
 * @method POST
 * @route /webhook
 * @param {Object} req.body CORPO DA REQUISICAO
 * @param {Array} req.entry DADOS RECEBIDO DO WHATSAPP
*/
export default async function webhookMessage(req, res) {
	for (const entry of req.body.entry) {
		for (const change of entry.changes) {
			if (change?.value.messaging_product !== "whatsapp") continue ;
			switch (change.field) {
				case ("messages"):
					await fieldMessages(change);
					break;

				case ("message_template_status_update"):
					break;

				case ("account_update"):
					break;

				case ("phone_number_quality_update"):
					break;

				case ("business_capability_update"):
					break;

				case ("waba_ownership_change"):
					break;

				case ("security"):
					break;

				default:
					saveError(change?.value?.metadata.phone_number_id, `Erro na função "webhookMessage": Evento desconhecido ==> ${change.field}`);
			}
		}
	}
}