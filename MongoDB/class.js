import { connect } from "./methods/connect.js";
import { saveAdm, removeAdm } from "./methods/adm.js";
import { saveContact } from "./methods/contact.js";
import { saveMessageNotSupported } from "./methods/messageNotSupported.js";
import { savePrompt } from "./methods/prompt.js";
import { saveSpreadsheets, removeSpreadsheets } from "./methods/spreadsheets.js";
import { saveVisualization } from "./methods/visualization.js";
import { saveWamid } from "./methods/wamid.js";
import { saveReactionReceived, saveReactionSent } from "./methods/reaction.js";
import { saveTextReceived, saveTextSent } from "./methods/text.js";
import { saveImageSent } from "./methods/image.js";
import { saveVideoSent } from "./methods/video.js";
import { saveLocationSent } from "./methods/location.js";
import { saveContactsSent } from "./methods/contacts.js";
import { saveButtonSent } from "./methods/button.js";
import { saveListSent } from "./methods/list.js";
import { updateRedirect, saveRedirect, removeRedirect } from "./methods/redirect.js";
import { saveStateBot } from "./methods/configChat.js";
import { saveHumanView } from "./methods/humanViewed.js";
import { saveError } from "./methods/error.js";

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
    QuickMessage = null;

    constructor() {
        this.connect = connect.bind(this);
        this.saveContact = saveContact.bind(this);
        this.saveAdm = saveAdm.bind(this);
        this.removeAdm = removeAdm.bind(this);
        this.saveMessageNotSupported = saveMessageNotSupported.bind(this);
        this.savePrompt = savePrompt.bind(this);
        this.saveSpreadsheets = saveSpreadsheets.bind(this);
        this.removeSpreadsheets = removeSpreadsheets.bind(this);
        this.saveRedirect = saveRedirect.bind(this);
        this.removeRedirect = removeRedirect.bind(this);
        this.saveVisualization = saveVisualization.bind(this);
        this.saveWamid = saveWamid.bind(this);
        this.saveReactionReceived = saveReactionReceived.bind(this);
        this.saveReactionSent = saveReactionSent.bind(this);
        this.saveTextReceived = saveTextReceived.bind(this);
        this.saveTextSent = saveTextSent.bind(this);
        this.saveImageSent = saveImageSent.bind(this);
        this.saveVideoSent = saveVideoSent.bind(this);
        this.saveLocationSent = saveLocationSent.bind(this);
        this.saveContactsSent = saveContactsSent.bind(this);
        this.saveButtonSent = saveButtonSent.bind(this);
        this.saveListSent = saveListSent.bind(this);
        this.updateRedirect = updateRedirect.bind(this);
        this.saveStateBot = saveStateBot.bind(this);
        this.saveHumanView = saveHumanView.bind(this);
        this.saveError = saveError.bind(this);
    }
};