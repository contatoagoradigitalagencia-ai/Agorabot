import mongoose from "mongoose";

const humaneService = new mongoose.Schema(
	{
		waiting: {
			type: Boolean,
			default: false
		},
		timestamp: {
			type: Date,
			default: Date.now
		},
		requestCount: {
			type: Number,
			default: 0
		}
	},
	{ _id: false }
);

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
	},
	lastMessage: {
		type: Date,
		default: Date.now
	},
	comment: {
		type: String,
		default: ""
	},
	bot: {
		type: Boolean,
		default: true
	},
	humaneService: {
		type: humaneService,
		default: () => ({})
	}
});

contacts.index({ idPhone: 1, phone: 1 }, { unique: true });

export default mongoose.model("contact", contacts);