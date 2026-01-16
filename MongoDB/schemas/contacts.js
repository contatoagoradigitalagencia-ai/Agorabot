import mongoose from "mongoose";

const contacts = new mongoose.Schema({
	idPhone: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	name: {
		type: String,
		default: ""
	}
});

contacts.index({ idPhone: 1, phone: 1 }, { unique: true });

export default mongoose.model("contact", contacts);