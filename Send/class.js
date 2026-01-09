import read from "./methods/read.js";
import text from "./methods/text.js";
import image from "./methods/image.js";
import list from "./methods/list.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR METODOS DE ENVIO DE MENSAGENS
*/
export default class Send {
	mongodb = null;

	constructor(mongodb) {
		this.mongodb = mongodb;
		this.read = read.bind(this);
		this.text = text.bind(this);
		this.image = image.bind(this);
		this.list = list.bind(this);
	}
};