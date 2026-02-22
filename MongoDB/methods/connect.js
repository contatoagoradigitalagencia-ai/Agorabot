import mongoose from "mongoose";

import Account from "../schemas/accounts.js"
import Chat from "../schemas/chats.js"
import Contact from "../schemas/contacts.js"
import Error from "../schemas/errors.js";
import Message from "../schemas/messages.js"
import QuickMessage from "../schemas/quick_messages.js";

/**
 * @author VAMPETA
 * @brief METODO QUE INICIA A CONEXAO COM O MONGODB
*/
export async function connect() {
	if (this.mongodb) return ;
	if (mongoose.connection.readyState === 1) return ;
	this.mongodb = await mongoose.connect(process.env.MONGO_URI);
	mongoose.connection.on("disconnected", () => console.log("\x1b[31mMongoDB desconectado\x1b[0m"));
	this.Account = Account;
	this.Chat = Chat;
	this.Contact = Contact;
	this.Error = Error;
	this.Message = Message;
	this.QuickMessage = QuickMessage;
}