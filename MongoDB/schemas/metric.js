import mongoose from "mongoose";

const messageTypes = new mongoose.Schema(
	{
		reaction: {
			type: Number,
			default: 0
		},
		text: {
			type: Number,
			default: 0
		},
		sticker: {
			type: Number,
			default: 0
		},
		audio: {
			type: Number,
			default: 0
		},
		image: {
			type: Number,
			default: 0
		},
		video: {
			type: Number,
			default: 0
		},
		location: {
			type: Number,
			default: 0
		},
		contacts: {
			type: Number,
			default: 0
		},
		document: {
			type: Number,
			default: 0
		},
		button: {
			type: Number,
			default: 0
		}
	},
	{ _id: false }
);

const metric = new mongoose.Schema({
	idPhone: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		required: true
	},
	sent: messageTypes,
	received: messageTypes,
	failed: messageTypes,
	newContacts: {
		type: Number,
		default: 0
	},
	hourly: {
		type: Map,
		of: Number,
		default: {}
	},
	redirects: {
		type: Number,
		default: 0
	}
});

metric.index({ idPhone: 1, timestamp: 1 });

export default mongoose.model("metric", metric);