import http from "http";
import { Server } from "socket.io";

import mongodb from "../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief AUTENTICA O USUARIO NO WEBSOCKET
 * @param socket OBJETO SOCKET DO CLIENTE
 * @param next FUNCAO NEXT
*/
async function authentication(socket, next) {
	const { phone, password } = socket.handshake.auth;

	if (typeof phone !== "string" || typeof password !== "string") return (next(new Error("Credenciais inválidas")));
	const user = await mongodb.Account.findOne({ phone: phone, password: password });
	if (!user) return (next(new Error("Usuário ou senha incorretos")));
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
	app.set("io", io);
	return ({ server, io });
}