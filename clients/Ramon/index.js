import googleSheets from "../../Google Sheets/GoogleSheets.js";
import send from "../../Send/Send.js";

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DO BOT DE UM CLIENTE ESPECIFICO PARA RECEBIMENTO DO TIPO "text"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function ramonText(account, message) {
	if (message.text.body === "Quero ver seus produtos") {
		const page = await googleSheets.getPage(account, "Produtos");
		const list = page.map((line, i) => ({
			id: i,
			title: line.Produto,
			description: `R$${line.Preco},00`
		}));

		await send.list(account, message.from, "Confira abaixo nossos produtos", "Nossos produtos", list);
	} else {
		await send.text(account, message.from, "Não entendi");
	}
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE CONTROLA O COMPORTAMENTO DO BOT DE UM CLIENTE ESPECIFICO PARA RECEBIMENTO DO TIPO "interactive"
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export async function ramonInteractive(account, message) {
console.log(JSON.stringify(message, null, 2))
console.log(message.interactive.list_reply.title)
	const page = await googleSheets.getPage(account, "Produtos");
	console.log(page)
	for (const product of page) {
		if (message.interactive.list_reply.title === product.Produto) {
			console.log(product)
			await send.image(account, message.from, product.Foto, `${product.Produto}\nR$${product.Preco},00`);
		}
	}
}