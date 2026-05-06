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
message.index({ idPhone: 1, timestamp: 1 });
message.index({ idPhone: 1, direction: 1, timestamp: 1 });

export default mongoose.model("message", message);