import { connect } from "./methods/connect.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR A CONEXAO COM A IA DA GROQ
*/
export default class Groq {
	groq = null;

	constructor() {
		this.connect = connect.bind(this);
	}
};