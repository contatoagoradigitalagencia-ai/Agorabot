import googleSheets from "../../Google Sheets/GoogleSheets.js";
import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DO BOT DE UM CLIENTE ESPECIFICO PARA RECEBIMENTO DO TIPO "text"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function vampetaText(account, message) {
	// await send.reaction(account, message.from, message.id, "😀");
	// await send.text(account, message.from, "testando");
	// await send.image(account, message.from, "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg", "michael jackson");
	// await send.image(account, message.from, "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg");
	// const page = await googleSheets.getPage(account, "Produtos");
	// const list = page.map((line, i) => ({
	// 	id: i,
	// 	title: line.Produto,
	// 	description: `R$${line.Preco},00`
	// }));
	// await send.list(account, message.from, "Confira abaixo nossos produtos", "Nossos produtos", list);
	// await send.button(account, message.from, "Escolha uma opcao:", ["abc", "123"]);
	// await send.button(account, message.from, "Escolha uma opcao:", ["abc", "123"], { image: { link: "https://cloudfront-us-east-1.images.arcpublishing.com/bloomberglinea/D4G26SQFRNHRHBVURTB5HJSIFI.png" } });
	// await send.button(account, message.from, "Escolha uma opcao:", ["abc", "123"], { video: { link: "https://download.samplelib.com/mp4/sample-5s.mp4" } });
	// await send.button(account, message.from, "Escolha uma opcao:", ["abc", "123"], { document: { link: "https://equilead.org/assets/eventagendadocument/sample.pdf", filename: "pdf teste" } });
	await send.button(account, message.from, "Escolha uma opcao:", ["abc", "123"]);
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DO BOT DE UM CLIENTE ESPECIFICO PARA RECEBIMENTO DO TIPO "interactive"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function vampetaInteractive(account, message) {
console.log(message)
}