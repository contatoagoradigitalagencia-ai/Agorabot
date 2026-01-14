import read from "./methods/read.js";
import reaction from "./methods/reaction.js";
import text from "./methods/text.js";
import image from "./methods/image.js";
import video from "./methods/video.js";
import location from "./methods/location.js";
import contacts from "./methods/contacts.js";
import button from "./methods/button.js";
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
		this.reaction = reaction.bind(this);
		this.text = text.bind(this);
		this.image = image.bind(this);
		this.video = video.bind(this);
		this.location = location.bind(this);
		this.contacts = contacts.bind(this);
		this.button = button.bind(this);
		this.list = list.bind(this);
	}
};