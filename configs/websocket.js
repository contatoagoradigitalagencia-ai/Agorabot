import http from "http";
import { Server } from "socket.io";

import mongodb from "../MongoDB/Mongodb.js";

// /**
//  * @author VAMPETA
//  * @brief AUTENTICA O USUARIO NO WEBSOCKET
//  * @param socket OBJETO SOCKET DO CLIENTE
//  * @param next FUNCAO NEXT
// */
// async function authentication(socket, next) {			// ANTIGO FRONT END Q PEDIA phone E password
// 	const { phone, password } = socket.handshake.auth;

// 	if (typeof phone !== "string" || typeof password !== "string") return (next(new Error("Credenciais inválidas")));
// 	const user = await mongodb.Account.findOne({ phone: phone, password: password });
// 	if (!user) return (next(new Error("Usuário ou senha incorretos")));
// 	next();
// }

/**
 * @author VAMPETA
 * @brief AUTENTICA O USUARIO NO WEBSOCKET
 * @param socket OBJETO SOCKET DO CLIENTE
 * @param next FUNCAO NEXT
*/
async function authentication(socket, next) {
	const { idPhone, phone } = socket.handshake.auth;

	if (typeof idPhone !== "string" || typeof phone !== "string") return (next(new Error("Credenciais inválidas")));
	const user = await mongodb.Chat.findOne({ idPhone: idPhone, phone: phone });
	if (!user) return (next(new Error("Chat não encontrado")));
	next();
}

/**
 * @author VAMPETA
 * @brief CONFIGURA WEBSOCKET
 * @param app APLICACAO EXPRESS
 * @return {Object} OBJETO COM SERVER E IO
*/
export default function configWebSocket(app) {
	const server = http.createServer(app);
	const io = new Server(server, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"]
		}
	});

	io.use(authentication);
	return ({ server, io });
}