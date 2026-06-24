import jwt from "jsonwebtoken";

import mongodb from "../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief MIDDLEWARE QUE VERIFICA A AUTENTICACAO
 * @method POST
 * @route /upload
 * @returns 401 - TOKEN AUSENTE OU INVALIDO
 * @returns 403 - USUARIO NAO ENCONTRADO
 * @returns 500 - ERRO INTERNO DO BANCO DE DADOS
*/
export default async function uploadAuthentication(req, res, next) {
	const auth = req.headers.authorization;
	if (!auth || !auth.startsWith("Bearer ")) return (res.sendStatus(401));
	const token = auth.split(" ")[1];
	let idPhone, phone;

	if (!token) return (res.sendStatus(401));
	try {
		const encoded = jwt.verify(token, process.env.JWT_SECRET);
		idPhone = encoded.idPhone;
		phone = encoded.phone;
	} catch (error) {
		return (res.sendStatus(401));
	}
	if (typeof idPhone !== "string" || typeof phone !== "string") return (res.sendStatus(401));
	try {
		const account = await mongodb.Account.findOne({ idPhone: idPhone, phone: phone }).select("-_id -login").lean();
		if (!account) return (res.sendStatus(403));
		req.account = account;
	} catch (error) {
		return (res.sendStatus(500));
	}
	next();
}