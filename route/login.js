import mongodb from "../MongoDB/Mongodb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
	if (!req.body) return (res.sendStatus(400));
	const { phone, password } = req?.body;

	if (!phone || typeof phone !== "string" || phone.length !== 13 || typeof password !== "string" || !password) return (res.sendStatus(400));
	const account = await mongodb.Account.findOne({ phone: phone }).select("-_id idPhone phone login.password");
	if (!account || !(await bcrypt.compare(password, account.login.password))) return (res.sendStatus(401));
	const token = jwt.sign(
		{
			idPhone: account.idPhone,
			phone: account.phone
		},
		process.env.JWT_SECRET,
		{ expiresIn: "7d" }
	);
	res.status(200).json({ idPhone: account.idPhone, token: token });
}