import Groq from "groq-sdk";

/**
 * @author VAMPETA
 * @brief METODO QUE INICIA A CONEXAO COM A IA DA GROQ
*/
export default async function connect() {
	if (this.groq) return ;
	this.groq = new Groq({ apiKey: process.env.GROQ_APY_KEY });
}