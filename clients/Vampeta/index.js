import { googleSheets } from "../../configs/google sheets.js";
import sendList from "../../send_message/send-list.js";

export default async function vampeta(account, message) {
	const page = await googleSheets.getPage(account, "Produtos");
	const list = page.map((line, i) => ({
		id: i,
		title: line.Produto,
		description: `R$${line.Preco},00`
	}));
	await sendList(account, message.from, "Confira abaixo nossos produtos", "Nossos produtos", list);
// PAREI AKI RESPONDEDO COM UMA LISTA
// AINDA NAO TERMINEI send-list		// E SE EU CRIAR UMA CLASSE PRA ENVIAR MENSAGENS?	// IDEIA DO CAO		// MAS ACHEI BOA
// ACHO Q VOU CRIAR UMA CLASSE PRO MONGODB TBM
}