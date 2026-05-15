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
		
		// /chat/:phone
		socket.on("chat:load_messages", (data, callback) => this.on.chat.loadMessages(socket, data, callback));
		socket.on("chats:update_human_viewed", (data, callback) => this.on.chats.updateHumanViewed(socket, data, callback));
		socket.on("chat:reply_window", (data, callback) => this.on.chat.replyWindow(socket, data, callback));
		socket.on("chat:send_message", (data, callback) => this.on.chat.sendMessage(socket, data, callback));
		socket.on("chat:on_off", (data, callback) => this.on.chat.botOnOff(socket, data, callback));
		socket.on("chat:info_contact", (data, callback) => this.on.chat.infoContact(socket, data, callback));

		// /human-service
		socket.on("human-service:get_messages_waiting_service", (data, callback) => this.on.humanService.getMessagesWaitingService(socket, data, callback));
		socket.on("human-service:remove_waiting_service", (data, callback) => this.on.humanService.removeWaitingService(socket, data, callback));

		// /contacts
		socket.on("contacts:load_contacts", (data, callback) => this.on.contacts.loadContacts(socket, data, callback));
		socket.on("contacts:save_comment", (data, callback) => this.on.contacts.saveComment(socket, data, callback));

		// /quick-messages
		socket.on("quick-messages:get_quick_messages", (data, callback) => this.on.quickMessages.getQuickMessages(socket, data, callback));
		socket.on("quick-messages:save_quick_message", (data, callback) => this.on.quickMessages.saveQuickMessage(socket, data, callback));
		socket.on("quick-messages:delete_quick_message", (data, callback) => this.on.quickMessages.deleteQuickMessage(socket, data, callback));

		// /bot
		socket.on("bot:get_info_bot", (data, callback) => this.on.bot.getInfoBot(socket, data, callback));
		socket.on("bot:update_status_bot", (data, callback) => this.on.bot.updateStatusBot(socket, data, callback));
		socket.on("bot:update_status_visualization", (data, callback) => this.on.bot.updateVisualization(socket, data, callback));
		socket.on("bot:update_prompt", (data, callback) => this.on.bot.updatePrompt(socket, data, callback));
		socket.on("bot:prompt_suggestion", (data, callback) => this.on.bot.promptSuggestion(socket, data, callback));
		socket.on("bot:update_message_not_supported", (data, callback) => this.on.bot.updateMessageNotSupported(socket, data, callback));
		socket.on("bot:update_location", (data, callback) => this.on.bot.updateLocation(socket, data, callback));
		socket.on("bot:update_message_new_contact", (data, callback) => this.on.bot.updateMessageNewContact(socket, data, callback));
		socket.on("bot:update_status_redirect", (data, callback) => this.on.bot.updateStatusRedirect(socket, data, callback));
		socket.on("bot:update_numbers_redirect", (data, callback) => this.on.bot.updateNumbersRedirect(socket, data, callback));
		socket.on("bot:update_message_redirect", (data, callback) => this.on.bot.updateMessageRedirect(socket, data, callback));

		// /spreadsheets
		socket.on("spreadsheets:get_spreadsheets", (data, callback) => this.on.spreadsheets.getSpreadsheets(socket, data, callback));
		socket.on("spreadsheets:update_used_spreadsheets", (data, callback) => this.on.spreadsheets.updateUsedSpreadsheets(socket, data, callback));

		// /settings
		socket.on("settings:update_password", (data, callback) => this.on.settings.updatePassword(socket, data, callback));

		socket.on("disconnect", () => this.disconnect(socket));
	});
}