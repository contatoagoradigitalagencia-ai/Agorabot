import mongodb from "../../../../MongoDB/Mongodb.js";
import bcrypt from "bcrypt";

/**
 * @author VAMPETA
 * @brief ALTERA A SENHA DO USUARIO
 * @param {Object} socket OBJETO SOCKET DO CLIENTE
 * @param {Object} data DADOS ENVIADO PELO CLIENTE
 * @param {Object} callback FUNCAO DE RESPOSTA
*/
export async function updatePassword(socket, data, callback) {
	const { idPhone } = socket.account;
	const { password, newPassword } = data || {};

	try {
		if (data == null || typeof data !== "object" || Array.isArray(data)) return (callback({ code: 400, error: "O payload deve ser um objeto" }));
		if (!password || typeof password !== "string") return (callback({ code: 400, error: 'O campo "password" deve ser do tipo string e não deve estar vazio' }));
		if (!newPassword || typeof newPassword !== "string") return (callback({ code: 400, error: 'O campo "newPassword" deve ser do tipo string e não deve estar vazio' }));
		const hashPassword = await mongodb.Account.findOne({ idPhone }, { "login.password": 1, _id: 0 }).lean();
		if (!(await bcrypt.compare(password, hashPassword.login.password))) return (callback({ code: 401, error: "Senha antiga incorreta" }));
		const hashNewPassword = await bcrypt.hash(newPassword, 10);
		await mongodb.saveNewPassword(idPhone, hashNewPassword);
		callback({ code: 204 });
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updatePassword": ${error}`);
		callback({ code: 500, error: "Erro interno do servidor" });
	}
}