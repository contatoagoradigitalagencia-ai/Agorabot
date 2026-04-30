import mongoose from "mongoose";

const text = new mongoose.Schema(
	{
		body: {
			type: String,
			required: true
		}
	},
	{ _id: false }
);

const audio = new mongoose.Schema(
	{
		link: {
			type: String,
			required: true
		},
		voice: {
			type: Boolean,
			required: true
		}
	},
	{ _id: false }
);

const image = new mongoose.Schema(
	{
		link: {
			type: String,
			required: true
		},
		caption: {
			type: String,
			required: false
		}
	},
	{ _id: false }
);

const location = new mongoose.Schema(
	{
		name: {
			type: String,
			required: false
		},
		address: {
			type: String,
			required: false
		},
		latitude: {
			type: Number,
			required: true
		},
		longitude: {
			type: Number,
			required: true
		}
	},
	{ _id: false }
);

const document = new mongoose.Schema(
	{
		link: {
			type: String,
			required: true
		},
		filename: {
			type: String,
			required: true
		},
		caption: {
			type: String,
			required: false
		}
	},
	{ _id: false }
);

const message = new mongoose.Schema(
	{
		type: {
			type: String,
			required: true,
			enum: ["text", "audio", "image", "document", "location"]
		},
		text: {
			type: text,
			required: function () {
				return (this.type === "text");
			}
		},
		audio: {
			type: audio,
			required: function () {
				return (this.type === "audio");
			}
		},
		image: {
			type: image,
			required: function () {
				return (this.type === "image");
			}
		},
		location: {
			type: location,
			required: function () {
				return (this.type === "location");
			}
		},
		document: {
			type: document,
			required: function () {
				return (this.type === "document");
			}
		}
	},
	{ _id: false }
);

const quickMessages = new mongoose.Schema({
	idPhone: {
		type: String,
		required: true,
		index: true
	},
	name: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
	message: message
});

quickMessages.index({ idPhone: 1, timestamp: -1 });
quickMessages.index({ idPhone: 1, "message.type": 1, timestamp: -1 });

export default mongoose.model("quick_messages", quickMessages);