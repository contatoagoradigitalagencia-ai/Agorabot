import mongoose from "mongoose";

const accounts = new mongoose.Schema({
	phone: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	idPhone: {
		type: String,
		require: true,
		unique: true
	},
	accessToken: {
		type: String,
		require: true,
		unique: true
	},
	messageNotSupported: {
		type: String,
		require: true
	}
});

const lastMessage = new mongoose.Schema(
	{
		text: String,
		type: {
			type: String,
			require: true
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
			default: "sending"
		}
	},
	{ _id: false }
);
const chats = new mongoose.Schema({
	idPhone: {
		type: String,
		require: true
	},
	photo: {
		type: String,
		default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT548e7yKxVzd9AoGwcjuciTV94wTtuZPzyC_-kWy3r&s"
	},
	phone: {
		type: String,
		required: true
	},
	name: {
		type: String,
		default: ""
	},
	lastMessage: lastMessage
});

const image = new mongoose.Schema(
	{
		link: {
			type: String,
			require: true
		},
		caption: {
			type: String,
			require: false
		}
	},
	{ _id: false }
);
const messages = new mongoose.Schema({
	idPhone: {
		type: String,
		require: true
	},
	phone: {
		type: String,
		required: true
	},
	wamid: {
		type: String,
		require: true,
		unique: true
	},
	direction: {
		type: String,
		require: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		default: "sending"
	},
	type: {
		type: String,
		require: true
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

const error = new mongoose.Schema({
	idPhone: {
		type: String,
		require: true
	},
	error: {
		type: String,
		require: true
	}
});

const Account = mongoose.model("account", accounts);
const Chat = mongoose.model("chat", chats);
const Message = mongoose.model("message", messages);
const Error = mongoose.model("error", error);

export { Account, Chat, Message, Error };