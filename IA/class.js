import connect from "./methods/groq/connect.js";
import { chatHistory } from "./methods/groq/chatHistory.js";
// import { bot } from "./methods/groq/moonshotai-kimi-k2-instruct/response/bot.js";
// import { products } from "./methods/groq/moonshotai-kimi-k2-instruct/response/products.js";
// import { promptSuggestion } from "./methods/groq/moonshotai-kimi-k2-instruct/response/promptSuggestion.js";
import { bot } from "./methods/groq/llama-3.3-70b-versatile/response/bot.js";
import { products } from "./methods/groq/llama-3.3-70b-versatile/response/products.js";
import { promptSuggestion } from "./methods/groq/llama-3.3-70b-versatile/response/promptSuggestion.js";
import { transcribeFileMeta } from "./methods/groq/whisper-large-v3-turbo/transcribeFileMeta.js";
import { responseSuggestion } from "./methods/groq/llama-3.3-70b-versatile/response/responseSugestion.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR A CONEXAO COM A IA
*/
export default class IA {
	groq = {
		groq: null,
		"moonshotai/kimi-k2-instruct": {},
		"llama-3.3-70b-versatile": {},
		"whisper-large-v3-turbo": {}
	};

	constructor() {
		this.groq.connect = connect.bind(this);

		this.groq.chatHistory = chatHistory.bind(this);

		// this.groq["moonshotai/kimi-k2-instruct"].bot = bot.bind(this);
		// this.groq["moonshotai/kimi-k2-instruct"].products = products.bind(this);
		// this.groq["moonshotai/kimi-k2-instruct"].promptSuggestion = promptSuggestion.bind(this);

		this.groq["llama-3.3-70b-versatile"].bot = bot.bind(this);
		this.groq["llama-3.3-70b-versatile"].products = products.bind(this);
		this.groq["llama-3.3-70b-versatile"].promptSuggestion = promptSuggestion.bind(this);
		this.groq["llama-3.3-70b-versatile"].responseSuggestion = responseSuggestion.bind(this);

		this.groq["whisper-large-v3-turbo"].transcribeFileMeta = transcribeFileMeta.bind(this);
	}
};