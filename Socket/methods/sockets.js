/**
 * @author VAMPETA
 * @brief ATUALIZA O MAPA DE SOCKETS COM O NOVO SOCKET CONECTADO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
*/
export function updateSockets(socket) {
	const { idPhone, phone } = socket.account;

	if (!this.sockets.has(idPhone)) this.sockets.set(idPhone, new Set());
	this.sockets.get(idPhone).add(socket.id);
console.log("Chat conectado   ", "\x1b[34m==>\x1b[0m", "id:", socket.id, "idPhone:", idPhone, "phone:", phone);
}

/**
 * @author VAMPETA
 * @brief REMOVE O SOCKET DO MAPA DE SOCKETS
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
*/
export function disconnect(socket) {
	const { idPhone, phone } = socket.account;

	if (!this.sockets.get(idPhone)) return ;
	this.sockets.get(idPhone).delete(socket.id);
	if (this.sockets.get(idPhone).size === 0) this.sockets.delete(idPhone);
console.log("Chat desconectado", "\x1b[33m==>\x1b[0m", "id:", socket.id, "idPhone:", idPhone, "phone:", phone);
}

/**
 * @author VAMPETA
 * @brief CONFIGURA EVENTOS DO WEBSOCKET
*/
export async function configEvents() {
	this.io.on("connection", async (socket) => {
		this.updateSockets(socket);
		socket.on("chats:load_chats", (data, callback) => this.on.chats.loadChats(socket, data, callback));
		socket.on("chat:load_messages", (data, callback) => this.on.messages.loadMessages(socket, data, callback));
		socket.on("chat:reply_window", (data, callback) => this.on.messages.replyWindow(socket, data, callback));
		socket.on("chat:quick_messages", (data, callback) => this.on.messages.quickMessages(socket, data, callback));
		socket.on("chat:send:text", (data, callback) => this.on.messages.sendText(socket, data, callback));
		socket.on("chat:send:location", (data, callback) => this.on.messages.sendLocation(socket, data, callback));
		socket.on("chat:bot:on_off", (data, callback) => this.on.config.bot.botOnOff(socket, data, callback));
		socket.on("disconnect", () => this.disconnect(socket));
	});
}