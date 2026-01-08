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