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
			try {
				if (change?.value.messaging_product !== "whatsapp") continue ;
				switch (change.field) {
					case ("messages"):
						await fieldMessages(change);
						break;

					default:
						throw (`Evento não suportado ==> ${change.field}`);
				}
			} catch (error) {
				const idPhone = change?.value?.metadata.phone_number_id;
				await saveError(((idPhone) ? idPhone : "Sem idPhone"), `Error na funcao "webhookMessage": ${error}`);
			}
		}
	}
}

// messages
// message_template_status_update
// account_update
// phone_number_quality_update
// business_capability_update
// waba_ownership_change
// security