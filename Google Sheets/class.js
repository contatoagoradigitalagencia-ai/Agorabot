import connect from "./methods/connect.js";
import getPages from "./methods/getPages.js";
import getPageJson from "./methods/getPageJson.js";
import getPageTable from "./methods/getPageTable.js";

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
		this.getPages = getPages.bind(this);
		this.getPageJson = getPageJson.bind(this);
		this.getPageTable = getPageTable.bind(this);
	}
};