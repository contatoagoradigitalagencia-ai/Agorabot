import webhookAuth from "../route/webhook-auth.js";
import verifySignature from "../middleware/verify-signature.js";
import response from "../middleware/response.js";
import verifyProductIndicator from "../middleware/verify-product-indicator.js";
import webhookMessage from "../route/webhook-message.js";
import login from "./login.js";
import uploadAuthentication from "../middleware/upload-authentication.js";
import uploadFile from "../middleware/upload-file.js";
import upload from "./upload.js";

/**
 * @author VAMPETA
 * @brief CONFIGURA ROTAS
 * @param app APLICACAO EXPRESS
*/
export default function configRoutes(app) {
	app.get("/webhook", webhookAuth);
	app.post("/webhook", verifySignature, response, verifyProductIndicator, webhookMessage);
	app.post("/login", login);
	app.post("/upload", uploadAuthentication, uploadFile, upload);


	app.get("/testeee", (req, res) => {
		res.status(200).send("aaaaaaaaaa");
	});
}