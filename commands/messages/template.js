// import send from "../../../Send/Send.js";
// import mongodb from "../../../MongoDB/Mongodb.js";

// /**
//  * @author VAMPETA
//  * @brief FUNCAO RESPONSAVEL PELO COMANDO "/template" (TESTA A MENSAGEM DO TIPO "template")
//  * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
//  * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
// */
// export default async function template(account, message) {	// DESABILITADO PARA NAO GERAR COBRANCAS
// 	try {
// 		await send.template(account, message.from, "teste_1");
// 		await send.template(account, message.from, "teste_2");
// 	} catch (error) {
// 		await mongodb.saveError(account.idPhone, `Error na funcao "template": ${error}`);
// 	}
// }