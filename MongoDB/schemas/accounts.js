import mongoose from "mongoose";

const accounts = new mongoose.Schema({
	phone: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	idPhone: {
		type: String,
		required: true,
		unique: true
	},
	accessToken: {
		type: String,
		required: true,
		unique: true
	},
	messageNotSupported: {
		type: String,
		required: true
	},
	spreadsheet: {
		type: String,
		unique: true
	}
});

export default mongoose.model("account", accounts);