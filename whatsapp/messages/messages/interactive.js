// import googleSheets from "../../../Google Sheets/GoogleSheets.js";
// import send from "../../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief TRATA A MENSAGEM CASO ELA SEJA DO TIPO "interactive"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} value CAMPO value PRESENTE EM req.body.entry[n].changes[n].value
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function interactive(account, value, message) {
	// responseMessage(message.id, message.from, `Opção selecionada: ${message.interactive[message.interactive.type].title}`);
	// console.log("chegou mensagem interativa");


// SO PRO RAMON VER
// console.log(JSON.stringify(message, null, 2))
// console.log(message.interactive.list_reply.title)
	// const page = await googleSheets.getPage(account, "Produtos");
	// console.log(page)
	// for (const product of page) {
	// 	if (message.interactive.list_reply.title === product.Produto) {
	// 		console.log(product)
	// 		await send.image(account, message.from, product.Foto, `${product.Produto}\nR$${product.Preco},00`);
	// 	}
	// }
// SO PRO RAMON VER
}