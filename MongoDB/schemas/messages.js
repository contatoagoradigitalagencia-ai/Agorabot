import mongoose from "mongoose";

const message = new mongoose.Schema({
	idPhone: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	wamid: {
		type: String,
		required: true
	},
	direction: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		default: undefined
	},
	react: {
		type: String
	},
	context: {
		type: Object
	},
	data: {
		type: Object
	}
});

message.index({ wamid: 1 }, { unique: true });

export default mongoose.model("message", message);