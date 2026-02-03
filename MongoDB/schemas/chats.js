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
			default: Date.now
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
	// photo: {		// FOTO DO USUARIO (DESCONTINUADO PQ NAO TENHO COMO OBTER ELA)
	// 	type: String,
	// 	default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT548e7yKxVzd9AoGwcjuciTV94wTtuZPzyC_-kWy3r&s"
	// },
	// name: {		// NAO E GARANTIDO O NOME DO USUARIO ESTAR DISPONIVEL
	// 	type: String,
	// 	default: ""
	// },
	lastMessage: lastMessage
});

chats.index({ idPhone: 1, phone: 1 }, { unique: true });

export default mongoose.model("chat", chats);