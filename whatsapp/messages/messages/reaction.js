import mongodb from "../../../MongoDB/Mongodb.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "reaction"
 * @param {Object} io INSTANCIA PRINCIPAL DO Socket.IO
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function reaction(account, message) {
    try {
        await mongodb.saveReactionReceived(account.idPhone, message.reaction.message_id, message.from, message.reaction.emoji, message.timestamp);
    } catch (error) {
        await mongodb.saveError(account.idPhone, `Error na funcao "reaction": ${error}`);
    }
}