/**
 * @author VAMPETA
 * @brief MIDDLEWARE QUE REPOSPONDE RAPIDAMENTE A API OFICIAL ANTES DE QUALQUEER OUTRA COISA
 * @method POST
 * @route /webhook
 * @returns 200 - RESPONDE SE NAO RECEBER O STATUS 403 NO MIDDLEWARE verifySignature
*/
export default function response(req, res, next) {
	res.sendStatus(200);
	next();
}