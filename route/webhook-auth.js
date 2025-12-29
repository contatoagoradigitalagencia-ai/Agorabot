/**
 * @author VAMPETA
 * @brief ROTA USADA PELA API OFICIAL PARA AUTENTICAR A MINHA API
 * @method GET
 * @route /webhook
 * @param {String} query.hub.mode TIPO DA OPERACAO
 * @param {String} query.hub.verify_token TOKEN DE VALIDACAO (CRIADO POR MIM TIPO UMA "SENHA")
 * @param {String} query.hub.challenge UM TIPO DE "SENHA" QUE DEVE SER REENVIADO COMO RESPOSTA
 * @returns 200 - AUTENTICACAO BEM SUCESSEDIDA
 * @returns 403 - TIPO DE OPERACAO INESPERADO OU TOKEN INVALIDO
*/
export default function webhookAuth(req, res) {
	const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
	const verify_token = process.env.VERIFY_TOKEN;

	if (mode === "subscribe" && token === verify_token) return (res.status(200).send(challenge));
	return (res.sendStatus(403));
}