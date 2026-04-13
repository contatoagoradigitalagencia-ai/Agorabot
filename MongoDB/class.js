import { connect } from "./methods/connect.js";
import { saveAdm, removeAdm } from "./methods/adm.js";
import { saveContact } from "./methods/contact.js";
import { saveMessageNotSupported } from "./methods/updateMessageNotSupported.js";
import { saveMessageNewContact } from "./methods/updateMessageNewContact.js";
import { savePrompt } from "./methods/prompt.js";
import { addSpreadsheets, removeSpreadsheets } from "./methods/spreadsheets.js";
import { saveLocation } from "./methods/updateLocation.js";
import { saveVisualization } from "./methods/visualization.js";
import { saveWamid } from "./methods/wamid.js";
import { saveReactionReceived, saveReactionSent } from "./methods/reaction.js";
import { saveTextReceived, saveTextSent } from "./methods/text.js";
import { saveStickerReceived, saveStickerSent } from "./methods/sticker.js";
import { saveAudioReceived, saveAudioSent } from "./methods/audio.js";
import { saveImageReceived, saveImageSent } from "./methods/image.js";
import { saveVideoReceived, saveVideoSent } from "./methods/video.js";
import { saveLocationReceived, saveLocationSent } from "./methods/location.js";
import { saveContactsReceived, saveContactsSent } from "./methods/contacts.js";
import { saveDocumentReceived, saveDocumentSent } from "./methods/document.js";
import { saveButtonSent } from "./methods/button.js";
import { saveListSent } from "./methods/list.js";
import { updateRedirect, saveRedirect, removeRedirect, newRedirect } from "./methods/redirect.js";
import { saveStateBot, updateStateBot } from "./methods/configChat.js";
import { saveHumanView } from "./methods/humanViewed.js";
import { saveError } from "./methods/error.js";
import { saveMetricMessage, saveMetricNewContact, saveMetricRedirect } from "./methods/metric.js";
import { saveComment } from "./methods/comment.js";

/**
 * @author VAMPETA
 * @brief CLASSE CRIADA PARA GERENCIAR A CONEXAO COM O MONGODB
*/
export default class Mongodb {
	mongodb = null;
	Account = null;
	Chat = null;
	Contact = null;
	Error = null;
	Message = null;
	QuickMessage = null;
	Metric = null;

	constructor() {
		this.connect = connect.bind(this);
		this.saveContact = saveContact.bind(this);

		this.saveAdm = saveAdm.bind(this);
		this.removeAdm = removeAdm.bind(this);
		this.saveMessageNotSupported = saveMessageNotSupported.bind(this);
		this.saveMessageNewContact = saveMessageNewContact.bind(this);
		this.savePrompt = savePrompt.bind(this);
		this.addSpreadsheets = addSpreadsheets.bind(this);
		this.removeSpreadsheets = removeSpreadsheets.bind(this);
		this.saveLocation = saveLocation.bind(this);
		this.saveRedirect = saveRedirect.bind(this);
		this.removeRedirect = removeRedirect.bind(this);
		this.newRedirect = newRedirect.bind(this);
		
		this.saveWamid = saveWamid.bind(this);
		this.saveVisualization = saveVisualization.bind(this);
		this.saveReactionReceived = saveReactionReceived.bind(this);
		this.saveReactionSent = saveReactionSent.bind(this);
		this.saveTextReceived = saveTextReceived.bind(this);
		this.saveTextSent = saveTextSent.bind(this);
		this.saveStickerReceived = saveStickerReceived.bind(this);
		this.saveStickerSent = saveStickerSent.bind(this);
		this.saveAudioReceived = saveAudioReceived.bind(this);
		this.saveAudioSent = saveAudioSent.bind(this);
		this.saveImageReceived = saveImageReceived.bind(this);
		this.saveImageSent = saveImageSent.bind(this);
		this.saveVideoReceived = saveVideoReceived.bind(this);
		this.saveVideoSent = saveVideoSent.bind(this);
		this.saveLocationReceived = saveLocationReceived.bind(this);
		this.saveLocationSent = saveLocationSent.bind(this);
		this.saveContactsReceived = saveContactsReceived.bind(this);
		this.saveContactsSent = saveContactsSent.bind(this);
		this.saveDocumentReceived = saveDocumentReceived.bind(this);
		this.saveDocumentSent = saveDocumentSent.bind(this);
		this.saveButtonSent = saveButtonSent.bind(this);
		this.saveListSent = saveListSent.bind(this);

		this.updateRedirect = updateRedirect.bind(this);
		this.saveStateBot = saveStateBot.bind(this);
		this.updateStateBot = updateStateBot.bind(this);
		this.saveHumanView = saveHumanView.bind(this);

		this.saveError = saveError.bind(this);
		this.saveMetricMessage = saveMetricMessage.bind(this);
		this.saveMetricNewContact = saveMetricNewContact.bind(this);
		this.saveMetricRedirect = saveMetricRedirect.bind(this);

		this.saveComment = saveComment.bind(this);
	}
};