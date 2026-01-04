import configExprees from "./configs/express.js";
import configAxios from "./configs/axios.js";
import configDotenv from "./configs/dotenv.js";
import configRoutes from "./route/routes.js";
import connectMongoDB from "./configs/mongodb.js";
import configWebSocket from "./configs/websocket.js";
import configEvents from "./websocket/events.js";



// import { google } from "googleapis";

// async function getAuthSheets() {
//     try {
//         const auth = new google.auth.GoogleAuth({
//             keyfile: "teste.json",
//             scopes: "https://www.googleapis.com/auth/spreadsheets"
//         });
//         const client = await auth.getClient();
//         const googleSheets = google.sheets({
//             version: "v4",
//             auth: client
//         });
//         const spreadsheetsId = process.env.ID_GOOGLE_SHEETS;
    
//         return ({ auth, client, googleSheets, spreadsheetsId });
//     } catch (error) {
//         console.log("nao conectou")
//     }
// }
// try {
//     const { googleSheets, auth, spreadsheetsId } = await getAuthSheets();
//     const metadata = await googleSheets.spreadsheetsId.get({
//         auth,
//         spreadsheetsId
//     });
//     console.log(metadata)
// } catch (error) {
//     console.log("nao funfou")
// }



const app = configExprees();
configDotenv();
configAxios();
connectMongoDB();
configRoutes(app);
const { server, io } = configWebSocket(app);
configEvents(io);

server.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));