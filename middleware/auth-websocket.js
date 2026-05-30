import jwt from "jsonwebtoken";

import mongodb from "../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief AUTENTICA O USUARIO NO WEBSOCKET
 * @param socket OBJETO SOCKET DO CLIENTE
 * @param next FUNCAO NEXT
*/
export default async function authentication(socket, next) {
	const { token } = socket.handshake.auth;
	let encoded;

	if (typeof token !== "string") return (next(new Error("Token inválido")));
	try {
		encoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return (next(new Error("Token inválido")));
	}
	if (typeof encoded.idPhone !== "string" || typeof encoded.phone !== "string") return (next(new Error("Credenciais inválidas")));
	const account = await mongodb.Account.findOne({ idPhone: encoded.idPhone, phone: encoded.phone }).select("-_id -login");
	if (!account) return (next(new Error("Cliente não encontrado")));
	socket.account = account;
	next();
}