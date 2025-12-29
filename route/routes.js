import webhookAuth from "../route/webhook-auth.js";
import verifySignature from "../middleware/verify-signature.js";
import response from "../middleware/response.js";
import verifyProductIndicator from "../middleware/verify-product-indicator.js";
import webhookMessage from "../route/webhook-message.js";
import message from "../route/message.js";
import home from "../route/home.js";

import { Chat, Message } from "../MongoDB/schema.js";

/**
 * @author VAMPETA
 * @brief CONFIGURA ROTAS
 * @param app APLICACAO EXPRESS
*/
export default function configRoutes(app) {
	app.get("/webhook", webhookAuth);
	app.get("/cancel", webhookAuth);
	app.post("/webhook", verifySignature, response, verifyProductIndicator, webhookMessage);
	app.post("/message", message);
	app.get("/home", home);
	app.get("/chat", async (req, res) => {
		const { phone } = req.query;

		if (!phone) return (res.sendStatus(400));
		const chat = await Message.find({ phone: phone });
		if (!chat) return (res.sendStatus(404));
		let messages = "";
		for (const message of chat) messages += `<p style="width:100%; margin:0; text-align:${(message.direction === "inbound") ? "left" : "right"};">${message.text}</p>`;
		res.status(200).send(messages);
	});
}