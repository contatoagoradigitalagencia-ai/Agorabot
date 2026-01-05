import mongoose from "mongoose";

const error = new mongoose.Schema({
	idPhone: {
		type: String,
		required: true
	},
	error: {
		type: String,
		required: true
	}
});

export default mongoose.model("error", error);