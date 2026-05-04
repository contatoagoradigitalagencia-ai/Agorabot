import mongodb from "../../../MongoDB/Mongodb.js";
import cloudflareR2 from "../../../Cloudflare R2/CloudflareR2.js";
import IA from "../../../IA/IA.js";
import send from "../../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "audio"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function audio(account, message) {
	try {
		const { stateBot } = await mongodb.Chat.findOne({ idPhone: account.idPhone, phone: message.from }).select("stateBot");

		message.audio.url = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, message.audio.url, "audio");
		await mongodb.saveAudioReceived(account.idPhone, message);
const transcribe = await IA.groq["whisper-large-v3-turbo"].transcribeFileMeta(account.idPhone, message.audio.url, account.accessToken);

		// if (stateBot && account.bot.messageNotSupported) await send.text(account, message.from, { text: { body: account.bot.messageNotSupported } });
console.log(transcribe)
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "audio": ${error}`);
	}
}