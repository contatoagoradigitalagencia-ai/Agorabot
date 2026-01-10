import googleSheets from "../../Google Sheets/GoogleSheets.js";
import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DO BOT DE UM CLIENTE ESPECIFICO
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function vampeta(account, message) {
	// const page = await googleSheets.getPage(account, "Produtos");
	// const list = page.map((line, i) => ({
	// 	id: i,
	// 	title: line.Produto,
	// 	description: `R$${line.Preco},00`
	// }));
// console.log(list)
	// await send.list(account, message.from, "Confira abaixo nossos produtos", "Nossos produtos", list);

	await send.react(account, message.from, message.id, "😀");
	// await send.text(account, message.from, "testando");
	// await send.image(account, message.from, "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg", "michael jackson");
}