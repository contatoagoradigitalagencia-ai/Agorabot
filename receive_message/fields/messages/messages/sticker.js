/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "sticker"
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default function sticker(value, message) {
	console.log("chegou figurinha");
}