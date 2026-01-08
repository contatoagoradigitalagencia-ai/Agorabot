import { googleSheets } from "../../configs/google sheets.js";
import sendList from "../../send_message/send-list.js";
import sendText from "../../send_message/send-text.js";
import sendImage from "../../send_message/send-image.js";

export default async function vampeta(account, message) {
	const page = await googleSheets.getPage(account, "Produtos");
	const list = page.map((line, i) => ({
		id: i,
		title: line.Produto,
		description: `R$${line.Preco},00`
	}));

	// await sendList(account, message.from, "Confira abaixo nossos produtos", "Nossos produtos", list);
// PAREI AKI RESPONDEDO COM UMA LISTA
// AINDA NAO TERMINEI send-list		// E SE EU CRIAR UMA CLASSE PRA ENVIAR MENSAGENS?	// IDEIA DO CAO		// MAS ACHEI BOA	// AMANHA FAREI ISSO
// ACHO Q VOU CRIAR UMA CLASSE PRO MONGODB TBM		// FIZ ISSO E ACABEI PERDENDO O DIA TODO (MAS FOI BOM PRA REFORSAR POO EM JS)

	// await sendText(account, message.from, "testando");
	// await sendImage(account, message.from, "https://i.ytimg.com/vi/h_D3VFfhvs4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCpDPDUWzVtuR5fOw0eN1Cv6-FYqA", "michael jackson");
}