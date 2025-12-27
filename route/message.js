import sendText from "../send_message/send-text.js";

/**
 * @author VAMPETA
 * @brief ROTA QUE ENVIA UMA MENSAGEM
 * @method POST
 * @route /message
 * @param {String} body.password SENHA DE AUTENTICACAO
 * @param {String} body.number NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {String} body.message TEXTO COM A MENSAGEM
 * @returns 204 - MENSAGEM ENVIADA COM SUCESSO
 * @returns 400 - ALGUM PARAMETRO INVALIDO NO CORPO DA REQUISICAO
 * @returns 401 - SENHA INCORRETA
*/
export default async function message(req, res) {
	const { password, number, message } = req.body;

	if (typeof password !== "string" || password !== process.env.PASSWORD) return (res.sendStatus(401));
	if (typeof number !== "string" || typeof message !== "string") return (res.sendStatus(400));
	const response = await sendText(number, message);
	res.sendStatus(response.status);
}