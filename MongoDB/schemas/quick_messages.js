import mongoose from "mongoose";

// const text = new mongoose.Schema();
// const image = new mongoose.Schema();
// const location = new mongoose.Schema();

const message = new mongoose.Schema(
	{
		type: {
			type: String,
			required: true
		},
		text: Object,
		image: Object,
		location: Object
	},
	{ _id: false }
);

const quickMessages = new mongoose.Schema({
	idPhone: {
		type: String,
		required: true
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

export default mongoose.model("quick_messages", quickMessages);