/**
 * @author VAMPETA
 * @brief ATUALIZA O MAPA DE SOCKETS COM O NOVO SOCKET CONECTADO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
*/
export function updateSockets(socket) {
	const { idPhone, phone } = socket.account;

	if (!this.sockets.has(idPhone)) this.sockets.set(idPhone, new Set());
	this.sockets.get(idPhone).add(socket.id);
console.log("\x1b[32m•\x1b[0m", phone);
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
console.log("\x1b[31m•\x1b[0m", phone);
}

/**
 * @author VAMPETA
 * @brief CONFIGURA EVENTOS DO WEBSOCKET
*/
export async function configEvents() {
	this.io.on("connection", async (socket) => {
		this.updateSockets(socket);

		// /dashboard
		socket.on("dashboard:info", (data, callback) => this.on.dashboard.infoDashboard(socket, data, callback));

		// /chat
		socket.on("chats:load_chats", (data, callback) => this.on.chats.loadChats(socket, data, callback));
		socket.on("chats:update_human_viewed", (data, callback) => this.on.chats.updateHumanViewed(socket, data, callback));

		// /chat/:phone
		socket.on("chat:load_messages", (data, callback) => this.on.chat.loadMessages(socket, data, callback));
		socket.on("chat:reply_window", (data, callback) => this.on.chat.replyWindow(socket, data, callback));
		socket.on("chat:quick_messages", (data, callback) => this.on.chat.quickMessages(socket, data, callback));
		socket.on("chat:send:text", (data, callback) => this.on.chat.sendText(socket, data, callback));
		socket.on("chat:send:location", (data, callback) => this.on.chat.sendLocation(socket, data, callback));
		socket.on("chat:bot:on_off", (data, callback) => this.on.chat.bot.botOnOff(socket, data, callback));
		socket.on("chat:info_contact", (data, callback) => this.on.chat.infoContact(socket, data, callback));

		// /contacts
		socket.on("contacts:load_contacts", (data, callback) => this.on.contacts.loadContacts(socket, data, callback));
		socket.on("contacts:save_comment", (data, callback) => this.on.contacts.saveComment(socket, data, callback));

		// /settings
		socket.on("spreadsheets:get_spreadsheets", (data, callback) => this.on.spreadsheets.getSpreadsheets(socket, data, callback));
		socket.on("spreadsheets:update_used_spreadsheets", (data, callback) => this.on.spreadsheets.updateUsedSpreadsheets(socket, data, callback));

		socket.on("disconnect", () => this.disconnect(socket));
	});
}