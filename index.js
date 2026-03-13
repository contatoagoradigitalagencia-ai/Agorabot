import configExprees from "./configs/express.js";
import configAxios from "./configs/axios.js";
import configDotenv from "./configs/dotenv.js";
import configRoutes from "./route/routes.js";
import connectMongoDB from "./configs/mongodb.js";
import connectCloudflareR2 from "./configs/cloudflare r2.js";
import connectGoogleSheets from "./configs/google sheets.js";
import connectGroq from "./configs/groq.js";
import configWebSocket from "./configs/websocket.js";
import configSocket from "./configs/socket.js";

configDotenv();
configAxios();
await connectMongoDB();
await connectCloudflareR2();
await connectGoogleSheets();
await connectGroq();
const app = configExprees();
configRoutes(app);
const { server, io } = configWebSocket(app);
configSocket(io);

server.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));