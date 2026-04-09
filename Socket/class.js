import { init } from "./methods/init.js";
import { updateSockets, disconnect, configEvents } from "./methods/sockets.js";

// on /dashboard
import { infoDashboard } from "./methods/on/dashboard/info.js";

// on /chat
import { loadChats } from "./methods/on/chats/chats.js";
import { updateHumanViewed } from "./methods/on/chats/chats.js";

// on /chat/:phone
import { loadMessages, quickMessages } from "./methods/on/chat/messages.js";
import { replyWindow } from "./methods/on/chat/reply.js";
import { sendText, sendLocation } from "./methods/on/chat/send.js";
import { botOnOff } from "./methods/on/chat/config/configs.js";
import { infoContact } from "./methods/on/chat/config/contact.js";

// emit /chat/:phone
import { newMessage, updateView, newReact } from "./methods/emit/chat/chat.js";

// on /contacts
import { loadContacts, saveComment } from "./methods/on/contacts/contacts.js";

// on /bot
import { getInfoBot, updateStatusBot, updatePrompt, promptSuggestion } from "./methods/on/bot/bot.js";

// on /spreadsheets
import { getSpreadsheets, updateUsedSpreadsheets } from "./methods/on/spreadsheets/spreadsheet.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR ATUALIZACAO DE MENSAGENS DO FRONT END CONECTADO AO SOCKET
*/
export default class Socket {
	sockets = new Map();
	io = null;
	on = {
		dashboard: {},
		chats: {},
		chat: {
			bot: {}
		},
		contacts: {},
		bot: {},
		spreadsheets: {},
		settings: {}
	};
	emit = {
		chat: {}
	};

	constructor() {
		this.init = init.bind(this);
		this.updateSockets = updateSockets.bind(this);
		this.disconnect = disconnect.bind(this);
		this.configEvents = configEvents.bind(this);

		// /dashboard
		this.on.dashboard.infoDashboard = infoDashboard.bind(this);

		// /chat
		this.on.chats.loadChats = loadChats.bind(this);
		this.on.chats.updateHumanViewed = updateHumanViewed.bind(this);

		// /chat/:phone
		this.on.chat.loadMessages = loadMessages.bind(this);
		this.on.chat.replyWindow = replyWindow.bind(this);
		this.on.chat.quickMessages = quickMessages.bind(this);
		this.on.chat.sendText = sendText.bind(this);
		this.on.chat.sendLocation = sendLocation.bind(this);
		this.on.chat.bot.botOnOff = botOnOff.bind(this);			// REFATORAR DEPOIS
		this.on.chat.infoContact = infoContact.bind(this);

		// /chat/:phone
		this.emit.chat.newMessage = newMessage.bind(this);
		this.emit.chat.updateView = updateView.bind(this);
		this.emit.chat.newReact = newReact.bind(this);

		// /contacts
		this.on.contacts.loadContacts = loadContacts.bind(this);
		this.on.contacts.saveComment = saveComment.bind(this);

		// /bot
		this.on.bot.getInfoBot = getInfoBot.bind(this);
		this.on.bot.updateStatusBot = updateStatusBot.bind(this);
		this.on.bot.updatePrompt = updatePrompt.bind(this);
		this.on.bot.promptSuggestion = promptSuggestion.bind(this);

		// /spreadsheets
		this.on.spreadsheets.getSpreadsheets = getSpreadsheets.bind(this);
		this.on.spreadsheets.updateUsedSpreadsheets = updateUsedSpreadsheets.bind(this);

		// /settings
	}
};