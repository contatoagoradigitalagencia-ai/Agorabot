import mongodb from "../MongoDB/Mongodb.js";
import fieldMessages from "./messages/change.js"

/**
 * @author VAMPETA
 * @brief ROTA PARA INTERPRETAR OS DADOS ENVIADOS PELA API OFICIAL DA META
 * @param {Array} entries ARRAY DE EVENTOS DO WHATSAPP BUSSINES ACCOUNT (CADA ELEMENTO DO ARRAY E UMA WABA DIFERENTE)
*/
export default async function whatsapp_business_account(entries) {
	try {
		for (const entry of entries) {
			if (!Array.isArray(entry?.changes)) continue;
			for (const change of entry.changes) {
				try {
					if (change?.value.messaging_product !== "whatsapp") continue;
					switch (change.field) {
						case ("messages"):
							await fieldMessages(change);
							break;

						default:
							throw (`Evento não suportado ==> ${change.field}`);
					}
				} catch (error) {
					const idPhone = change?.value?.metadata.phone_number_id;
					await mongodb.saveError(((idPhone) ? idPhone : "Sem idPhone"), `Error na funcao "whatsapp_business_account": ${error}`);
				}
			}
		}
	} catch (error) {
		await mongodb.saveError("Sem idPhone", `Error na funcao "whatsapp_business_account": ${error}`);
	}
}

// messages
// message_template_status_update
// account_update
// phone_number_quality_update
// business_capability_update
// waba_ownership_change
// security