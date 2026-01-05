import configExprees from "./configs/express.js";
import configAxios from "./configs/axios.js";
import configDotenv from "./configs/dotenv.js";
import configRoutes from "./route/routes.js";
import connectMongoDB from "./configs/mongodb.js";
import { connectGoogleSheets } from "./configs/google sheets.js";
import configWebSocket from "./configs/websocket.js";
import configEvents from "./websocket/events.js";

const app = configExprees();
configDotenv();
configAxios();
await connectMongoDB();
await connectGoogleSheets();
configRoutes(app);
const { server, io } = configWebSocket(app);
configEvents(io);

server.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));