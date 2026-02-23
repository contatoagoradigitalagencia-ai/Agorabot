import mongodb from "../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief ROTA USADA PARA FAZER LOGIN NO FRONT END
 * @method POST
 * @route /login
 * @param {String} req.body.phone NUMERO DE TELEFONE DE LOGIN
 * @param {String} req.body.password SENHA DO USUARIO
 * @returns 200 - AUTENTICACAO BEM SUCESSEDIDA
 * @returns 400 - RETORNA APENAS O STATUS SE 'phone' OU 'password' NAO FOREM ENVIADOS
 * @returns 401 - MENSAGEM DE ERRO AO TENTAR LOGAR COM LOGIN OU SENHA ERRADA
*/
export default async function login(req, res) {
	const { phone, password } = req?.body;

	if (!req.body) return (res.sendStatus(400));
	if (!phone || typeof phone !== "string" || phone.length !== 13 || typeof password !== "string" || !password) return (res.sendStatus(400));
	const account = await mongodb.Account.findOne({ phone: phone, password: password }).select("-_id -password -accessToken");
console.log("aki:", account)
	if (!account) return (res.sendStatus(401));
	res.status(200).json(account);
}