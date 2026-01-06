import Account from "../../../MongoDB/schemas/accounts.js";
import saveError from "../../../MongoDB/error.js";

import messages from "./messages/messages.js";
import statuses from "./statuses/statuses.js";

/**
 * @author VAMPETA
 * @brief ENCAMINHA PARA A FUNCAO QUE TRATA CORRETAMENTE CADA CAMPO EXISTENTE
 * @param {Object} change UMA DAS POSICOES DO CAMPO req.body.entry[n].changes[n]
*/
export default async function fieldMessages(change) {
	const idPhone = change?.value?.metadata.phone_number_id;

	try {
		if (!idPhone) throw (null);
		const account = await Account.findOne({ "idPhone": idPhone }).select("-_id -password");

		if (!account) throw (null);
		// if (change.value.messaging_product) {}
		// if (change.value.metadata) {}
		// if (change.value.contacts) {}
		if (change.value.messages) await messages(change.value, account);
		if (change.value.statuses) await statuses(change.value, account);
		// if (change.value.errors) {}
	} catch (error) {
		await saveError(((idPhone) ? idPhone : "Sem idPhone"), `Error na funcao "fieldMessages": ${error}`);
	}
}

// change.value.messaging_product
// change.value.metadata
// change.value.contacts
// change.value.messages
// change.value.statuses
// change.value.errors