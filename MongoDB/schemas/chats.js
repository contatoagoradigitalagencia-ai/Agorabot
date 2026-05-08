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
			default: Date.now,
			index: true
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
	lastMessage: lastMessage
});

chats.index({ idPhone: 1, phone: 1 }, { unique: true });
chats.index({ idPhone: 1, "lastMessage.timestamp": -1 });

export default mongoose.model("chat", chats);