import { Account } from "../../../MongoDB/schema.js";

import messages from "./messages/messages.js";
import statuses from "./statuses/statuses.js";

// function messaging_product() {

// }

// function metadata() {

// }

// function contacts() {

// }

// messages MOVIDO

// statuses MOVIDO

// function errors() {

// }

/**
 * @author VAMPETA
 * @brief ENCAMINHA PARA A FUNCAO QUE TRATA CORRETAMENTE CADA CAMPO EXISTENTE
 * @param {Object} change UMA DAS POSICOES DO CAMPO req.body.entry[n].changes[n]
*/
export default async function fieldMessages(change) {
	try {
		const phoneNumberIdentification = change?.value?.metadata.phone_number_id;
		if (!phoneNumberIdentification) throw (null);
		const account = await Account.findOne({ "meta.identificacao_do_numero_de_telefone": phoneNumberIdentification }, { meta: 1, _id: 0 });

		if (!account) throw (null);
		// if (change.value.messaging_product) {}
		// if (change.value.metadata) {}
		// if (change.value.contacts) {}
		if (change.value.messages) await messages(change.value, account.meta);
		if (change.value.statuses) await statuses(change.value, account.meta);
		// if (change.value.errors) {}
	} catch (error) {
		console.log("Erro em FieldMessages");
	}
}