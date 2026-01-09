import connect from "./methods/connect.js";
import getPage from "./methods/getPage.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR A CONEXAO COM O GOOGLE SHEETS
*/
export default class GoogleSheets {
	googleSheets = null;
	mongodb = null;

	constructor(mongodb) {
		this.mongodb = mongodb;
		this.connect = connect.bind(this);
		this.getPage = getPage.bind(this);
	}
};