import Error from "./schemas/error.js";

/**
 * @author VAMPETA
 * @brief FUNCAO CRIADA PARA SALVAR MENSAGENS DE IMAGENS ENVIADAS NO MONGODB
 * @param idPhone IDENTIFICADOR DO NUMERO DE TELEFONE DO BOT
 * @param error MENSAGEM DE ERRO
*/
export default async function saveError(idPhone, error) {
	try {
		console.log(error);
		await Error.create({
			idPhone: idPhone,
			error: error
		});
	} catch (error) {
		console.log("Não foi possivel salver o erro no banco de dados");
		console.log(err);
	}
}