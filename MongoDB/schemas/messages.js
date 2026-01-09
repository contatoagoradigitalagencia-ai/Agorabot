import mongoose from "mongoose";

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

const arrayList = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		}
	},
	{ _id: false }
);

const list = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true
		},
		button: {
			type: String,
			required: true
		},
		list: {
			type: [arrayList],
			required: true
		}
	},
	{ _id: false }
);

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
		required: true,
		unique: true
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
	type: {
		type: String,
		required: true
	},
	text: {
		type: String,
		default: undefined
	},
	image: image,
	list: list,
	// location: {
	// 	type: Object,
	// 	default: undefined
	// },
	// contact: {
	// 	type: Object,
	// 	default: undefined
	// },
	// button: {
	// 	type: Object,
	// 	default: undefined
	// }
});

export default mongoose.model("message", message);