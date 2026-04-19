import mongoose from "mongoose";

const message = new mongoose.Schema(
	{
		type: {
			type: String,
			required: true
		},
		text: Object,
		location: Object
	},
	{ _id: false }
);

const quickMessages = new mongoose.Schema({
	idPhone: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		required: true
	},
	message: message
});

export default mongoose.model("quick_messages", quickMessages);