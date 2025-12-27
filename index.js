import app from "./configs/express.js";
import config_axios from "./configs/axios.js";
import config_dotenv from "./configs/dotenv.js";

import connectMongoDB from "./MongoDB/connect.js";

import verifySignature from "./middleware/verify-signature.js";
import response from "./middleware/response.js";
import verifyProductIndicator from "./middleware/verify-product-indicator.js";

import webhookAuth from "./route/webhook-auth.js";
import webhookMessage from "./route/webhook-message.js";
import message from "./route/message.js";
import home from "./route/home.js";

config_axios();
config_dotenv();
connectMongoDB();

app.get("/webhook", webhookAuth);
app.get("/cancel", webhookAuth);
app.post("/webhook", verifySignature, response, verifyProductIndicator, webhookMessage);
app.post("/message", message);
app.get("/home", home);

import { Chat, Message } from "./MongoDB/schema.js";
app.get("/chat", async (req, res) => {
	const { phone } = req.query;

	if (!phone) return (res.sendStatus(400));
	const chat = await Message.find({ phone: phone });
	if (!chat) return (res.sendStatus(404));
	console.log(chat)
	// let messages = [];
	let messages = "";
	for (const message of chat) {
		// messages.push(message.text);
		messages += `<p style="width:100%; margin:0; text-align:${(message.direction === "inbound") ? "left" : "right"};">${message.text}</p>`;
	}
	res.status(200).send(messages);
});

app.get("/contacts", async (req, res) => {
	res.status(200).send(Array(15).fill({
		photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT548e7yKxVzd9AoGwcjuciTV94wTtuZPzyC_-kWy3r&s",
		phone: "+00 (00) 00000-0000",
		lastMessage: "Last message..."
	}));
});

// app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));



import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
});

io.on("connection", (socket) => {
	// console.log("Cliente conectado:", socket.id);

	// socket.on("message", (data) => {
	// 	io.emit("message", data);
	// });

	socket.on("contacts", async (payload, callback) => {
		callback({
			ok: true,
			data: await Chat.find({})
		});
	});

	socket.on("open_chat", async (payload, callback) => {
		const { phone } = payload;

		await Chat.updateOne(
			{
				phone: phone
			},
			{
				$set: {
					"lastMessage.humanViewed": true
				}
			}
		);
	});

	setInterval(() => {
		socket.emit("teste", {
			message: "testandoooo"
		});
	}, 5000);

	socket.on("disconnect", () => {
		// console.log("Cliente desconectado:", socket.id);
	});
});

server.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));