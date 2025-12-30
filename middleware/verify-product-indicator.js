/**
 * @author VAMPETA
 * @brief MIDDLEWARE QUE VERIFICA O DE QUAL PRODUTO VEIO A INTERACAO (SE FOI UM EVENTO DO WHATSAPP INSTAGRAM OU OUTRA PLATAFORMA)
 * @method POST
 * @route /webhook
 * @param {Object} req.body CORPO DA REQUISICAO
*/
export default function verifyProductIndicator(req, res, next) {
	if (req.body.object !== "whatsapp_business_account") return ;
	next();
}