import mongoose from "mongoose";

const lastMessage = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		timestamp: {
			type: Date,
			default: Date.now
		},
		humanViewed: {
			type: Boolean,
			default: false
		},
		status: {
			type: String,
			default: undefined
		}
	},
	{ _id: false }
);

const chats = new mongoose.Schema({
	idPhone: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	lastMessage: lastMessage,
	stateBot: {
		type: Boolean,
		default: true
	}
});

chats.index({ idPhone: 1, phone: 1 }, { unique: true });

export default mongoose.model("chat", chats);