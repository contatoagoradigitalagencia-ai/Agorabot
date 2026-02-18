import mongodb from "../../MongoDB/Mongodb.js";
// import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief ATUALIZA O MAPA DE SOCKETS COM O NOVO SOCKET CONECTADO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
*/
export function updateSockets(socket) {
	const { idPhone, phone } = socket.handshake.auth;

	if (!this.sockets.has(idPhone + phone)) this.sockets.set(idPhone + phone, new Set());
	this.sockets.get(idPhone + phone).add(socket.id);
console.log("Chat conectado   ", "\x1b[34m==>\x1b[0m", "id:", socket.id, "idPhone:", idPhone, "phone:", phone);
}

/**
 * @author VAMPETA
 * @brief REMOVE O SOCKET DO MAPA DE SOCKETS
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
*/
export function disconnect(socket) {
	const { idPhone, phone } = socket.handshake.auth;

	if (!this.sockets.get(idPhone + phone)) return ;
	this.sockets.get(idPhone + phone).delete(socket.id);
	if (this.sockets.get(idPhone + phone).size === 0) this.sockets.delete(idPhone + phone);
console.log("Chat desconectado", "\x1b[33m==>\x1b[0m", "id:", socket.id, "idPhone:", idPhone, "phone:", phone);
}

/**
 * @author VAMPETA
 * @brief CONFIGURA EVENTOS DO WEBSOCKET
*/
export async function configEvents() {
	this.io.on("connection", async (socket) => {
		this.updateSockets(socket);
		socket.on("load_chat", (data, callback) => this.on.loadChat(socket, data, callback));
		socket.on("reply_window", (data, callback) => this.on.replyWindow(socket, data, callback));



// socket.on("send_message_text", async (data, callback) => {
// 	const { idPhone, phone } = socket.handshake.auth;

// 	try {
// 		const account = mongodb.Message.findOne({ idPhone: idPhone });

// console.log(account)
// 	} catch (error) {
// 		await mongodb.saveError(idPhone, `Error no metodo "teste": ${error}`);
// 	}
// });



		socket.on("disconnect", () => this.disconnect(socket));
	});
}