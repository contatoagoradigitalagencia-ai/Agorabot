import { Error } from "./schema.js";

export default async function saveError(idPhone, error) {
	try {
		console.log("Erro encontrado:", error);
		await Error.create({
			idPhone: idPhone,
			error: error
		});
	} catch (error) {
		console.log("Não foi possivel salver o erro no banco de dados");
		console.log(err);
	}
}