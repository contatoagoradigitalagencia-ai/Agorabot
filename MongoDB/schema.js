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
	meta: {
		identificacao_do_numero_de_telefone: {
			type: String,
			required: true,
		},
		access_token: {
			type: String,
			required: true,
		},
		chave_secreta_do_aplicativo: {
			type: String,
			required: true,
		}
	}
});

const lastMessage = new mongoose.Schema(
	{
		text: String,
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
	photo: {
		type: String,
		default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT548e7yKxVzd9AoGwcjuciTV94wTtuZPzyC_-kWy3r&s"
	},
	phone: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		default: ""
	},
	lastMessage: lastMessage
});

const messages = new mongoose.Schema({
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
		default: undefined
	},
	type: {
		type: String,
		require: true
	},
	text: {
		type: String,
		default: undefined
	},
	// image: {
	// 	type: String,
	// 	default: undefined
	// },
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

const Account = mongoose.model("account", accounts);
const Chat = mongoose.model("chat", chats);
const Message = mongoose.model("message", messages);

export { Account, Chat, Message };