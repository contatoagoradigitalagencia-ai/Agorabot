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
		message.audio.url = await cloudflareR2.upload(account.idPhone, account.accessToken, message.from, message.audio.url, "audio");
		message.audio.transcribe = await IA.groq["whisper-large-v3-turbo"].transcribeFileMeta(account.idPhone, message.audio.url, account.accessToken);
		await mongodb.saveAudioReceived(account.idPhone, message);
		const { bot } = await mongodb.Contact.findOne({ idPhone: account.idPhone, phone: message.from }).select("-_id bot").lean();
		if (account.bot.activated === true && bot === true) await IA.groq["llama-3.3-70b-versatile"].bot(account, message.from);
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "audio": ${error}`);
	}
}