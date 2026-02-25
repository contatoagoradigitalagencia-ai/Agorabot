import mongoose from "mongoose";

const login = new mongoose.Schema({
	password: {
		type: String,
		default: "123"
	},
	token: {
		type: [String],
		default: []
	}
});

const bot = new mongoose.Schema({
	messageNotSupported: {
		type: String,
		default: ""
	},
	model: {
		type: String,
		required: true
	},
	prompt: {
		type: String,
		default: ""
	},
	historySize: {
		type: Number,
		required: true
	},
	maxTokens: {
		type: Number,
		required: true
	},
	location: {
		latitude: Number,
		longitude: Number,
		name: String,
		address: String
	},
	redirect: {
		type: [String]
	}
});

const googleSheets = new mongoose.Schema({
	spreadsheet: {
		type: String,
		required: true
	},
	pages: {
		type: [String],
		default: []
	}
});

const account = new mongoose.Schema({
	phone: {
		type: String,
		required: true
	},
	idPhone: {
		type: String,
		required: true
	},
	login: login,
	accessToken: {
		type: String,
		required: true
	},
	adm: {
		type: [String],
		required: true
	},
	googleSheets: {
		type: googleSheets,
		required: true
	},
	bot: {
		type: bot,
		required: true
	}
});

account.index({ phone: 1 }, { unique: true });
account.index({ idPhone: 1 }, { unique: true });
account.index({ accessToken: 1 }, { unique: true });
account.index({ "googleSheets.spreadsheet": 1 }, { unique: true, sparse: true });

export default mongoose.model("account", account);