import connect from "./methods/connect.js";
import { upload, uploadQuickMessage } from "./methods/upload.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR A CONEXAO COM O CLOUDFLARE R2
*/
export default class CloudflareR2 {
	cloudflareR2 = null;

	constructor() {
		this.connect = connect.bind(this);
		this.upload = upload.bind(this);
		this.uploadQuickMessage = uploadQuickMessage.bind(this);
	}
};