import axios from "axios"

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR UMA MENSAGEM COM LISTA
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} number NUMERO QUE VAI RECEBER A MENSAGEM
*/
export default async function sendList(account, number, text, button, list) {
	try {
		// const res = await axios({
		// 	method: "POST",
		// 	url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
		// 	headers: {
		// 		Authorization: "Bearer " + account.accessToken
		// 	},
		// 	data: {
		// 		messaging_product: "whatsapp",
		// 		to: number,
		// 		type: "interactive",
		// 		interactive: {
		// 			type: "list",
		// 			body: { text: "Selecione um item:" },
		// 			action: {
		// 				button: "Ver opções",
		// 				sections: [
		// 					{
		// 						title: "Categoria A",
		// 						rows: [
		// 							{
		// 								id: "item_1",
		// 								title: "Item 1",
		// 								description: "Descrição curta"
		// 							}
		// 						]
		// 					}
		// 				]
		// 			}
		// 		}
		// 	}
		// });
		const res = await axios({
			method: "POST",
			url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
			headers: {
				Authorization: "Bearer " + account.accessToken
			},
			data: {
				messaging_product: "whatsapp",
				to: number,
				type: "interactive",
				interactive: {
					type: "list",
					body: { text: text },
					action: {
						button: button,
						sections: [
							{
								title: "Categoria A",
								rows: list
							}
						]
					}
				}
			}
		});
	} catch (error) {
		await saveError(account.idPhone, `Erro na função "sendText": ${error}`);
	}
}

					// AINDA NAO TERMINADO