import { connect } from "./methods/connect.js";
import { saveStatusMessage } from "./methods/statusMessage.js";
import { saveTextReceived, saveTextSent } from "./methods/text.js";
import { saveImageSent } from "./methods/image.js";
import { saveListSent } from "./methods/list.js";
import { saveError } from "./methods/Error.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR A CONEXAO COM O MONGODB
*/
export default class Mongodb {
    mongodb = null;
    Account = null;
    Chat = null;
    Contacts = null;
    Error = null;
    Message = null;

    constructor() {
        this.connect = connect.bind(this);
        this.saveStatusMessage = saveStatusMessage.bind(this);
        this.saveTextReceived = saveTextReceived.bind(this);
        this.saveTextSent = saveTextSent.bind(this);
        this.saveImageSent = saveImageSent.bind(this);
        this.saveListSent = saveListSent.bind(this);
        this.saveError = saveError.bind(this);
    }
};