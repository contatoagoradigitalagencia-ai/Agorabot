import webhookAuth from "../route/webhook-auth.js";
import verifySignature from "../middleware/verify-signature.js";
import response from "../middleware/response.js";
import verifyProductIndicator from "../middleware/verify-product-indicator.js";
import webhookMessage from "../route/webhook-message.js";

/**
 * @author VAMPETA
 * @brief CONFIGURA ROTAS
 * @param app APLICACAO EXPRESS
*/
export default function configRoutes(app) {
	app.get("/webhook", webhookAuth);
	app.post("/webhook", (req, res, next) => {
		console.log("chegou mensagem");
		next();
	}, verifySignature, response, verifyProductIndicator, webhookMessage);
}