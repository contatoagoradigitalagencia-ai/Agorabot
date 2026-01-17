import groq from "../Groq/Groq.js";

/**
 * @author VAMPETA
 * @brief INICIA A CONEXAO COM A IA DA GROQ
*/
export default async function connectGroq() {
	try {
		await groq.connect();
	} catch (error) {
		console.log("\x1b[33mErro ao conectar a Groq\x1b[0m\n", error);
		process.exit(1);
	}
}