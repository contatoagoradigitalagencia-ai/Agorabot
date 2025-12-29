import express from "express";
import cors from "cors";

/**
 * @author VAMPETA
 * @brief CONFIGURA EXPRESS
*/
export default function configExpress() {
	const app = express();

	app.use(
		express.json({
			verify: (req, res, buf) => {
				req.rawBody = buf;
			}
		})
	);
	app.use(cors());
	return (app);
}