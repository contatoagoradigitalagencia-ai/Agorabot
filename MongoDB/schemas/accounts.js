import mongoose from "mongoose";

const account = new mongoose.Schema({
	phone: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	idPhone: {
		type: String,
		required: true
	},
	accessToken: {
		type: String,
		required: true
	},
	adm: {
		type: [String],
		required: true
	},
	spreadsheet: {
		type: String
	},
	messageNotSupported: {
		type: String,
		required: true
	}
});

account.index({ phone: 1 }, { unique: true });
account.index({ idPhone: 1 }, { unique: true });
account.index({ accessToken: 1 }, { unique: true });
account.index({ spreadsheet: 1 }, { unique: true, sparse: true });

export default mongoose.model("account", account);