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
	const { password, newPassword } = data;

	try {
		if (!password || typeof password !== "string") return (callback({ error: 'O campo "password" deve ser do tipo string e não vazio' }));
		if (!newPassword || typeof newPassword !== "string") return (callback({ error: 'O campo "newPassword" deve ser do tipo string e não vazio' }));
		const hashPassword = await mongodb.Account.findOne({ idPhone }, { "login.password": 1, _id: 0 });
		if (!(await bcrypt.compare(password, hashPassword.login.password))) return (callback({ error: "Senha antiga incorreta!" }));
		const hashNewPassword = await bcrypt.hash(newPassword, 10);
		await mongodb.saveNewPassword(idPhone, hashNewPassword);
		callback(204);
	} catch (error) {
		await mongodb.saveError(idPhone, `Error no metodo "updatePassword": ${error}`);
	}
}