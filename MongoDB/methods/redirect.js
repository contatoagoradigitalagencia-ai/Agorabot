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
						"bot.redirect": {
							$cond: {
								if: {
									$gt: [{ $size: "$bot.redirect" }, 1]
								},
								then: {
									$concatArrays: [
										{
											$slice: ["$bot.redirect", 1, { $size: "$bot.redirect" }]
										},
										[
											{
												$arrayElemAt: ["$bot.redirect", 0]
											}
										]
									]
								},
								else: "$bot.redirect"
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
					"bot.redirect": phone
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
					"bot.redirect": phone
				}
			}
		);
	} catch (error) {
		await this.saveError(idPhone, `Error no metodo "removeRedirect": ${error}`);
	}
}