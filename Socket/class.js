import { init } from "./methods/init.js";
import { updateSockets, disconnect, configEvents } from "./methods/sockets.js";

// on /chat
import { loadChats } from "./methods/on/chats/chats.js";

// on /chat/:phone
import { loadMessages, quickMessages } from "./methods/on/chat/messages.js";
import { replyWindow } from "./methods/on/chat/reply.js";
import { sendText, sendLocation } from "./methods/on/chat/send.js";
import { botOnOff } from "./methods/on/chat/config/configs.js";

// emit /chat/:phone
import { newMessage, updateView, newReact } from "./methods/emit/chat/chat.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR ATUALIZACAO DE MENSAGENS DO FRONT END CONECTADO AO SOCKET
*/
export default class Socket {
	sockets = new Map();
	io = null;
	on = {
		chats: {},
		chat: {
			bot: {}
		}
	};
	emit = {
		chat: {}
	};

	constructor() {
		this.init = init.bind(this);
		this.updateSockets = updateSockets.bind(this);
		this.disconnect = disconnect.bind(this);
		this.configEvents = configEvents.bind(this);

		// /chat
		this.on.chats.loadChats = loadChats.bind(this);

		// /chat/:phone
		this.on.chat.loadMessages = loadMessages.bind(this);
		this.on.chat.replyWindow = replyWindow.bind(this);
		this.on.chat.quickMessages = quickMessages.bind(this);
		this.on.chat.sendText = sendText.bind(this);
		this.on.chat.sendLocation = sendLocation.bind(this);
		this.on.chat.bot.botOnOff = botOnOff.bind(this);

		// /chat/:phone
		this.emit.chat.newMessage = newMessage.bind(this);
		this.emit.chat.updateView = updateView.bind(this);
		this.emit.chat.newReact = newReact.bind(this);
	}
};