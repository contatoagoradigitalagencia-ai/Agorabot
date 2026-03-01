import { init } from "./methods/init.js";
import { updateSockets, disconnect, configEvents } from "./methods/sockets.js";
import { loadChats } from "./methods/on/chats/chats.js";
import { loadMessages, quickMessages } from "./methods/on/messages/messages.js";
import { replyWindow } from "./methods/on/messages/reply.js";
import { sendText, sendLocation } from "./methods/on/messages/send.js";
import { botOnOff } from "./methods/on/config/bot/configs.js";
import { newMessage, updateView, newReact } from "./methods/emit/messages/chat.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR ATUALIZACAO DE MENSAGENS DO FRONT END CONECTADO AO SOCKET
*/
export default class Socket {
	sockets = new Map();
	io = null;
	on = {
		chats: {},
		messages: {},
		config: {
			bot: {}
		}
	};
	emit = {
		messages: {}
	};

	constructor() {
		this.init = init.bind(this);
		this.updateSockets = updateSockets.bind(this);
		this.disconnect = disconnect.bind(this);
		this.configEvents = configEvents.bind(this);
		this.on.chats.loadChats = loadChats.bind(this);
		this.on.messages.loadMessages = loadMessages.bind(this);
		this.on.messages.replyWindow = replyWindow.bind(this);
		this.on.messages.quickMessages = quickMessages.bind(this);
		this.on.messages.sendText = sendText.bind(this);
		this.on.messages.sendLocation = sendLocation.bind(this);
		this.on.config.bot.botOnOff = botOnOff.bind(this);
		this.emit.messages.newMessage = newMessage.bind(this);
		this.emit.messages.updateView = updateView.bind(this);
		this.emit.messages.newReact = newReact.bind(this);
	}
};
