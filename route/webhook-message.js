import mongodb from "../MongoDB/Mongodb.js";
import whatsapp_business_account from "../whatsapp/whatsapp_business_account.js";

/**
 * @author VAMPETA
 * @brief ROTA PARA INTERPRETAR OS DADOS ENVIADOS PELA API OFICIAL DA META
 * @method POST
 * @route /webhook
 * @param {Object} req.body CORPO DA REQUISICAO
 * @param {Array} req.entry DADOS RECEBIDO DO WHATSAPP
*/
export default async function webhookMessage(req, res) {
	try {
		if (req.body.object !== "whatsapp_business_account" || !Array.isArray(req.body?.entry)) return ;
		await whatsapp_business_account(req.body.entry);
	} catch (error) {
		await mongodb.saveError("Sem idPhone", `Error na funcao "webhookMessage": ${error}`);
	}
}