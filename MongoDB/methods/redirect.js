/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR O ESTADO SE O REDIRECIONAMENTO DO BOT ESTA LIGADO OU DESLIGADO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {Boolean} status NOVO ESTADO DE REDIRECIONAMENTO DO BOT SE LIGADO OU NAO
*/
export async function updateStateRedirect(idPhone, status) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$set: {
					"bot.redirect.activated": status
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "updateStateRedirect": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ATUALIZAR A ORDEM DOS CONTATOS (USADO PARA DEFINIR QUAL O PROCIMO NUMERO A SER ENCAMINHADO PARA ATENDIMENTO HUMANO)
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
*/
export async function updateRedirect(idPhone) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			[
				{
					$set: {
						"bot.redirect.numbers": {
							$cond: {
								if: {
									$gt: [{ $size: "$bot.redirect.numbers" }, 1]
								},
								then: {
									$concatArrays: [
										{
											$slice: ["$bot.redirect.numbers", 1, { $size: "$bot.redirect.numbers" }]
										},
										[
											{
												$arrayElemAt: ["$bot.redirect.numbers", 0]
											}
										]
									]
								},
								else: "$bot.redirect.numbers"
							}
						}
					}
				}
			],
			{ updatePipeline: true }
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "updateRedirect": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR NOVOS ATENDENTES QUE VAO ATENDER OS CLIENTES REDIRECIONADOS
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE SERA ADICIONADO A LISTA DE ATENDENTES
*/
export async function saveRedirect(idPhone, phone) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$addToSet: {
					"bot.redirect.numbers": phone
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveRedirect": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA REMOVER ATENDENTE DA LISTA DE ATENDENTES
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE SERA ADICIONADO A LISTA DE ADM
*/
export async function removeRedirect(idPhone, phone) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$pull: {
					"bot.redirect.numbers": phone
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "removeRedirect": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA ATUALIZAR ATENDENTES DA LISTA DE ATENDENTES
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {Number<String>} numbers ARRAY COM NUMEROS DE REDIRECIONAMENTO
*/
export async function newRedirect(idPhone, numbers) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$set: {
					"bot.redirect.numbers": numbers
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "newRedirect": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO CRIADO PARA SALVAR MENSAGEM DE REDIRECIONAMENTO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} messsage MENSAGEM DE REDIRECIONAMENTO
*/
export async function saveMessageRedirect(idPhone, messsage) {
	try {
		await this.Account.updateOne(
			{
				idPhone: idPhone
			},
			{
				$set: {
					"bot.redirect.message": messsage
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveMessageRedirect": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO QUE MARCA NO CONTATO QUE ELE DESEJA ATENDIMENTO HUMANO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE PEDIU ATENDIMENTO HUMANO
*/
export async function saveHumanService(idPhone, phone) {
	try {
		await this.Contact.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					bot: false,
					"humanService.waiting": true,
					"humanService.timestamp": new Date()
				},
				$inc: {
					"humanService.requestCount": 1
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "saveHumanService": ${error}`);
	}
}

/**
 * @author VAMPETA
 * @brief METODO QUE DESMARCA NO CONTATO QUE ELE DESEJA ATENDIMENTO HUMANO
 * @param {String} idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param {String} phone NUMERO QUE PEDIU ATENDIMENTO HUMANO
*/
export async function removeHumanService(idPhone, phone) {
	try {
		await this.Contact.updateOne(
			{
				idPhone: idPhone,
				phone: phone
			},
			{
				$set: {
					bot: true,
					"humanService.waiting": false
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "removeHumanService": ${error}`);
	}
}