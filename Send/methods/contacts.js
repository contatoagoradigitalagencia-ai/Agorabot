import axios from "axios";

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ENVIAR MENSAGENS SIMPLES
 * @param {Object} account DADOS DO NUMERO QUE RECEBEU ATUALIZACOES
 * @param {String} phone NUMERO QUE VAI RECEBER A MENSAGEM
 * @param {Object} options OBTETO QUE PODE RECEBER context E image (OBRIGATORIO)
 * @param {Object} [options.context] CAMPO OPICIONAL PARA INDICAR QUE ESTA MENSAGEM E UMA RESPOSTA A OUTRA (OPCIONAL)
 * @param {Object} [options.contacts] (OBRIGATORIO)
 * @return {String} RETORNA O WAMID DA MENSAGEM
*/
export default async function contacts(account, phone, options = {}) {
	const { context, contacts } = options;

	try {
		const data = {
			messaging_product: "whatsapp",
			to: phone,
			context: (context) ? {
				message_id: context.message_id
			} : undefined,
			type: "contacts",
			contacts: [
				{
					name: {
						formatted_name: contacts.name.formatted_name,
						first_name: contacts.name.first_name
					},
					phones: (contacts.phones) ? contacts.phones.map((phone) => ({
						phone: phone.phone,
						type: "CELL"
					})) : undefined,
					emails: (contacts.emails) ? contacts.emails.map((email) => ({
						email: email.email,
						type: "WORK"
					})) : undefined,
					org: {
						company: contacts.org.company,
						title: contacts.org.title
					}
				}
			]
		};
		const res = await axios({
			method: "POST",
			url: "https://graph.facebook.com/v22.0/" + account.idPhone + "/messages",
			headers: {
				Authorization: "Bearer " + account.accessToken
			},
			data: data
		});

		if (res.status !== 200) throw (`O axios retornou status ${res.status} ==> ${JSON.stringify(res.data, null, 2)}`);
		const wamid = res.data?.messages?.[0]?.id;
		if (!wamid) throw ("Wamid não retornado pela API da Meta");
		delete data.messaging_product;
		delete data.to;
		await this.mongodb.saveContactsSent(account.idPhone, wamid, phone, data);
		return (wamid);
	} catch (error) {
		await this.mongodb.saveError(account.idPhone, `Erro na função "contacts": ${error}`);
		return (null);
	}
}



// contacts: [		// PADRAO DO CAMPO sections
// 	{
// 		name: {
// 			formatted_name: "",         // OBRIGATORIO
// 			first_name: "",             // OPICIONAL
// 			last_name: "",              // OPICIONAL
// 			middle_name: "",            // OPICIONAL
// 			suffix: "",                 // OPICIONAL
// 			prefix: ""                  // OPICIONAL
// 		},
// 		phones: [						// OPICIONAL
// 			{
// 				phone: "",
// 				type: ""
// 			}
// 		],
// 		emails: [						// OPICIONAL
// 			{
// 				email: "",
// 				type: ""
// 			}
// 		],
// 		address: [						// OPICIONAL
// 			{
// 				street: "",
// 				city: "",
// 				zip: "",
// 				country: "",
// 				country_code: "",
// 				type: ""
// 			}
// 		],
// 		urls: [							// OPICIONAL
// 			{
// 				url: "",
// 				type: ""
// 			}
// 		],
// 		org: {							// OPICIONAL
// 			company: "",
// 			departament: "",
// 			title: ""
// 		}
// 	}
// ]