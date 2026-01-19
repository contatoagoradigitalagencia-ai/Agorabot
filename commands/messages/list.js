import send from "../../Send/Send.js";
import mongodb from "../../MongoDB/Mongodb.js";

const sections = [
	{
		title: "categoria 1",
		rows: [
			{
				id: 1,
				title: "title 1",
				description: "description 1"
			},
			{
				id: 2,
				title: "title 2",
				description: "description 2"
			},
			{
				id: 3,
				title: "title 3",
				description: "description 3"
			}
		]
	},
	{
		title: "categoria 2",
		rows: [
			{
				id: 1,
				title: "title 1",
				description: "description 1"
			}
		]
	},
	{
		title: "categoria 3",
		rows: [
			{
				id: 1,
				title: "title 1",
				description: "description 1"
			},
			{
				id: 2,
				title: "title 2",
				description: "description 2"
			}
		]
	},
];

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL PELO COMANDO "/list" (TESTA A MENSAGEM DO TIPO "list")
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {Object} message UM UNICO ELEMENTO DE req.body.entry[n].changes[n].value.messages[n]
*/
export default async function list(account, message) {
	try {
		await send.list(account, message.from, { body: { text: "texto do body" }, action: { button: "botao", sections: sections } });
		await send.list(account, message.from, { context: { message_id: message.id }, body: { text: "texto do body" }, action: { button: "botao", sections: sections } });
		await send.list(account, message.from, { header: { text: "texto do header" }, body: { text: "texto do body" }, footer: { text: "texto do footer" }, action: { button: "botao", sections: sections } });
	} catch (error) {
		await mongodb.saveError(account.idPhone, `Error na funcao "list": ${error}`);
	}
}