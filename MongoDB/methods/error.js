/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA SALVAR MENSAGENS DE ERRO NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param error MENSAGEM DE ERRO
*/
export async function saveError(idPhone, error) {
	try {
		console.log(error);
		await this.Error.create({
			idPhone: idPhone,
			error: error
		});
	} catch (error) {
		console.log("Não foi possivel salvar o erro no banco de dados");
		console.log(error);
	}
}