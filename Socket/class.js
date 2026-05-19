import { init } from "./methods/init.js";
import { updateSockets, disconnect, configEvents } from "./methods/sockets.js";

// on /dashboard
import { infoDashboard } from "./methods/on/dashboard/info.js";

// on /chat
import { loadChats } from "./methods/on/chats/chats.js";
import { updateHumanViewed } from "./methods/on/chats/chats.js";

// on /chat/:phone
import { loadMessages } from "./methods/on/chat/messages.js"; 
import { replyWindow } from "./methods/on/chat/reply.js";
import { sendMessage } from "./methods/on/chat/send.js";
import { infoContact, botOnOff } from "./methods/on/chat/contact.js";

// emit /chat/:phone
import { newMessage, updateView, newReact } from "./methods/emit/chat/chat.js";

// /human-service
import { getMessagesWaitingService, removeWaitingService } from "./methods/on/human service/messages.js";

// on /contacts
import { loadContacts, saveComment } from "./methods/on/contacts/contacts.js";

// on /quick-messages
import { getQuickMessages, saveQuickMessage, deleteQuickMessage } from "./methods/on/quick messages/quick-messages.js";

// on /bot
import { getInfoBot, updateStatusBot, updateVisualization, updatePrompt, promptSuggestion, updateMessageNotSupported, updateLocation, updateMessageNewContact, updateStatusRedirect, updateNumbersRedirect, updateMessageRedirect } from "./methods/on/bot/bot.js";

// on /spreadsheets
import { getSpreadsheets, updateUsedSpreadsheets } from "./methods/on/spreadsheets/spreadsheet.js";

// on /settings
import { updatePassword } from "./methods/on/settings/password.js";

// on /sepport
import { getInfoSupport } from "./methods/on/support/support.js";


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
		chat: {},
		humanService: {},
		contacts: {},
		quickMessages: {},
		bot: {},
		spreadsheets: {},
		settings: {},
		support: {}
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
		this.on.chat.sendMessage = sendMessage.bind(this);
		this.on.chat.infoContact = infoContact.bind(this);
		this.on.chat.botOnOff = botOnOff.bind(this);

		// /chat/:phone
		this.emit.chat.newMessage = newMessage.bind(this);
		this.emit.chat.updateView = updateView.bind(this);
		this.emit.chat.newReact = newReact.bind(this);

		// /human-service
		this.on.humanService.getMessagesWaitingService = getMessagesWaitingService.bind(this);
		this.on.humanService.removeWaitingService = removeWaitingService.bind(this);

		// /contacts
		this.on.contacts.loadContacts = loadContacts.bind(this);
		this.on.contacts.saveComment = saveComment.bind(this);

		// /quick-messages
		this.on.quickMessages.getQuickMessages = getQuickMessages.bind(this);
		this.on.quickMessages.saveQuickMessage = saveQuickMessage.bind(this);
		this.on.quickMessages.deleteQuickMessage = deleteQuickMessage.bind(this);

		// /bot
		this.on.bot.getInfoBot = getInfoBot.bind(this);
		this.on.bot.updateStatusBot = updateStatusBot.bind(this);
		this.on.bot.updateVisualization = updateVisualization.bind(this);
		this.on.bot.updatePrompt = updatePrompt.bind(this);
		this.on.bot.promptSuggestion = promptSuggestion.bind(this);
		this.on.bot.updateMessageNotSupported = updateMessageNotSupported.bind(this);
		this.on.bot.updateLocation = updateLocation.bind(this);
		this.on.bot.updateMessageNewContact = updateMessageNewContact.bind(this);
		this.on.bot.updateStatusRedirect = updateStatusRedirect.bind(this);
		this.on.bot.updateNumbersRedirect = updateNumbersRedirect.bind(this);
		this.on.bot.updateMessageRedirect = updateMessageRedirect.bind(this);

		// /spreadsheets
		this.on.spreadsheets.getSpreadsheets = getSpreadsheets.bind(this);
		this.on.spreadsheets.updateUsedSpreadsheets = updateUsedSpreadsheets.bind(this);

		// /settings
		this.on.settings.updatePassword = updatePassword.bind(this);

		// /support
		this.on.support.getInfoSupport = getInfoSupport.bind(this);
	}
};