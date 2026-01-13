import mongoose from "mongoose";

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

// const arrayList = new mongoose.Schema(
// 	{
// 		id: {
// 			type: String,
// 			required: true
// 		},
// 		title: {
// 			type: String,
// 			required: true
// 		},
// 		description: {
// 			type: String,
// 			required: true
// 		}
// 	},
// 	{ _id: false }
// );

// const list = new mongoose.Schema(
// 	{
// 		header: {
// 			type: Object
// 		},
// 		body: {
// 			type: Object,
// 			required: true
// 		},
// 		footer: {
// 			type: Object
// 		},
// 		button: {
// 			type: String,
// 			required: true
// 		},
// 		list: {
// 			type: [arrayList],
// 			required: true
// 		}
// 	},
// 	{ _id: false }
// );

// const arrayButton = new mongoose.Schema(
// 	{
// 		id: {
// 			type: String,
// 			required: true
// 		},
// 		title: {
// 			type: String,
// 			required: true
// 		}
// 	},
// 	{ _id: false }
// );

// const button = new mongoose.Schema(
// 	{
// 		header: {
// 			type: Object
// 		},
// 		text: {
// 			type: String,
// 			required: true
// 		},
// 		buttons: {
// 			type: [arrayButton],
// 			required: true
// 		}
// 	},
// 	{ _id: false }
// );

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
		required: true
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
	// type: {						// REMOVER DPS QUE TUDO FOR PASSADO PARA data
	// 	type: String,
	// 	// required: true
	// },
	react: {
		type: String
	},
	data: {
		type: Object,
		required: true		// ATIVAR DPS DE TUDO PRONTO
	},
	// text: {
	// 	type: String,
	// 	default: undefined
	// },
	// image: image,
	// list: list,
	// button: button,
	// location: {
	// 	type: Object,
	// 	default: undefined
	// },
	// contact: {
	// 	type: Object,
	// 	default: undefined
	// }
});

message.index({ wamid: 1 }, { unique: true });

export default mongoose.model("message", message);