import { init } from "./methods/init.js";
import { updateSockets, disconnect, configEvents } from "./methods/sockets.js";
import { loadChat } from "./methods/on/chat.js";
import { newMessage, updateView, newReact } from "./methods/emit/chat.js";
import { replyWindow } from "./methods/on/reply.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR ATUALIZACAO DE MENSAGENS DO FRONT END CONECTADO AO SOCKET
*/
export default class Socket {
	sockets = new Map();
	io = null;
	on = {};
	emit = {};

	constructor() {
		this.init = init.bind(this);
		this.updateSockets = updateSockets.bind(this);
		this.disconnect = disconnect.bind(this);
		this.configEvents = configEvents.bind(this);
		this.on.loadChat = loadChat.bind(this);
		this.on.replyWindow = replyWindow.bind(this);
		this.emit.newMessage = newMessage.bind(this);
		this.emit.updateView = updateView.bind(this);
		this.emit.newReact = newReact.bind(this);
	}
};