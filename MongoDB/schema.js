// import mongoose from "mongoose";

// const accounts = new mongoose.Schema({
// 	phone: {
// 		type: String,
// 		required: true,
// 		unique: true
// 	},
// 	password: {
// 		type: String,
// 		required: true
// 	},
// 	idPhone: {
// 		type: String,
// 		required: true,
// 		unique: true
// 	},
// 	accessToken: {
// 		type: String,
// 		required: true,
// 		unique: true
// 	},
// 	messageNotSupported: {
// 		type: String,
// 		required: true
// 	}
// });

// const lastMessage = new mongoose.Schema(
// 	{
// 		text: String,
// 		type: {
// 			type: String,
// 			required: true
// 		},
// 		timestamp: {
// 			type: Date,
// 			default: Date.now
// 		},
// 		humanViewed: {
// 			type: Boolean,
// 			default: false
// 		},
// 		status: {
// 			type: String,
// 			default: undefined
// 		}
// 	},
// 	{ _id: false }
// );
// const chats = new mongoose.Schema({
// 	idPhone: {
// 		type: String,
// 		required: true
// 	},
// 	phone: {
// 		type: String,
// 		required: true
// 	},
// 	photo: {
// 		type: String,
// 		default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT548e7yKxVzd9AoGwcjuciTV94wTtuZPzyC_-kWy3r&s"
// 	},
// 	name: {
// 		type: String,
// 		default: ""
// 	},
// 	lastMessage: lastMessage
// });

// const image = new mongoose.Schema(
// 	{
// 		link: {
// 			type: String,
// 			required: true
// 		},
// 		caption: {
// 			type: String,
// 			required: false
// 		}
// 	},
// 	{ _id: false }
// );
// const messages = new mongoose.Schema({
// 	idPhone: {
// 		type: String,
// 		required: true
// 	},
// 	phone: {
// 		type: String,
// 		required: true
// 	},
// 	wamid: {
// 		type: String,
// 		required: true,
// 		unique: true
// 	},
// 	direction: {
// 		type: String,
// 		required: true
// 	},
// 	timestamp: {
// 		type: Date,
// 		default: Date.now
// 	},
// 	status: {
// 		type: String,
// 		default: undefined
// 	},
// 	type: {
// 		type: String,
// 		required: true
// 	},
// 	text: {
// 		type: String,
// 		default: undefined
// 	},
// 	image: image,
// 	// location: {
// 	// 	type: Object,
// 	// 	default: undefined
// 	// },
// 	// contact: {
// 	// 	type: Object,
// 	// 	default: undefined
// 	// },
// 	// button: {
// 	// 	type: Object,
// 	// 	default: undefined
// 	// }
// });

// const error = new mongoose.Schema({
// 	idPhone: {
// 		type: String,
// 		required: true
// 	},
// 	error: {
// 		type: String,
// 		required: true
// 	}
// });

// const Account = mongoose.model("account", accounts);
// const Chat = mongoose.model("chat", chats);
// const Message = mongoose.model("message", messages);
// const Error = mongoose.model("error", error);

// export { Account, Chat, Message, Error };