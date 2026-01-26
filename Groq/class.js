import connect from "./methods/connect.js";
import { bot } from "./methods/bot.js";
import { prompt } from "./methods/prompt.js";
import { chatHistory } from "./methods/chatHistory.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR A CONEXAO COM A IA DA GROQ
*/
export default class Groq {
	groq = null;
	mongodb = null;
	googleSheets = null;

	constructor(mongodb, googleSheets) {
		this.mongodb = mongodb;
		this.googleSheets = googleSheets;
		this.connect = connect.bind(this);
		this.bot = bot.bind(this);
		this.prompt = prompt.bind(this);
		this.chatHistory = chatHistory.bind(this);
	}
};