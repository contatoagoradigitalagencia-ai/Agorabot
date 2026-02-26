import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import mongodb from "../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief AUTENTICA O USUARIO NO WEBSOCKET
 * @param socket OBJETO SOCKET DO CLIENTE
 * @param next FUNCAO NEXT
*/
async function authentication(socket, next) {
	// const { idPhone, phone } = socket.handshake.auth;

	// if (typeof idPhone !== "string" || typeof phone !== "string") return (next(new Error("Credenciais inválidas")));
	// const account = await mongodb.Account.findOne({ idPhone: idPhone }).select("-_id -login");
	// if (!account) return (next(new Error("Cliente não encontrado")));
	// const chat = await mongodb.Chat.exists({ idPhone: idPhone, phone: phone });
	// if (!chat) return (next(new Error("Chat não encontrado")));
	// socket.account = account;
	// next();


	const { token } = socket.handshake.auth;

	if (typeof token !== "string") return (next(new Error("Credenciais inválidas")));
	const { idPhone, phone } = jwt.verify(token, process.env.JWT_SECRET);
	const account = await mongodb.Account.findOne({ idPhone: idPhone }).select("-_id -login");
	if (!account) return (next(new Error("Cliente não encontrado")));
	const chat = await mongodb.Chat.exists({ idPhone: idPhone, phone: phone });
	if (!chat) return (next(new Error("Chat não encontrado")));
	socket.account = account;
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