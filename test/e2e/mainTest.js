import configExpress from "../../configs/express.js";
import configAxios from "../../configs/axios.js";
import configDotenv from "../../configs/dotenv.js";
import connectMongoDB from "../../configs/mongodb.js";
import connectCloudflareR2 from "../../configs/cloudflare r2.js";
import connectGoogleSheets from "../../configs/google sheets.js";
import connectIA from "../../configs/IA.js";
import configWebSocket from "../../configs/websocket.js";
import configSocket from "../../configs/socket.js";

/**
 * @author VAMPETA
 * @brief FUNCAO PRINCIPAL QUE INICIAL O SERVIDOR PARA TESTES E2E
*/
export default async function mainTest({ mongoDB = false, cloudFlareR2 = false, googleSheets = false, IA = false }) {
    configDotenv();
    configAxios();
    if (mongoDB) await connectMongoDB();
    if (cloudFlareR2) await connectCloudflareR2();
    if (googleSheets) await connectGoogleSheets();
    if (IA) await connectIA();
    const app = configExpress();
    const { server, io } = configWebSocket(app);
    configSocket(io);
    return ({ app, server, io });
}