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