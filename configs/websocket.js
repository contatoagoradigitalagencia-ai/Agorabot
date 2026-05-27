import http from "http";
import { Server } from "socket.io";

import authentication from "../middleware/auth-websocket.js";

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