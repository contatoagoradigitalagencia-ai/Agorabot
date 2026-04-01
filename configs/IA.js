import IA from "../IA/IA.js";

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM A IA
*/
export default async function connectIA() {
	try {
		await IA.groq.connect();
	} catch (error) {
		console.log("\x1b[33mErro ao conectar a IA\x1b[0m\n", error);
		process.exit(1);
	}
}