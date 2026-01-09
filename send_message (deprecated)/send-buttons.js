import axios from "axios";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR UMA MENSAGEM COM BOTOES
 * @param number NUMERO QUE VAI RECEBER A MENSAGEM
*/
export default async function sendButons(number) {
	const res = await axios({
		method: "POST",
		url: "https://graph.facebook.com/v22.0/" + process.env.IDENTIFICACAO_DO_NUMERO_DE_TELEFONE + "/messages",
		headers: {
			Authorization: "Bearer " + process.env.ACCESS_TOKEN,
		},
		data: {
			messaging_product: "whatsapp",
			to: number,
			type: "interactive",
			interactive: {
				type: "button",
				body: { text: "Escolha uma opção:" },
				action: {
					buttons: [
						{
							type: "reply",
							reply: { id: "opt_1", title: "Opção 1" }
						},
						{
							type: "reply",
							reply: { id: "opt_2", title: "Opção 2" }
						}
					]
				}
			}
		}
	});
}

					// AINDA NAO TERMINADO