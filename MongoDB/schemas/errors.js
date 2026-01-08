import mongoose from "mongoose";

const error = new mongoose.Schema({
	idPhone: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
	error: {
		type: String,
		required: true
	}
});

export default mongoose.model("error", error);