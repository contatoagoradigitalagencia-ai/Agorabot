import connect from "./methods/groq/connect.js";
import { chatHistory } from "./methods/groq/chatHistory.js";
import { bot } from "./methods/groq/response/bot.js";
import { products } from "./methods/groq/response/products.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR A CONEXAO COM A IA
*/
export default class IA {
	groq = {
		groq: null
	};

	constructor() {
		this.groq.connect = connect.bind(this);

		this.groq.chatHistory = chatHistory.bind(this);

		this.groq.bot = bot.bind(this);
		this.groq.products = products.bind(this);
	}
};