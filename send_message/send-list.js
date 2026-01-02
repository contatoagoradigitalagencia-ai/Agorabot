import axios from "axios"

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA ENVIAR UMA MENSAGEM COM LISTA
 * @param number NUMERO QUE VAI RECEBER A MENSAGEM
*/
export default async function sendList(number) {
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
				type: "list",
				body: { text: "Selecione um item:" },
				action: {
					button: "Ver opções",
					sections: [
						{
							title: "Categoria A",
							rows: [
								{
									id: "item_1",
									title: "Item 1",
									description: "Descrição curta"
								}
							]
						}
					]
				}
			}
		}
	});
}

					// AINDA NAO TERMINADO