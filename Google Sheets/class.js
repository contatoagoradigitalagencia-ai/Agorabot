import connect from "./methods/connect.js";
import { getPages } from "./methods/getPages.js";
import { getPageJson, getPageJsonText, getPageTable } from "./methods/getPage.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR A CONEXAO COM O GOOGLE SHEETS
*/
export default class GoogleSheets {
	googleSheets = null;

	constructor() {
		this.connect = connect.bind(this);
		this.getPages = getPages.bind(this);
		this.getPageJson = getPageJson.bind(this);
		this.getPageJsonText = getPageJsonText.bind(this);
		this.getPageTable = getPageTable.bind(this);
	}
};